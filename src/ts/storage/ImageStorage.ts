import LocalForageAdapter from "./LocalForageAdapter";
import Utils from "../utils/Utils";
import DropboxAdapter from "./DropboxAdapter";
import StorageAdapter from "./StorageAdapter";

export default class ImageStorage {

	private static _adapter: StorageAdapter;
	private static _changeListeners: Function[];
	private static _urls: { [id: string]: string }
	
	public static get adapter() {
		if (!this._adapter) {
			this._adapter = new LocalForageAdapter()
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
}
