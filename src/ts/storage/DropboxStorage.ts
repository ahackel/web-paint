import {Dropbox, DropboxAuth, DropboxResponse, files} from "dropbox";
import localforage from "localforage";
import {imageStorage} from "./ImageStorage";

const CLIENT_ID = 'dyfw7wk3nb2utzo';

class DropboxStorage {
    
    private _isAuthorized: boolean = false;
    private _dbx: Dropbox;
    private _userId: string;
    
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
        localStorage.setItem("user-id", value);
    }
    
    constructor() {
        this._userId = localStorage.getItem("user-id") ?? "";
        let token = this.getAccessTokenFromUrl();
        if (token) {
            this.authorize(token);
        } else {
            localforage.getItem('dropbox-token')
                .then((token: string) => {
                    if (token) {
                        this.authorize(token)
                    }
                })
        }
    }

    getAuthenticationUrl(): string{
        const auth = new DropboxAuth({ clientId: CLIENT_ID });
        return auth.getAuthenticationUrl(location.href);
    }

    async sync(){
        if (!this.isAuthorized || !this.userId){
            return;
        }

        console.log("Sync default content:");
        await this.syncFolder("default", this.SYNC_DOWNLOAD);
        console.log("Sync user content:");
        await this.syncFolder(this.userId, this.SYNC_BOTH);
    }
    
    async syncFolder(path: string, mode: number = this.SYNC_BOTH){
        try{
            const res = await this.dbx.filesListFolder({path: "/" + path});

            if (mode == this.SYNC_DOWNLOAD || mode == this.SYNC_BOTH) {
                // download from server:
                for (let path of res.result.entries) {
                    console.log(path.name)
                    if (path[".tag"] != "file") {
                        continue;
                    }
                    if (!path.name.endsWith(".png")) {
                        continue;
                    }

                    const imageId = path.name;
                    const changeDate = new Date(path.server_modified).getTime();
                    if (await imageStorage.GetFileChangeDate(imageId) >= changeDate) {
                        continue;
                    }

                    console.log("getting " + imageId);
                    this.downloadImage(path.path_lower, imageId, changeDate);
                }
            }

            if (mode == this.SYNC_UPLOAD || mode == this.SYNC_BOTH) {
                // upload:
                this.createDirectory(path);
                const folderEntries = res.result.entries;
                var keys = <string[]>await imageStorage.keys();

                for (let id of keys) {
                    const existingEntry = <files.FileMetadataReference>folderEntries.find(x => x.name == id);
                    if (existingEntry){
                        const existingChangeDate = new Date(existingEntry.server_modified).getTime();
                        if (existingChangeDate >= await imageStorage.GetFileChangeDate(id)){
                            continue;
                        }
                    }

                    const url = await imageStorage.loadImageUrl(id);
                    const blob = await fetch(url).then(r => r.blob());
                    if (!blob) {
                        continue;
                    }
                    let fileName = "/" + path + "/" + id;
                    console.log("posting: " + fileName);
                    await this.postImage(blob, fileName);
                }
            }
        }
        catch (error){
            console.log(error);
        }
    }

    private async downloadImage(path: string, imageId: string, changeDate: number) {
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
    
    private createDirectory(path: string) {
        // this.dbx.file
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