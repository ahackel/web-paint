import {View} from "./View";
import Utils from "./Utils";

export class Palette extends View {
    public onSelectionChanged: Function | undefined;
    private _selectedElement: HTMLDivElement;
    private _options: string[];
    private _selectedIndex: number;
    
    private static _expandedPalette: Palette;

    get selectedIndex(){ return this._selectedIndex }
    set selectedIndex(value){
        this._selectedIndex = value;
        this.updateOption(this._selectedElement, this.selectedOption);
    }
    get selectedOption(){ return this._options[this._selectedIndex] }
    get isCollapsed(){ return this._element.classList.contains("collapsed") }

    constructor(id: string, options: string[], rightAlign: boolean = false) {
        super(id);
        this._options = options;
        this._selectedIndex = 0;

        if (!rightAlign){
            this.addSelectedOption();
        }
        let i: number = 0;
        for (let option of this._options){
            this.addOption(i, option);
            i ++;
        }
        if (rightAlign){
            this.addSelectedOption();
            this._element.classList.add("right-align");
        }

        this._element.style.width = 80 + 50 * this._options.length + "px";
        this.show();
        this.collapse();
    }
    
    static collapseAll() {
        if (Palette._expandedPalette){
            Palette._expandedPalette.collapse();
        }
    }

    collapse() {
        this._element.classList.add("collapsed");
        if (Palette._expandedPalette == this){
            Palette._expandedPalette = null;
        }
    }

    expand() {
        Palette.collapseAll();
        this._element.classList.remove("collapsed");
        Palette._expandedPalette = this;
    }

    toggle() {
        if (this.isCollapsed){
            this.expand();
        }
        else {
            this.collapse();
        }
    }

    addSelectedOption() {
        let element = <HTMLDivElement>document.createElement("div");
        this._selectedElement = element;
        Utils.addFastClick(element, () => this.toggle());
        this.updateOption(element, this.selectedOption);
        this._element.appendChild(element);
    }

    addOption(index: number, option: string) {
        let element = <HTMLDivElement>document.createElement("div");
        Utils.addFastClick(element, () => {
            this.selectedIndex = index;
            this.collapse();
            if (this.onSelectionChanged) {
                this.onSelectionChanged(option, index);
            }
        });
        this.updateOption(element, option);
        this._element.appendChild(element);
    }

    updateOption(element: HTMLDivElement, option: string){
    }
}