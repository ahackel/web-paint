import {View} from "../views/View";
import Utils from "../utils/Utils";

// base class for palettes
export class Palette extends View {
    public onSelectionChanged: Function | undefined;
    private _selectedElement: HTMLDivElement;
    private _optionsElement: HTMLDivElement;
    private _optionElements: HTMLDivElement[];
    private _selectedIndex: number;
    protected _options: any[];
    
    private static _expandedPalette: Palette;

    get selectedIndex(){ return this._selectedIndex }
    set selectedIndex(value){
        this._selectedIndex = Math.max(0, Math.min(this._options.length - 1, value));
        this.updateOptionElement(this._selectedElement, this.selectedOption);
    }
    
    get selectedOption(){ return this._options[this._selectedIndex] }
    set selectedOption(value){
        let index = this._options.indexOf(value);
        if (index === -1){
            return;
        }
        this.selectedIndex = index;
    }
    
    get isCollapsed(){ return this._element.classList.contains("collapsed") }

    constructor(id: string, options: any[], rightAlign: boolean = false) {
        super(id);
        this._options = options;
        this._optionElements = [];
        this._selectedIndex = 0;
        this.createOptions();
        this.show();
        this.collapse();
        
        window.addEventListener("resize", () => this.adjustOptionsPosition());
    }
    
    static collapseAll() {
        if (Palette._expandedPalette){
            Palette._expandedPalette.collapse();
        }
    }
    
    private createOptions(){
        this.addSelectedOption();
        this.addOptionElements();
    }
    
    recreateOptions(){
        this.clear();
        this.createOptions();
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
    
    addOption(value: any){
        this._options.push(value);
        this.addOptionElement(this._options.length - 1, value);
    }

    removeOption(index: number){
        this._options.splice(index, 1);
        this._optionElements[index].remove();
        this._optionElements.splice(index, 1);
        
        // update the index assigned to each element:
        this.recreateOptions();
    }

    private addSelectedOption() {
        let element = <HTMLDivElement>document.createElement("div");
        element.classList.add("option");
        this._selectedElement = element;
        Utils.addFastClick(element, () => this.toggle());
        this.updateOptionElement(element, this.selectedOption);
        this._element.appendChild(element);
    }

    private addOptionElements(){
        let element = <HTMLDivElement>document.createElement("div");
        element.classList.add("options");
        element.style.width = Math.min(4, this._options.length) * 1.25 + "rem";
        this._optionsElement = element;
        this.adjustOptionsPosition();

        this.addArrowElement();

        let i: number = 0;
        for (let option of this._options){
            this.addOptionElement(i, option);
            i ++;
        }
        this._element.appendChild(element);
    }

    private adjustOptionsPosition() {
        let isPortrait = window.innerWidth < window.innerHeight;
        this._optionsElement.style.top = isPortrait ? "initial" : Math.ceil(this._options.length / 4) * -0.625 + 0.5 + "rem";
        this._optionsElement.style.left = isPortrait ? Math.min(this._options.length, 4) * -0.625 + 0.5 + "rem" : null;
    }

    private addArrowElement(){
        let element = <HTMLDivElement>document.createElement("div");
        element.classList.add("arrow");
        this._optionsElement.appendChild(element);
    }

    private addOptionElement(index: number, option: any) {
        let element = <HTMLDivElement>document.createElement("div");
        element.classList.add("option");
        element.dataset.index = `${index}`;
        Utils.addFastClick(element, event => this.optionClicked(event, option, index));
        this.updateOptionElement(element, option);
        this._optionsElement.appendChild(element);
        this._optionElements[index] = element;
    }
    
    protected optionClicked(event: Event, option: any, index: number){
        this.selectedIndex = index;
        this.collapse();
        if (this.onSelectionChanged) {
            this.onSelectionChanged(option, index);
        }        
    }

    protected updateOptionElement(element: HTMLDivElement, option: any){
    }
}