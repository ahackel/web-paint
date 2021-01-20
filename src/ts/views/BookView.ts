import {View} from "./View";
import {config} from "../config";
import Thumbnail from "./Thumbnail";
import PeerToPeer from "../PeerToPeer";
import Utils from "../utils/Utils";


export default class BookView extends View {

    public onImageSelected: Function | undefined;
    private _thumbnails: Thumbnail[];
    
    constructor(id: string, onSettingsClicked: Function) {
        super(id);
        let settingsButton = <HTMLDivElement>this._element.getElementsByClassName("button settings")[0];
        Utils.addFastClick(settingsButton, () => onSettingsClicked());
    }

    show(): void {
        super.show();
        this.createImages();
        
        // PeerToPeer.instance.onDataReceived = (data: ArrayBuffer) => {
        //     this._thumbnails[0].setImageSrc(URL.createObjectURL(new Blob([data])));
        // }
    }

    private createImages() {
        if (this._thumbnails){
            return;
        }
        
        this._thumbnails = [];
        
        for (let i=0; i<config.imageCount; i++) {
            const imageId = `image${("" + (i + 1)).padStart(2, "0")}`;
            let thumbnail = new Thumbnail(this._element, imageId, (id: string) => this.onImageSelected(id))
            this._thumbnails.push(thumbnail);
        }
    }
}
