import LocalForageAdapter from "./LocalForageAdapter";
import Utils from "../utils/Utils";
import DropboxAdapter from "./DropboxAdapter";
import StorageAdapter from "./StorageAdapter";
import JSZip from "jszip";
import {secondary_emails} from "dropbox";

export default class ImageStorage {

	private static _adapter: StorageAdapter;
	private static _changeListeners: Function[];
	private static _urls: { [id: string]: string }
	
	public static get adapter() {
		if (!this._adapter) {
			this._adapter = new LocalForageAdapter();
			this.migrate();
		}
		return this._adapter 
	}
	
	public static get urls(){
		if (!this._urls){
			this._urls = {};
		}
		return this._urls;
	}

	public static async loadImage(id: string): Promise<HTMLImageElement> {
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
	

	public static async loadImageUrl(id: string): Promise<string> {
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

	private static loadBlob(id: string): Promise<Blob> {
		return <Promise<Blob>>this.adapter.getItem(id)
	}

	public static async saveImage(id: string, blob: Blob){
		try{
			await this.adapter.setItem(id, blob);
		}
		catch (e) {
		}
		
		if (id in this.urls){
			URL.revokeObjectURL(this.urls[id]);
		}
		this.urls[id] = URL.createObjectURL(blob);
		
		this.dispatchChangeEvent("save", id);
	}
	
	public static deleteImage(id: string){
		return this.adapter.removeItem(id)
			.then(() => {
				if (id in this.urls){
					URL.revokeObjectURL(this.urls[id]);
					delete this.urls[id];
				}
				this.dispatchChangeEvent("delete", id);
			})		
	}

	public static keys() {
		return this.adapter.keys();
	}

	public static addChangeListener(callback: Function){
		this._changeListeners = this._changeListeners || [];
		this._changeListeners.push(callback);
	}

	private static dispatchChangeEvent(change: string, id: string) {
		for (let changeListener of this._changeListeners) {
			changeListener(change, id);
		}
	}
	
	public static clear(){
		this.adapter.clear();
	}
	
	public static async generateBackupArchive(): Promise<Blob> {
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
	
	public static async importBackupArchive(zipFile: Blob) {
		const zip = await JSZip.loadAsync(zipFile);
		
		zip.forEach(async (path, file) => {
			const buffer = await file.async("arraybuffer");
			const blob = new Blob([buffer], {"type": "image/png"});
			this.saveImage(file.name, blob);
		})
	}
	
	private static async migrate(){
		let needsRefresh = false;
		var keys = <string[]> await this.keys();

		for (let id of keys) {
			if (!id.startsWith("image") && !id.startsWith("Stamp")){
				continue;
			}

			if (id.endsWith(".png")){
				continue;
			}

			const newId = id.replace("Stamp", "stamp") + ".png";
			const data = <Blob>await this.adapter.getItem(id);
			await this.adapter.setItem(newId, data);
			await this.adapter.removeItem(id);
			console.log(`Migrated ${id} to ${newId}.`);
			needsRefresh = true;
		}
		if (needsRefresh){
			location.reload();
		}
	}
	
	public static async getStorageUsed(): Promise<number> {
		let amount = 0;
		var keys = <string[]> await this.keys();
		console.log(keys);
		
		return;
		for (let id of keys) {
			const url = await this.loadImageUrl(id);
			const blob = await fetch(url).then(r => r.blob());
			console.log(blob);
			if (!blob){
				continue;
			}
			amount += blob.size;
		}
		return amount;
	}
}
