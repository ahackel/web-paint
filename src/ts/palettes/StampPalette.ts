import {Palette} from "./Palette";
import ImageStorage from "../storage/ImageStorage";
import Utils from "../utils/Utils";

export default class StampPalette extends Palette {

    private _stampIds: { [id : string] : string };
    
    get stamp() { return this.selectedOption }
    
    constructor(id: string) {
        let stamps: string[] = [
            "img/stamps/star.png",
            "img/stamps/unicorn.png",
            "img/stamps/snowman.png",
            "img/stamps/dolphin.png",
            "img/stamps/snail.png"
        ];

        super(id, stamps, true);
        this._stampIds = {};
        this.selectedIndex = 0;

        ImageStorage.keys()
            .then((keys: string[]) => {
                const stamps = keys.filter(x => x.startsWith("Stamp"));
                for (let stampId of stamps) {
                    this.addStampFromImageId(stampId);
                }
            });

        this._element.addEventListener("imagesaved", (event: CustomEvent) => {
            const id = <string>event.detail;
            if (id.startsWith("Stamp")) {
                this.addStampFromImageId(id);
            }
        });
    }

    private addStampFromImageId(stampId: string) {
        ImageStorage.loadBlob(stampId)
            .then(blob => {
                const url = URL.createObjectURL(blob);
                this._stampIds[url] = stampId;
                this.addOption(url);
            })
    }

    protected optionClicked(event: TouchEvent, option: any, index: number) {
        if (event.altKey){
            this.deleteStamp(index);
            return;
        }
        if (event.shiftKey){
            this.showFullScreen(index);
            return;
        }
        super.optionClicked(event, option, index);
    }

    updateOptionElement(element: HTMLDivElement, option: string) {
        element.style.backgroundImage = `url("${option}")`;
    }

    private deleteStamp(index: number) {
        let option = this._options[index];
        let stampId = this._stampIds[option];
        if (!stampId){
            return;
        }
        ImageStorage.deleteImage(stampId)
            .then(() => {
                delete this._stampIds[option];
                this.removeOption(index);
                if (this.selectedIndex == index){
                    // select the following item that now has the same index
                    this.selectedIndex = index;
                }
            })
    }

    private showFullScreen(index: number) {
        let img = new Image();
        img.src = this._options[index];
        img.classList.add("fullscreen");
        Utils.addFastClick(img, () => {
            img.remove();
        })
        document.body.appendChild(img);
    }
}