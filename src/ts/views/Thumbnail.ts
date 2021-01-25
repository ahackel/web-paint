import Utils from "../utils/Utils";
import ImageStorage from "../storage/ImageStorage";

export default class Thumbnail {
    
    private _element: HTMLDivElement;
    private _imageUrl: string;
    private _overlayUrl: string;
    private _needsReload: boolean;
    
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
        
        Utils.addClick(element, () => {
            if (onImageSelected) {
                onImageSelected(id);
            }
        }, true);

        ImageStorage.addChangeListener((change: string, id: string) => {
            if (change == "save" && id == this.id) {
                if (this.isHidden()){
                    this._needsReload = true;
                }
                else {
                    this.loadImage();
                }
            }
        });
        
        this.overlayUrl = Utils.getImageOverlayUrl(id);

        parent.appendChild(element);
        this.loadImage();
    }

    remove() {
        this._element.remove();
    }
    
    update() {
        if (this._needsReload){
            this.loadImage();
        }
    }

    private isHidden() {
        return (this._element.offsetParent === null)
    }

    private loadImage() {
        ImageStorage.loadBlob(this.id)
            .then(blob => {
                this.imageUrl = blob ? URL.createObjectURL(blob) : null;
                this._needsReload = false;
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
}