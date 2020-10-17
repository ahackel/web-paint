import localforage from 'localforage';

export default class ImageStorage {

	private static _imageStore = localforage.createInstance({name: "ImageStore"});

	private static loadImageFromStore(id: string, store: LocalForage): Promise<HTMLImageElement> {
		if (!id){
			return Promise.reject("Could not load image from empty id.");
		}
		// First try to load a blob with this id from storage:
		return store.getItem(id)
			.then(blob => {
				if (!blob){
					return Promise.resolve(null);
				}
				let img = this.imageFromBlob(id, blob as Blob);
				return Promise.resolve(img);
			})
			.then(img => {
				if (!img){
					return Promise.resolve(null);
				}
				return img.decode()
					.then(() => {
						return Promise.resolve(img);
					});
			});
	}

	public static loadImage(id: string): Promise<HTMLImageElement> {
		return this.loadImageFromStore(id, this._imageStore);
	}

	private static imageFromBlob(id: string, blob: Blob) {
		let img = new Image();
		img.id = id;
		img.src = URL.createObjectURL(blob as Blob);
		return img;
	}

	public static saveImage(id: string, blob: Blob){
		return this._imageStore.setItem(id, blob)
			.then(() => {
				const event: Event = new Event("imagesaved")
				const elements = document.getElementsByTagName("*");
				for (let i = 0; i < elements.length; i++) {
					elements[i].dispatchEvent(event);
				}
			})
	}

	public static imageKeys() {
		return this._imageStore.keys();
	}

	public static iterate(callback: (img: HTMLImageElement) => any) {
		return this._imageStore.iterate((blob: Blob, id: string, iteration: number) => {
			if (blob) {
				callback(this.imageFromBlob(id, blob))
			}
		});
	}

}
