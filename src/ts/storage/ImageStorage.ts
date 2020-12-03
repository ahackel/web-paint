import LocalForageAdapter from "./LocalForageAdapter";
import Utils from "../utils/Utils";
import DropboxAdapter from "./DropboxAdapter";
import StorageAdapter from "./StorageAdapter";

export default class ImageStorage {

	private static _adapter: StorageAdapter;
	
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

	private static imageFromBlob(id: string, blob: Blob) {
		let img = new Image();
		img.id = id;
		img.src = URL.createObjectURL(blob);
		return img;
	}

	public static saveImage(id: string, blob: Blob){
		return this.adapter.setItem(id, blob)
			.then(() => {
				const event: Event = new Event("imagesaved")
				Utils.DispatchEventToAllElements(event);
			})
	}

	public static imageKeys() {
		return this.adapter.keys();
	}

	public static iterate(callback: (img: HTMLImageElement) => any) {
		return this.adapter.iterate((blob: Blob, id: string, iteration: number) => {
			if (blob) {
				callback(this.imageFromBlob(id, blob))
			}
		});
	}

}
