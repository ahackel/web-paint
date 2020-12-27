import {Palette} from "./Palette";

export default class ColorPalette extends Palette {

    get color() { return this.selectedOption }
    set color(value: string) { this.selectedOption = value }

    constructor(id: string){
        // 16 color Mac palette
        // https://en.wikipedia.org/wiki/List_of_software_palettes#Apple_Macintosh_default_16-color_palette
        // let colors: string[] = [
        //     "#FFFFFF", "#f5f60d", "#f5650a", "#d50406",
        //     "#f50695", "#330496", "#0306c5", "#0692f0",
        //     "#06a606", "#026405", "#643403", "#946434",
        //     "#b5b5b5", "#848484", "#444444", "#030303",
        // ];

        // 32 color palette
        // https://github.com/geoffb/dawnbringer-palettes
        let colors: string[] = [
            "#000000", "#222034", "#45283c", "#663931",
            "#8f563b", "#df7126", "#d9a066", "#eec39a",
            "#fbf236", "#99e550", "#6abe30", "#37946e",
            "#4b692f", "#524b24", "#323c39", "#3f3f74",
            "#306082", "#5b6ee1", "#639bff", "#5fcde4",
            "#cbdbfc", "#ffffff", "#9badb7", "#847e87",
            "#696a6a", "#595652", "#76428a", "#ac3232",
            "#d95763", "#d77bba", "#8f974a", "#8a6f30",
        ];

        super(id, colors);
        this.selectedIndex = 15;
    }
    
    updateOption(element: HTMLDivElement, option: string) {
        element.style.background = option;
    }
}