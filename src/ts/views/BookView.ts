import {View} from "./View";
import {config} from "../config";
import Utils from "../utils/Utils";
import ImageStorage from "../storage/ImageStorage";


export default class BookView extends View {

    public onImageSelected: Function | undefined;

    constructor(id: string) {
        super(id);
        this._element.addEventListener("imagesaved", () => {
            this.updateImages();
        })
    }

    show(): void {
        super.show();
        this.updateImages();
    }

    private updateImages() {
        for (let page of config.pages) {
            this.loadImage(page.id, page.overlay)
        }
    }

    private createThumbnail(id: string): HTMLDivElement {
        let element = <HTMLDivElement>document.createElement("div");
        let [width, height] = Utils.getImageSize();
        element.id = id;
        element.classList.add("thumbnail");
        element.style.width = `${width * 0.18}px`;
        element.style.height = `${height * 0.18}px`;
        Utils.addFastClick(element, event => {
            event.preventDefault();
            if (this.onImageSelected) {
                this.onImageSelected(id);
            }
        });
        this._element.appendChild(element);
        return element;
    }

    private addOverlay(path: string, parent: HTMLElement) {
        let element = <HTMLImageElement>document.createElement("img");
        element.src = path;
        parent.appendChild(element);
    }

    private loadImage(id: string, overlay: string) {
        let thumbnail = document.getElementById(id);
        
        if (!thumbnail){
            thumbnail = this.createThumbnail(id);
            this.addOverlay(overlay, thumbnail);
        }
        
        ImageStorage.loadImage(id)
            .then(img => {
                if (img) {
                    let oldImages = thumbnail.getElementsByClassName("preview");
                    if (oldImages.length > 0){
                        thumbnail.replaceChild(img, oldImages[0]);
                    }
                    else
                    {
                        thumbnail.prepend(img);
                    }
                    img.draggable = false;
                    img.classList.add("preview");
                }
            });
    }
}
