import StorageAdapter from "./StorageAdapter";
import {Dropbox, DropboxAuth} from "dropbox";

const clientId: string = "dyfw7wk3nb2utzo";
const hostUri: string = 'http://localhost:1234';

export default class DropboxAdapter extends StorageAdapter{

    private _dbx: Dropbox;
    private _dbxAuth: DropboxAuth;
    
    constructor() {
        super();
        if (this.isAuthenticated){
            this._dbx = new Dropbox({ accessToken: this.getAccessTokenFromUrl() });
        }
        else {
            this._dbxAuth = new DropboxAuth({ clientId: clientId });
            this._dbx = new Dropbox({ auth: this._dbxAuth });
        }
    }
    
    getAuthentificationLink(){
        return this._dbxAuth.getAuthenticationUrl(hostUri, 
            undefined, undefined, undefined,undefined,undefined, true);
    }

    get isAuthenticated() {
        return !!this.getAccessTokenFromUrl();
    }

    // Parses the url and gets the access token if it is in the urls hash
    getAccessTokenFromUrl() {
        return this.parseQueryString(window.location.hash).access_token;
    }

    parseQueryString(str: string) {
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

    getItem(id: string): Promise<unknown> {
        return this._dbx.filesDownload({path: "/" + id + ".png"})
            .then(files => {
                // @ts-ignore
                return Promise.resolve(files.result.fileBlob);
            })
            .catch(() => {
                return Promise.resolve(null);
            })
    }

    setItem(id: string, blob: Blob): Promise<unknown> {
        return this._dbx.filesUpload({path: "/" + id + ".png", contents: blob})
    }

    keys(): Promise<unknown> {
        return Promise.reject();
    }
}