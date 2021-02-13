import 'whatwg-fetch';
import LocalForageAdapter from "./LocalForageAdapter";
import StorageAdapter from "./StorageAdapter";
import JSZip from "jszip";

interface IFileMeta {
	changeDate: number
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
	
	async GetFileChangeDate(id: string){
		if (id in this._fileMeta){
			return this._fileMeta[id].changeDate;
		}
		
		if (await this.ContainsImage(id)){
			// add missing entry
			const newChangeDate = Date.now();
			this.SetFileChangeDate(id, newChangeDate);
			return newChangeDate;
		}
		
		return 0;
	}
	
	async ContainsImage(id: string){
		var keys = <string[]> await this.keys();
		return keys.includes(id);
	}

	async SetFileChangeDate(id: string, date: number){
		this._fileMeta[id] = { changeDate: date };
		await this.adapter.setItem("file-meta", this._fileMeta);
		this.hasChanges = true;
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

	public async saveImage(id: string, blob: Blob, changeDate: number = Date.now()){
		try{
			await this.adapter.setItem(id, blob);
			await this.SetFileChangeDate(id, changeDate);
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
		let needsRefresh = false;
		var keys = <string[]> await this.keys();

		for (let id of keys) {
			if (id.includes("/")){
				continue;
			}
			
			if (id.startsWith("image")){
				await this.renameImage(id, id.replace("image", "images/"));
				needsRefresh = true;
			}
			else if (id.startsWith("shape-")){
				await this.renameImage(id, id.replace("shape-", "shapes/"));
				needsRefresh = true;
			}
			else if (id.startsWith("shape")){
				await this.renameImage(id, id.replace("shape", "shapes/"));
				needsRefresh = true;
			}
			else if (id.startsWith("overlay-image")){
				await this.renameImage(id, id.replace("overlay-image", "overlays/"));
				needsRefresh = true;
			}
		}
		if (needsRefresh){
			//location.reload();
		}
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
		return "images/" + String(i + 1).padStart(2, "0") + ".png";
	}

	getOverlayPath(imageId: string): string {
		return "overlays/" + this.getFilenameFromPath(imageId);
	}
	
	async listFolder(path: string): Promise<string[]> {
		const keys = <string[]>await this.adapter.keys();
		return keys.filter(x => x.startsWith(path + "/"));
	}
}

export const imageStorage = new ImageStorage();
