import localforage from 'localforage';
import StorageAdapter from "./StorageAdapter";
import {Dropbox} from "dropbox";

export default class DropboxAdapter extends StorageAdapter{

    private _dbx = new Dropbox({ accessToken: '' });

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