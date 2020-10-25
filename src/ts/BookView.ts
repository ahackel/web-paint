import ImageStorage from "./ImageStorage";
import {config} from "./config";
import {View} from "./View";

export default class BookView extends View {

    public onImageSelected: Function | undefined;

    constructor(id: string) {
        super(id);
        this._element.addEventListener("imagesaved", event => {
            this.updateImages();
        })
    }

    show(): void {
        super.show();
        this.updateImages();
    }

    private updateImages() {
        this.clear();
        for (let i: number = 0; i < config.PagesInBookCount; i++) {
            this.addImage("image" + i);
        }
    }

    private addImage(id: string) {
        let element = <HTMLDivElement>document.createElement("div");
        element.classList.add("thumbnail");
        element.addEventListener("mousedown", event => {
            event.preventDefault();
            if (this.onImageSelected) {
                this.onImageSelected(id);
            }
        });
        this._element.appendChild(element);

        ImageStorage.loadImage(id)
            .then(img => {
                if (img){
                    element.appendChild(img);
                    //element.style.backgroundImage = 'url(' + img.src + ')';
                }
            });
    }
}
