import {Palette} from "./Palette";

export default class ToolPalette extends Palette {

    constructor(id: string){
        let tools: string[] = [
            '<i class="fas fa-pencil-alt"></i>',
            '<i class="fas fa-brush"></i>',
            '<i class="fas fa-eraser"></i>',
            '<i class="fas fa-fill-drip"></i>',
            // '<i class="fas fa-palette"></i>',
            // '<i class="fas fa-fill-drip"></i>'
        ];

        super(id, tools, true);
        this.selectedIndex = 0;
    }

    updateOption(element: HTMLDivElement, option: string) {
        element.innerHTML = option;
    }
}