import {Palette} from "./Palette";
import {imageStorage} from "../storage/ImageStorage";

const GIFT_PATH = "user/gifts";

export default class GiftPalette extends Palette {
    
    constructor(id: string) {
        super(id, [], true);
        this.selectedIndex = 0;
        this.addGifts();

        imageStorage.addChangeListener((change: string, id: string) => {
            if (id.startsWith(GIFT_PATH)){
                if (change == "save") {
                    this.addGift(id);
                    this.bounce();
                }
                else if (change == "delete") {
                    this.removeGift(id);
                }
            }
        });
    }

    private async addGifts() {
        const paths = await imageStorage.listFolder(GIFT_PATH);
        for (let path of paths) {
            await this.addGift(path);
        }
    }

    private async addGift(path: string) {
        this.addOption(path);
    }

    private removeGift(path: string) {
        let index = this._options.indexOf(path);
        if (index < 0){
            return;
        }
        
        this.removeOption(index);
        if (this.selectedIndex == index){
            // select the following item that now has the same index
            this.selectedIndex = index;
        }
    }
    
    protected optionLongClicked(event: TouchEvent, option: any, index: number) {
        imageStorage.deleteImage(this._options[index]);
    }

    async updateOptionElement(element: HTMLDivElement, path: string) {
        const url = await imageStorage.loadImageUrl(path);
        element.style.backgroundImage = `url("${url}")`;
    }

    updateSelectedOptionElement(element: HTMLDivElement, option: any) {
        element.innerHTML = '<i class="fas fa-gift"></i>';
    }
}