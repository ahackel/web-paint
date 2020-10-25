import {Palette} from "./Palette";

export default class ColorPalette extends Palette {

    constructor(id: string){
        let colors: string[] = [
            "#FFFFFF", "#f5f60d", "#f5650a", "#d50406",
            "#f50695", "#330496", "#0306c5", "#0692f0",
            "#06a606", "#026405", "#643403", "#946434",
            "#b5b5b5", "#848484", "#444444", "#030303",
        ];

        super(id, colors);
        this.selectedIndex = 15;
    }

    updateOption(element: HTMLDivElement, option: string) {
        element.style.background = option;
    }
}