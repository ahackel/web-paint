import {Palette} from "./Palette";
import star from "url:../../img/stamps/star.png";
import unicorn from "url:../../img/stamps/unicorn.png";
import snowman from "url:../../img/stamps/snowman.png";
import dolphin from "url:../../img/stamps/dolphin.png";
import snail from "url:../../img/stamps/snail.png";

export default class StampPalette extends Palette {

    get stamp() { return this.selectedOption }
    
    constructor(id: string){
        let stamps: string[] = [
            star, unicorn, snowman, dolphin, snail
        ];

        super(id, stamps, true);
        this.selectedIndex = 0;
    }

    updateOption(element: HTMLDivElement, option: string) {
        element.style.backgroundImage = `url("${option}")`;
    }
}