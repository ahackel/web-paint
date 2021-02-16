import {Dropbox, DropboxAuth, DropboxResponse, files} from "dropbox";
import localforage from "localforage";
import {imageStorage} from "./ImageStorage";
import {config} from "../config";
import {FileSync, IFileSet, IFileStatusEntry, IFileSyncStatus} from "../utils/FileSync";
import ILayer from "../ILayer";

const CLIENT_ID = 'dyfw7wk3nb2utzo';


interface IFile {
    hash: string
}

abstract class FileSet implements IFileSet {
    protected _files: Map<string, IFile>;
    
    async copyTo(itemId: string, filesB: IFileSet): Promise<void>{
        await (<FileSet>filesB).add(itemId, await this.load(itemId), this.getHash(itemId));
    }

    abstract load(id: string): Promise<Blob>;
    
    abstract add(id: string, content: Blob, hash: string): Promise<void>;

    abstract delete(id: string): Promise<void>;

    getHash(id: string): string {
        return this._files.get(id)?.hash;
    }

    has(id: string): boolean {
        return this._files.has(id);
    }

    getAll(): IterableIterator<string>{
        return this._files.keys();
    }
}

class clientFileSet extends FileSet {
    private _rootPath: string;

    async setPath(path: string){
        this._rootPath = path;
        const ids = await imageStorage.listFolder(path);
        this._files = new Map<string, IFile>();
        for (let id of ids) {
            this._files.set(id, {hash: await imageStorage.getHash(id)});
        }
    }
    
    async add(id: string, content: Blob, hash: string): Promise<void> {
        console.log("save " + id);
        await imageStorage.saveImage(id, content, hash);
    }

    async delete(id: string): Promise<void> {
        console.log("delete " + id);
        await imageStorage.deleteImage(id);
    }

    async load(id: string): Promise<Blob> {
        const url = await imageStorage.loadImageUrl(id);
        return fetch(url).then(r => r.blob());
    }
}

class serverFileSet extends FileSet {
    private _dbx: Dropbox;
    private _serverRoot: string;
    private _clientRoot: string;
    private _cursor: string;
    
    constructor(dbx: Dropbox) {
        super();
        this._dbx = dbx;
    }
    
    getCursor(){
        return this._cursor;
    }
    
    async setPath(serverRootPath: string, clientRootPath: string){
        this._serverRoot = "/" + serverRootPath;
        this._clientRoot = clientRootPath;
        this._files = new Map<string, IFile>();

        let res = await this._dbx.filesListFolder({
            path: this._serverRoot,
            recursive: true,
        });
        this.addServerEntries(<files.FileMetadataReference[]><unknown>res.result.entries);

        while (res.result.has_more){
            console.log("more")
            res = await this._dbx.filesListFolderContinue({
                cursor: res.result.cursor
            });
            this.addServerEntries(<files.FileMetadataReference[]><unknown>res.result.entries);
        }
        
        this._cursor = res.result.cursor;
    }

    private addServerEntries(entries: files.FileMetadataReference[]) {
        const serverFiles: files.FileMetadataReference[] = entries
            .filter(x => x.name.endsWith(".png") && x[".tag"] == "file");

        for (let file of serverFiles) {
            const itemId = this.serverToClientPath(file.path_display);
            this._files.set(itemId, {hash: file.content_hash});
        }
    }
    
    private serverToClientPath(serverPath: string){
        return serverPath.replace(this._serverRoot, this._clientRoot);
    }

    private clientToServerPath(clientPath: string){
        return clientPath.replace(this._clientRoot, this._serverRoot);
    }

    async add(itemId: string, contents: Blob, hash: string): Promise<void> {
        console.log("upload " + itemId);
        const serverPath = this.clientToServerPath(itemId);
        console.log("upload " + itemId + " > " + serverPath);
        await this._dbx.filesUpload({path: serverPath, contents: contents, mode: { ".tag": "overwrite" }})
    }
    
    async delete(itemId: string): Promise<void> {
        const serverPath = this.clientToServerPath(itemId);
        console.log("delete " + serverPath + " from dropbox");
        await this._dbx.filesDeleteV2({path: serverPath});
    }

    async load(itemId: string): Promise<Blob> {
        const serverPath = this.clientToServerPath(itemId);
        console.log("download " + serverPath + " > " + itemId);
        const res = await this._dbx.filesDownload({path: serverPath});
        if (res.status == 200) {
            // @ts-ignore
            return res.result.fileBlob;
        }
    }
}

class FileSyncStatus implements IFileSyncStatus{
    private _entries: Map<string, IFileStatusEntry>;
    private _rootPath: string;
    
    async setPath(path: string){
        this._rootPath = path;
        await this.loadEntries();
    }

    async set(itemId: string, hashA: string, hashB: string): Promise<void> {
        this._entries.set(itemId, {hashA: hashA, hashB: hashB});
    }

    async delete(itemId: string): Promise<void> {
        this._entries.delete(itemId);
    }

    get(itemId: string): IFileStatusEntry {
        return this._entries.get(itemId);
    }

    has(itemId: string): boolean {
        return this._entries.has(itemId);
    }

    private async loadEntries() {
        const pairs: [string, IFileStatusEntry][] = await localforage.getItem("file-sync-status-" + this._rootPath) ?? [];
        this._entries = new Map(pairs);
    }

    public async saveEntries() {
        const pairs = [...this._entries];
        await localforage.setItem("file-sync-status-" + this._rootPath, pairs);
    }

    getAll(): IterableIterator<string> {
        return this._entries.keys();
    }
}

class DropboxStorage {
    
    private _isAuthorized: boolean = false;
    private _dbx: Dropbox;
    private _userId: string;
    private _longPollStarted: boolean = false;
    private _lastSyncDate: number = 0;
    
    SYNC_BOTH = 0;
    SYNC_UPLOAD = 1;
    SYNC_DOWNLOAD = 2;

    get isAuthorized(): boolean {
        return this._isAuthorized;
    }
    
    get dbx(): Dropbox {
        return this._dbx;
    }

    get userId(): string{
        return this._userId;
    }
    
    set userId(value: string){
        this._userId = value;
        localforage.setItem("user-id", value);
    }
    
    get lastSyncDate(): number{
        return this._lastSyncDate;
    }

    set lastSyncDate(value: number){
        this._lastSyncDate = value;
        localforage.setItem("last-dropbox-sync", value);
    }
    
    constructor() {
        this.init();
    }

    private async init() {
        this._userId = await localforage.getItem<string>("user-id") ?? "";
        this._lastSyncDate = await localforage.getItem<number>("last-dropbox-sync") ?? 0;
        
        let token = this.getAccessTokenFromUrl();
        if (token) {
            this.authorize(token);
        } else {
            token = await localforage.getItem<string>('dropbox-token')
            if (token) {
                this.authorize(token);
            }
        }
    }

    getAuthenticationUrl(): string{
        const auth = new DropboxAuth({ clientId: CLIENT_ID });
        return auth.getAuthenticationUrl(location.href);
    }

    async sync(): Promise<string>{
        if (!this.isAuthorized || !this.userId){
            return;
        }

        console.log("Sync default content:");
        await this.syncFolder("default", "default");
        console.log("Sync user content:");
        const cursor = await this.syncFolder(this.userId, "user");
        
        await this.startLongPoll(cursor);
        return cursor;
    }
    
    async syncFolder(serverPath: string, clientPath: string): Promise<string> {
        try{
            const clientFiles = new clientFileSet();
            await clientFiles.setPath(clientPath);
            const serverFiles = new serverFileSet(this.dbx);
            await serverFiles.setPath(serverPath, clientPath);
            const fileSyncStatus = new FileSyncStatus();
            await fileSyncStatus.setPath(clientPath);
            
            const fileSync = new FileSync(clientFiles, serverFiles, fileSyncStatus, async id => {
                // in doubt keep the files of the client:
                await clientFiles.copyTo(id, serverFiles);
                await fileSyncStatus.set(id, clientFiles.getHash(id), serverFiles.getHash(id));
            });
            await fileSync.syncFiles();
            await fileSyncStatus.saveEntries();
            
            let cursor = serverFiles.getCursor();
            // if (fileSync.modified){
            //     // refresh cursor because we don't want to get updates from dropbox about the files we just posted:
            //     const res = await this.dbx.filesListFolderGetLatestCursor({path: "/" + path, recursive: true});
            //     cursor = res.result.cursor;
            // }
            return cursor;
        }
        catch (error){
            console.log(error);
        }
        return null;
    }
    
    public async startLongPoll(cursor: string) {
        if (this._longPollStarted){
            return;
        }
        
        this._longPollStarted = true;
        await this.longPoll(cursor);
    }

    private async longPoll(cursor: string) {
        if (!cursor){
            this._longPollStarted = false;
            return;
        }

        console.log("polling:");
        const res = await this.dbx.filesListFolderLongpoll({cursor: cursor, timeout: config.dropboxSyncInterval});
        if (res.result.changes || imageStorage.hasChanges) {
            cursor = await this.sync();
            imageStorage.hasChanges = false;
        }
        const timeout = res.result.backoff ?? config.dropboxSyncInterval;
        setTimeout(() => this.longPoll(cursor), timeout);
    }
    
    private getAccessTokenFromUrl() {
        return this.parseQueryString(window.location.hash).access_token;
    }

    private parseQueryString(str: string) {
        const ret = Object.create(null);
    
        if (typeof str !== 'string') {
            return ret;
        }
    
        str = str.trim().replace(/^(\?|#|&)/, '');
    
        if (!str) {
            return ret;
        }
    
        str.split('&').forEach((param) => {
            const parts = param.replace(/\+/g, ' ').split('=');
            // Firefox (pre 40) decodes `%3D` to `=`
            // https://github.com/sindresorhus/query-string/pull/37
            let key = parts.shift();
            let val = parts.length > 0 ? parts.join('=') : undefined;
    
            key = decodeURIComponent(key);
    
            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);
    
            if (ret[key] === undefined) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }
        });
    
        return ret;
    }

    private authorize(token: string) {
        this._isAuthorized = !!token;

        if (this.isAuthorized){
            this._dbx = new Dropbox({ accessToken: token });
            localforage.setItem('dropbox-token', token);
        }
    }

    unauthorize() {
        if (!this.isAuthorized) {
            return;
        }
        this.dbx.authTokenRevoke()
            .then(() => {
                this._isAuthorized = false;
                localforage.removeItem('dropbox-token');
            });
    }
}

export const dropboxStorage = new DropboxStorage();