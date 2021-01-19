import Utils from "../utils/Utils";
import ImageStorage from "../storage/ImageStorage";
import PeerToPeer from "../PeerToPeer";

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
        
        // Utils.addLongClick(element, () => {
        //     if (!this._image || !PeerToPeer.instance || !PeerToPeer.instance.loggedIn || PeerToPeer.instance.peerList.length < 2){
        //         return;
        //     }
        //
        //     Utils.imageToBlob(this._image)
        //         .then(blob => {
        //             const peerName = PeerToPeer.instance.peerList[1];
        //             PeerToPeer.instance.sendData(peerName, blob);
        //         });
        // });
        
        Utils.addFastClick(element, () => {
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
        this.preventContextMenu(this._image);
        element.appendChild(this._image);

        let overlayPath = Utils.getOverlayPath(id);
        if (overlayPath){
            this._overlay = new Image();
            this._overlay.draggable = false;
            this._overlay.src = overlayPath;
            this.preventContextMenu(this._overlay);
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
    
    setImageSrc(src: string){
        this._image.src = src;
    }
    
    preventContextMenu(element: HTMLElement){
        element.addEventListener("contextmenu", event => event.preventDefault());
        element.addEventListener("touchend", event => event.preventDefault());
    }
}