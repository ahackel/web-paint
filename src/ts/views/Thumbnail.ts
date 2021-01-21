import Utils from "../utils/Utils";
import ImageStorage from "../storage/ImageStorage";

export default class Thumbnail {
    
    private _element: HTMLDivElement;
    private _imageUrl: string;
    private _overlayUrl: string;
    
    get id() { return this._element.id; }
    set imageUrl(src: string){
        this._imageUrl = src;
        this.updateBackgroundImages();
    }
    set overlayUrl(src: string){
        this._overlayUrl = src;
        this.updateBackgroundImages();
    }

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
        
        // element.addEventListener("click", () => {
        //     if (onImageSelected) {
        //         onImageSelected(id);
        //     }
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
        
        this.overlayUrl = Utils.getImageOverlayUrl(id);

        parent.appendChild(element);
        this.loadImage();
    }

    private loadImage() {
        ImageStorage.loadBlob(this.id)
            .then(blob => {
                this.imageUrl = blob ? URL.createObjectURL(blob) : null;
            });
    }

    private updateBackgroundImages() {
        let urls = [];
        if (this._overlayUrl){
            urls.push(`url(${this._overlayUrl})`);
        }
        if (this._imageUrl){
            urls.push(`url(${this._imageUrl})`);
        }
        this._element.style.backgroundImage = urls.join(",");
    }

    preventContextMenu(element: HTMLElement){
        element.addEventListener("contextmenu", event => event.preventDefault());
        element.addEventListener("touchend", event => event.preventDefault());
    }
}