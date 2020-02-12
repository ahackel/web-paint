import ImageStorage from "./ImageStorage";
import {config, IBook} from "./config";
import {View} from "./View";

export default class BookView extends View {

    public onImageSelected: Function | undefined;
    public onNewImage: Function | undefined;
    public onDeleteImage: Function | undefined;

    loadBook(book: IBook) {
        while (this._element.hasChildNodes()) {
            this._element.removeChild(<HTMLElement>this._element.firstChild);
        }

        for (let page of book.pages) {
			ImageStorage.getThumbnail(page)
				.then(img => {
					this.addImage(img)
				});
        }
    }

    private loadImages() {
        ImageStorage.iterateImages(image => this.addImage(image))
            .then(() => this.addNewImageButton());
    }

    private addNewImageButton() {
        let button = <HTMLDivElement>document.createElement("div");
        button.id = "btn-new-image";
        button.innerText = "+";
        button.addEventListener("click", event => {
            if (this.onNewImage) {
                this.onNewImage(event);
            }
        });

        this._element.appendChild(button);
    }

    private addImage(img: HTMLImageElement) {
        img.addEventListener("click", event => {
            if (event.altKey){
                if (this.onDeleteImage) {
                    this.onDeleteImage(img);
                    this._element.removeChild(img);
                }
                return;
            }

            if (this.onImageSelected) {
                this.onImageSelected(img, event);
            }
        });
        this._element.appendChild(img);
    }
}
