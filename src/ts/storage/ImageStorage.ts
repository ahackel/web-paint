import LocalForageAdapter from "./LocalForageAdapter";
import Utils from "../utils/Utils";
import DropboxAdapter from "./DropboxAdapter";
import StorageAdapter from "./StorageAdapter";

export default class ImageStorage {

	private static _adapter: StorageAdapter;
	private static _changeListeners: Function[];
	
	public static get adapter() {
		if (this._adapter == null) {
			this._adapter = new LocalForageAdapter()
		}
		return this._adapter 
	}

	private static loadImageFromStore(id: string): Promise<HTMLImageElement> {
		if (!id) {
			return Promise.reject("Could not load image from empty id.");
		}
		
		return this.adapter.getItem(id)
			.then(blob => {
				if (!blob){
					// Returning null will create a new image
					return Promise.resolve(null);
				}
				
				let img = this.imageFromBlob(id, blob as Blob);
				if (!img){
					return Promise.resolve(null);
				}
				
				if (img.decode != null) {
					return img.decode().then(() => Promise.resolve(img))
				}
				
				return new Promise(resolve => {
					img.onload = () => resolve(img);
				});
			})
	}

	public static loadImage(id: string): Promise<HTMLImageElement> {
		return this.loadImageFromStore(id);
	}

	public static loadBlob(id: string): Promise<Blob> {
		return <Promise<Blob>>this.adapter.getItem(id)
	}

	private static imageFromBlob(id: string, blob: Blob) {
		let img = new Image();
		img.id = id;
		img.src = URL.createObjectURL(blob);
		return img;
	}

	public static async saveImage(id: string, blob: Blob){
		try{
			await this.adapter.setItem(id, blob);
		}
		catch (e) {
		}
		
		this.dispatchChangeEvent("save", id);
	}
	
	public static deleteImage(id: string){
		return this.adapter.removeItem(id)
			.then(() => {
				this.dispatchChangeEvent("delete", id);
			})		
	}

	public static keys() {
		return this.adapter.keys();
	}

	public static addChangeListener(callback: Function){
		this._changeListeners.push(callback);
	}

	private static dispatchChangeEvent(change: string, id: string) {
		for (let changeListener of this._changeListeners) {
			changeListener(change, id);
		}
	}
}
