import localforage from 'localforage';
import StorageAdapter from "./StorageAdapter";

export default class LocalForageAdapter extends StorageAdapter{

    private _imageStore = localforage.createInstance({name: "ImageStore"});

    getItem(id: string): Promise<unknown> {
        return this._imageStore.getItem(id);
    }

    setItem(id: string, blob: Blob): Promise<unknown> {
        return this._imageStore.setItem(id, blob);
    }

    keys(): Promise<unknown> {
        return this._imageStore.keys()
    }

    iterate(param: (blob: Blob, id: string, iteration: number) => void): Promise<unknown> {
        return this._imageStore.iterate(param)
    }
}