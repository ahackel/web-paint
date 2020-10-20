import {Palette} from "./Palette";

export default class ToolPalette extends Palette {

    constructor(id: string){
        let tools: string[] = ["☐︎"];

        super(id, tools, true);
        this.SelectedIndex = 0;
    }

    updateOption(element: HTMLDivElement, option: string) {
        element.innerText = option;
    }
}