import {Palette} from "./Palette";

export default class SizePalette extends Palette {

    constructor(id: string){
        let sizes: number[] = [8, 24, 40];
        super(id, sizes, true);
        this.selectedIndex = 1;
    }

    updateOption(element: HTMLDivElement, option: any) {
        element.innerHTML = '<i class="fas fa-circle"></i>'
        element.style.fontSize = option + 'px';
    }
}