import {Palette} from "./Palette";

export default class ToolPalette extends Palette {

    constructor(id: string){
        let tools: string[] = ["∙", "●", "✖︎"];

        super(id, tools, true);
        this.SelectedIndex = 1;
    }

    updateOption(element: HTMLDivElement, option: string) {
        element.innerText = option;
    }
}