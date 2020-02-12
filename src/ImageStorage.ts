import localforage = require("localforage");
import ImageMeta from "./ImageMeta";
import {IPage} from "./config";

export default class ImageStorage {

	private static _thumbnailStore = localforage.createInstance({name: "ThumbnailStore"});
	private static _imageStore = localforage.createInstance({name: "ImageStore"});
	private static _metaStore = localforage.createInstance({name: "MetaStore"});

	public static getThumbnail(page: IPage): Promise<HTMLImageElement> {
		return this.loadImageFromStore(page.id, this._thumbnailStore)
			.catch(() => {
				return ImageStorage.createNewThumbnail(page);
			})
	}

	private static createNewThumbnail(page: IPage): Promise<HTMLImageElement> {
		console.log(`createNewThumbnail ${page.id}`);
		const width = 256;
		const height = 192;
		const canvas = <HTMLCanvasElement>document.createElement("Canvas");
		canvas.width = width;
		canvas.height = height;
		let ctx = <CanvasRenderingContext2D>canvas.getContext("2d", { alpha: false });
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, width, height);

		let sequence = Promise.resolve(new Image());

		if (page.underlay) {
			sequence
				.then(() => this.loadImage(page.underlay))
				.then(img => {
					console.log(`paintUnderlay ${page.underlay	} ${img}`);
					ctx.drawImage(img, 0, 0, width, height);
					return Promise.resolve();
				});
		}

		if (page.overlay) {
			sequence
			 	.then(() => this.loadImage(page.overlay))
				.then(img => {
					console.log(`paintOverlay ${page.overlay} ${img}`);
					ctx.drawImage(img, 0, 0, width, height);
					return Promise.resolve();
				});
		}

		return sequence.then(() => {
		 	return new Promise((resolve, reject) => {
				canvas.toBlob(blob => {
					console.log(`canvasToImg ${page.id}`);
					let img = this.imageFromBlob(page.id, blob as Blob);
					resolve(img);
				})
			})
		});
	}

	private static loadImageFromStore(id: string, store: LocalForage): Promise<HTMLImageElement> {
		if (!id){
			return Promise.reject("Could not load image from empty id.");
		}
		// First try to load a blob with this id from storage:
		return store.getItem(id)
			.then(blob => {
				if (!blob) {
					let img = new Image();
					img.id = id;
					img.src = id;

					// if there is no blob try to load an image with id as src:
					console.log(`loading image ${id}`);
					return Promise.resolve(img);
				}

				let img = this.imageFromBlob(id, blob as Blob);
				return Promise.resolve(img);
			})
			.then(img => {
				console.log(`decoding image ${id}`);
				return img.decode()
					.then(() => {
						console.log(`decoded image ${id}`);
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

	public static loadMeta(id: string){
		return this._metaStore.getItem(id);
	}

	public static saveImage(id: string, blob: Blob, meta: ImageMeta){
		return this._imageStore.setItem(id, blob)
			.then(() => this._metaStore.setItem(id, meta));
	}

	public static deleteImage(id: string){
		return Promise.all([
			this._imageStore.removeItem(id),
			this._metaStore.removeItem(id)
		]);
	}

	public static imageKeys() {
		return this._imageStore.keys();
	}

	public static iterateImages(callback: (img: HTMLImageElement) => any) {
		return this._imageStore.iterate((blob: Blob, id: string, iteration: number) => {
			if (blob) {
				callback(this.imageFromBlob(id, blob))
			}
		});
	}

}
