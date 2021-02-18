import 'whatwg-fetch';
import LocalForageAdapter from "./LocalForageAdapter";
import StorageAdapter from "./StorageAdapter";
import JSZip from "jszip";

interface IFileMeta {
	hash: string;
}

type IFileMetaList = { [id: string]: IFileMeta };

class ImageStorage {

	private _adapter: StorageAdapter;
	private _changeListeners: Function[];
	private _urls: { [id: string]: string }
	private _fileMeta: IFileMetaList
	hasChanges: boolean = false;
	
	constructor() {
		this.loadFileMeta();
	}
	
	public get adapter() {
		if (!this._adapter) {
			this._adapter = new LocalForageAdapter();
			this.migrate();
		}
		return this._adapter 
	}
	
	public get urls(){
		if (!this._urls){
			this._urls = {};
		}
		return this._urls;
	}
	
	async ContainsImage(id: string){
		var keys = <string[]> await this.keys();
		return keys.includes(id);
	}

	public async loadImage(id: string): Promise<HTMLImageElement> {
		const url: string = await this.loadImageUrl(id);
		
		if (!url){
			return null;
		}
		
		const img = new Image();
		img.id = id;
		img.src = url;

		if (img.decode != null) {
			await img.decode();
			return img;
		}

		return new Promise(resolve => {
			img.onload = () => resolve(img);
		});
	}
	

	public async loadImageUrl(id: string): Promise<string> {
		if (id in this.urls){
			return this.urls[id];
		}
		
		const blob = await this.loadBlob(id);
		if (!blob){
			return null;
		}

		const url = URL.createObjectURL(blob);
		this.urls[id] = url;
		return url;
	}

	private loadBlob(id: string): Promise<Blob> {
		return <Promise<Blob>>this.adapter.getItem(id)
	}

	public async saveImage(id: string, blob: Blob, hash?: string){
		try{
			await this.adapter.setItem(id, blob);
			await this.setHash(id, hash ?? await this.generateContentHash(blob));
			this.hasChanges = true;
		}
		catch (e) {
		}
		
		if (id in this.urls){
			URL.revokeObjectURL(this.urls[id]);
		}
		this.urls[id] = URL.createObjectURL(blob);
		
		this.dispatchChangeEvent("save", id);
	}
	
	public deleteImage(id: string){
		return this.adapter.removeItem(id)
			.then(() => {
				if (id in this.urls){
					URL.revokeObjectURL(this.urls[id]);
					delete this.urls[id];
				}
				this.dispatchChangeEvent("delete", id);
			})		
	}

	async keys(): Promise<string[]> {
		var keys = <string[]>await this.adapter.keys();
		return keys.filter(x => x != "file-meta")
	}

	public addChangeListener(callback: Function){
		this._changeListeners = this._changeListeners || [];
		this._changeListeners.push(callback);
	}

	private dispatchChangeEvent(change: string, id: string) {
		for (let changeListener of this._changeListeners) {
			changeListener(change, id);
		}
	}
	
	public clear(){
		this.adapter.clear();
	}
	
	public async generateBackupArchive(): Promise<Blob> {
		let count = 0;
		var keys = <string[]> await this.keys();
		var zip = new JSZip();
		
		for (let id of keys) {
			const url = await this.loadImageUrl(id);
			const blob = await fetch(url).then(r => r.blob());
			if (!blob){
				continue;
			}
			zip.file(id, blob);
			count += 1;
		}
		
		if (count == 0){
			return;
		}
		
		return zip.generateAsync({type:"blob"});
	}
	
	public async importBackupArchive(zipFile: Blob) {
		const zip = await JSZip.loadAsync(zipFile);
		
		zip.forEach(async (path, file) => {
			const buffer = await file.async("arraybuffer");
			const blob = new Blob([buffer], {"type": "image/png"});
			this.saveImage(file.name, blob);
		})
	}
	
	private async renameImage(oldId: string, newId: string){
		const data = <Blob>await this.adapter.getItem(oldId);
		if (!data){
			return;
		}
		await this.adapter.setItem(newId, data);
		await this.adapter.removeItem(oldId);
	}
	
	private async migrate(){
		var keys = <string[]> await this.keys();

		for (let id of keys) {
			if (!id.includes("/")) {
				await this.migrateLooseFilesIntoFolders(id);
			}
			if (id.startsWith("images/") ||
				id.startsWith("shapes/")){
				await this.renameImage(id, "user/" + id);
			}
			if (id.startsWith("overlays/")){
				await this.renameImage(id, "default/" + id);
			}
		}
	}

	private async migrateLooseFilesIntoFolders(id: string) {
		if (id.startsWith("image")) {
			await this.renameImage(id, id.replace("image", "user/images/"));
			return true;
		}
		if (id.startsWith("shape-")) {
			await this.renameImage(id, id.replace("shape-", "user/shapes/"));
			return true;
		}
		if (id.startsWith("shape")) {
			await this.renameImage(id, id.replace("shape", "user/shapes/"));
			return true;
		}
		if (id.startsWith("overlay-image")) {
			await this.renameImage(id, id.replace("overlay-image", "default/overlays/"));
			return true;
		}
		return false;
	}

	public async getStorageUsed(): Promise<number> {
		let amount = 0;
		var keys = <string[]> await this.keys();
		for (let id of keys) {
			const url = await this.loadImageUrl(id);
			const blob = await fetch(url).then(r => r.blob());
			if (!blob){
				continue;
			}
			amount += blob.size;
		}
		return amount;
	}

	private async loadFileMeta() {
		this._fileMeta = <IFileMetaList> await this.adapter.getItem("file-meta") ?? {};
	}

	getFilenameFromPath(path: string): string{
		return path.substring(path.lastIndexOf('/')+1);
	}		
	
	getImagePath(i: number): string {
		return "user/images/" + String(i + 1).padStart(2, "0") + ".png";
	}

	getOverlayPath(imageId: string): string {
		return "default/overlays/" + this.getFilenameFromPath(imageId);
	}
	
	async listFolder(path: string): Promise<string[]> {
		const keys = <string[]>await this.adapter.keys();
		return keys.filter(x => x.startsWith(path + "/"));
	}	

	async getHash(id: string): Promise<string> {
		if (id in this._fileMeta){
			return this._fileMeta[id].hash;
		}
		return null;
	}

	private async setHash(id: string, hash: string) {
		this._fileMeta[id] = { hash: hash };
		await this.adapter.setItem("file-meta", this._fileMeta);
	}

	public async generateContentHash(blob: Blob): Promise<string> {
		const BLOCK_SIZE = 4 * 1024 * 1024;
		
		const tempBuffer = new Uint8Array(Math.ceil(blob.size / BLOCK_SIZE) * 32);
		let tempPos = 0;
		
		for (let p = 0; p < blob.size; p += BLOCK_SIZE) {
			const blobChunk = blob.slice(p, p + BLOCK_SIZE);
			const buf = await blob.arrayBuffer();
			const hashBuffer = await crypto.subtle.digest('SHA-256', buf);
			tempBuffer.set(new Uint8Array(hashBuffer), tempPos);
			tempPos += 32;
		}

		const hashBuffer = await crypto.subtle.digest('SHA-256', tempBuffer);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex2 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
		
		return hashHex2;
	}
}

export const imageStorage = new ImageStorage();
