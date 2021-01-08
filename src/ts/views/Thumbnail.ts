import Utils from "../utils/Utils";
import ImageStorage from "../storage/ImageStorage";

export default class Thumbnail {
    
    private _element: HTMLDivElement;
    private _image: HTMLImageElement;
    private _overlay: HTMLImageElement;
    get id() { return this._element.id; }

    constructor(parent: HTMLElement, id: string, onImageSelected: Function | undefined) {
        let element = <HTMLDivElement>document.createElement("div");
        this._element = element;
        element.id = id;
        element.classList.add("thumbnail");
        
        Utils.addFastClick(element,event => {
            event.preventDefault();
            if (onImageSelected) {
                onImageSelected(id);
            }
        });

        element.addEventListener("imagesaved", (event: CustomEvent) => {
            if (event.detail != this.id){
                return;
            }
            this.loadImage();
        });
        
        this._image = new Image();
        this._image.draggable = false;
        element.appendChild(this._image);

        let overlayPath = Utils.getOverlayPath(id);
        if (overlayPath){
            this._overlay = new Image();
            this._overlay.draggable = false;
            this._overlay.src = overlayPath;
            element.appendChild(this._overlay);            
        }

        parent.appendChild(element);
        this.loadImage();
        //this.addOverlay(overlay, thumbnail);
    }

    private loadImage() {
        ImageStorage.loadBlob(this.id)
            .then(blob => {
                this._image.src = blob ? URL.createObjectURL(blob) : "//:0";
                this._image.style.display = blob ? "initial" : "none";
            });
    }
}