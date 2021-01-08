import {Palette} from "./Palette";

export default class StampPalette extends Palette {

    get stamp() { return this.selectedOption }
    
    constructor(id: string){
        let stamps: string[] = [
            "./img/stamps/star.png",
            "./img/stamps/unicorn.png",
            "./img/stamps/snowman.png",
            "./img/stamps/dolphin.png",
            "./img/stamps/snail.png"
        ];

        super(id, stamps, true);
        this.selectedIndex = 0;
    }

    updateOption(element: HTMLDivElement, option: string) {
        element.style.backgroundImage = `url("${option}")`;
    }
}