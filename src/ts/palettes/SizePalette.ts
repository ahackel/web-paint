import {Palette} from "./Palette";

export default class SizePalette extends Palette {

    get size() { return this.selectedOption }
    set size(value: number) { this.selectedOption = value }

    constructor(id: string){
        let sizes: number[] = [8, 24, 40];
        super(id, sizes, true);
        this.selectedIndex = 1;
    }

    updateOptionElement(element: HTMLDivElement, option: any) {
        element.innerHTML = '<i class="fas fa-circle"></i>'
        element.style.fontSize = option / 40 + 'rem';
    }
}