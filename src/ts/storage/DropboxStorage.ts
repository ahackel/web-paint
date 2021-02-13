import {Dropbox, DropboxAuth, DropboxResponse, files} from "dropbox";
import localforage from "localforage";
import {imageStorage} from "./ImageStorage";
import {config} from "../config";

const CLIENT_ID = 'dyfw7wk3nb2utzo';

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
        await this.syncFolder("default", this.SYNC_DOWNLOAD);
        console.log("Sync user content:");
        const cursor = await this.syncFolder(this.userId, this.SYNC_BOTH);
        this.lastSyncDate = Date.now();
        
        await this.startLongPoll(cursor);
        return cursor;
    }
    
    async syncFolder(path: string, mode: number = this.SYNC_BOTH): Promise<string> {
        try{
            var res = await this.dbx.filesListFolder({
                path: "/" + path,
                recursive: true,
            });
            
            const serverFiles:files.FileMetadataReference[] = <files.FileMetadataReference[]><unknown>res.result.entries.filter(x => x.name.endsWith(".png") && x[".tag"] == "file");
            const serverPaths = serverFiles.map(x => x.path_display);
            let cursor = res.result.cursor;

            const keys = <string[]>await imageStorage.keys();
            let localPaths: string[] = [];
            for (let localPath of keys) {
                if (!localPath.endsWith(".png")) {
                    continue;
                }

                const fullPath = "/" + path + "/" + localPath;
                localPaths.push(fullPath);
            }
            
            const pathsOnBoth = serverPaths.filter(x => localPaths.includes(x));
            const pathsOnServerOnly = serverPaths.filter(x => !pathsOnBoth.includes(x));
            const pathsOnLocalOnly = localPaths.filter(x => !pathsOnBoth.includes(x));
            
            if (serverFiles && (mode == this.SYNC_DOWNLOAD || mode == this.SYNC_BOTH)) {
                // update local files first:
                
                // delete local files that existed before last sync and don't exist on server
                for (let fullPath of pathsOnLocalOnly) {
                    const storagePath = fullPath.substring(path.length + 2);
                    const localChangeDate = await imageStorage.GetFileChangeDate(storagePath);
                    if (localChangeDate < this.lastSyncDate){
                        console.log("deleting " + fullPath);
                        await imageStorage.deleteImage(storagePath);
                    }
                }

                // download new files that exist only on server 
                for (let fullPath of pathsOnServerOnly) {
                    const storagePath = fullPath.substring(path.length + 2);
                    const serverEntry = serverFiles.find(x => x.path_display == fullPath);
                    const serverChangeDate = new Date(serverEntry.server_modified).getTime();
                    if (serverChangeDate > this.lastSyncDate) {
                        console.log("download " + fullPath);
                        await this.downloadImage(fullPath, storagePath);
                    }
                }

                // download newer files that exist on both 
                for (let fullPath of pathsOnBoth) {
                    const storagePath = fullPath.substring(path.length + 2);
                    const serverEntry = serverFiles.find(x => x.path_display == fullPath);
                    const serverChangeDate = new Date(serverEntry.server_modified).getTime();
                    const localChangeDate = await imageStorage.GetFileChangeDate(storagePath);
                    if (serverChangeDate > localChangeDate) {
                        console.log("download " + fullPath);
                        await this.downloadImage(fullPath, storagePath);
                    }
                }
            }

            if (mode == this.SYNC_UPLOAD || mode == this.SYNC_BOTH) {
                // update files on server:
                
                let updateCursor: boolean = false;
                if (!serverFiles){
                    // user folder does not exist
                    //await this.createDirectory(path);
                }

                // delete server files that existed before last sync and don't exist on local
                for (let fullPath of pathsOnServerOnly) {
                    const serverEntry = serverFiles.find(x => x.path_display == fullPath);
                    const serverChangeDate = new Date(serverEntry.server_modified).getTime();
                    if (serverChangeDate < this.lastSyncDate){
                        console.log("deleting on dropbox " + fullPath);
                        await this.dbx.filesDeleteV2({path: fullPath});
                        updateCursor = true;
                    }
                }

                // upload new files that exist only on local 
                for (let fullPath of pathsOnLocalOnly) {
                    const storagePath = fullPath.substring(path.length + 2);
                    const localChangeDate = await imageStorage.GetFileChangeDate(storagePath);
                    if (localChangeDate > this.lastSyncDate) {
                        const url = await imageStorage.loadImageUrl(storagePath);
                        const blob = await fetch(url).then(r => r.blob());
                        if (!blob) {
                            continue;
                        }
                        console.log("upload: " + fullPath);
                        await this.postImage(blob, fullPath);
                        updateCursor = true;
                    }
                }

                // upload newer files that exist on both 
                for (let fullPath of pathsOnBoth) {
                    const storagePath = fullPath.substring(path.length + 2);
                    const serverEntry = serverFiles.find(x => x.path_display == fullPath);
                    const serverChangeDate = new Date(serverEntry.server_modified).getTime();
                    const localChangeDate = await imageStorage.GetFileChangeDate(storagePath);
                    if (serverChangeDate < localChangeDate) {
                        const url = await imageStorage.loadImageUrl(storagePath);
                        const blob = await fetch(url).then(r => r.blob());
                        if (!blob) {
                            continue;
                        }
                        console.log("upload: " + fullPath);
                        await this.postImage(blob, fullPath);
                        updateCursor = true;
                    }
                }
                
                if (updateCursor){
                    // refresh cursor because we don't want to get updates from dropbox about the files we just posted:
                    const res = await this.dbx.filesListFolderGetLatestCursor({path: "/" + path, recursive: true});
                    cursor = res.result.cursor;
                }
            }
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
        
        const res = await this.dbx.filesListFolderLongpoll({cursor: cursor, timeout: config.dropboxSyncInterval});
        if (res.result.changes || imageStorage.hasChanges) {
            console.log("There are changes:");
            cursor = await this.sync();
            imageStorage.hasChanges = false;
        }
        const timeout = res.result.backoff ?? config.dropboxSyncInterval;
        console.log("Next dropbox poll in " + timeout);
        setTimeout(() => this.longPoll(cursor), timeout);
    }

    private async listFolder(path: string) {
        try{
            var res = await this.dbx.filesListFolder({path: "/" + path, recursive: true});
            return res.result.entries;
        }
        catch(error){
            return null;
        }
    }

    private async downloadImage(path: string, imageId: string, changeDate: number = Date.now()) {
        const res = await this.dbx.filesDownload({path: path});
        if (res.status == 200){
            // fileBlob exists:
            // @ts-ignore
            var blob = res.result.fileBlob;
            if (blob){
                imageStorage.saveImage(imageId, blob, changeDate);
            }
        }
    }

    async postImage(blob: Blob, path: string){
        return this.dbx.filesUpload({path: path, contents: blob, mode: { ".tag": "overwrite" }})
    }

    private async createDirectory(path: string) {
        return this.dbx.filesCreateFolderV2({path: "/" + path});
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