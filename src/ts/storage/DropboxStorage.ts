import {Dropbox, DropboxAuth} from "dropbox";
import localforage from "localforage";
import {imageStorage} from "./ImageStorage";

const CLIENT_ID = 'dyfw7wk3nb2utzo';

class DropboxStorage {
    
    private _isAuthorized: boolean = false;
    private _dbx: Dropbox;
    private _userId: string;


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

        await this.downloadDefaultAssets();
        await this.uploadUserContent();
    }

    private async downloadDefaultAssets(){
        const res = await this.dbx.filesListFolder({path: "/default"});
        if (res.status != 200){
            console.log('Could not download default assets.');
            return;
        }
        
        for (let path of res.result.entries) {
            if (path[".tag"] != "file"){
                continue;
            }
            if (!path.name.endsWith(".png")){
                continue;
            }

            console.log("getting default asset: " + path.name);
            this.downloadImage(path.path_lower, path.name);
        }
    }

    private async downloadImage(path: string, imageId: string) {
        const res = await this.dbx.filesDownload({path: path});
        if (res.status == 200){
            console.log(res.result)
            var blob = res.result.fileBlob;
            if (blob){
                imageStorage.saveImage(imageId, blob);
            }
        }
    }

    private async uploadUserContent() {
        this.createDirectory(this.userId);

        var keys = <string[]>await imageStorage.keys();

        for (let id of keys) {
            const url = await imageStorage.loadImageUrl(id);
            const blob = await fetch(url).then(r => r.blob());
            if (!blob) {
                continue;
            }
            let fileName = "/" + this.userId + "/" + id;
            console.log("posting: " + fileName);
            this.postImage(blob, fileName);
        }
    }

    async postImage(blob: Blob, path: string){
        return this.dbx.filesUpload({path: path, contents: blob})
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