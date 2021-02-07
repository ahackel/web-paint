import {imageStorage} from "../storage/ImageStorage";

interface IPathInfo {
    atime: string
    atimeMs: number
    birthtime: string
    birthtimeMs: number
    blksize: number
    blocks: number
    ctime: string
    ctimeMs: number
    dev: number
    gid: number
    ino: number
    isBlockDevice: boolean
    isDirectory: boolean
    isFIFO: boolean
    isFile: boolean
    isSocket: boolean
    mode: number
    mtime: string
    mtimeMs: number
    name: string
    nlink: number
    rdev: number
    size: number
    uid: number
}

class Server {

    private _host: string;
    private _userId: string;
    
    get host(): string{
        return this._host;
    }

    set host(value: string){
        this._host = value;
        localStorage.setItem("server-url", value);
    }
    
    get userId(): string{
        return this._userId;
    }
    
    set userId(value: string){
        this._userId = value;
        localStorage.setItem("user-id", value);
    }

    constructor() {
        this._host = localStorage.getItem("server-url") ?? "http://localhost:3000";
        this._userId = localStorage.getItem("user-id") ?? "";
    }

    async sync(){
        if (!this.userId){
            console.error("Cannot sync without user id.");
            return;
        }
        
        await this.downloadDefaultAssets();
        await this.uploadUserContent();
    }

    private async uploadUserContent() {
        this.createDirectory(this.host, this.userId);

        var keys = <string[]>await imageStorage.keys();

        for (let id of keys) {
            const url = await imageStorage.loadImageUrl(id);
            const blob = await fetch(url).then(r => r.blob());
            if (!blob) {
                continue;
            }
            let fileName = this.userId + "/" + id;
            console.log("posting: " + fileName);
            this.postImage(this.host, blob, fileName);
        }
    }

    async downloadDefaultAssets(){
        var res = await this.getPathInfo(this.host, 'default');
        if (!res.ok){
            console.log('Could not download default assets.');
            return;
        }
        var info: IPathInfo[] = await res.json();
        for (let path of info) {
            if (!path.isFile){
                continue;
            }
            if (!path.name.endsWith(".png")){
                continue;
            }
            this.downloadImage("default/" + path.name, path.name);
        }
    }

    private async downloadImage(path: string, imageId: string) {
        const url = this.host + "/" + path;
        var res = await fetch(url);
        if (res.ok){
            var blob = await res.blob();
            if (blob){
                imageStorage.saveImage(imageId, blob);
            }
        }
    }
    
    async getPathInfo(host: string, path: string){
        const url = host + "/" + path + "?type=json";
        return fetch(url);
    }
    
    async createDirectory(host: string, directoryName: string){
        const url = host + "/" + directoryName + "?create=directory";
        return fetch(url, {
            method: "POST"
        })
    }

    async postImage(host: string, blob: Blob, fileName: string){
        const url = host + "/" + fileName;
        return fetch(url, {
            method: "PUT",
            headers: {
                "Accept": "image/png",
                "Content-Type": "image/png"
            },
            body: blob
        })
    }
}

export const server = new Server();