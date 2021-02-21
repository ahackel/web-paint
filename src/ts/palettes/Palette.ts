import {View} from "../views/View";
import * as Utils from "../utils/Utils";

// base class for palettes
export class Palette extends View {
    public hideWhenEmpty: boolean = true;
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
        this.updateSelectedOption();
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
        if (this._options.length == 0){
            return;
        }
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
    
    addOption(value: any): number {
        this._options.push(value);
        let index = this._options.length - 1;
        this.addOptionElement(index, value);
        this.updateOptionsWidth();
        this.updateSelectedOption();
        return index;
    }

    removeOption(index: number){
        this._options.splice(index, 1);
        this._optionElements[index].remove();
        this._optionElements.splice(index, 1);
        
        // update the index assigned to each element:
        this.recreateOptions();
        if (this._options.length == 0){
            this.collapse();
        }
        this.updateSelectedOption();
    }
    
    bounce(){
        this._selectedElement.classList.remove("bounce");
        void this._selectedElement.offsetWidth;
        this._selectedElement.classList.add("bounce");
    }

    shake(){
        this._selectedElement.classList.remove("shake");
        void this._selectedElement.offsetWidth;
        this._selectedElement.classList.add("shake");
    }

    private addSelectedOption() {
        let element = <HTMLDivElement>document.createElement("div");
        element.classList.add("option");
        this._selectedElement = element;
        Utils.addClick(element, () => this.toggle());
        this.updateSelectedOption();
        this._element.appendChild(element);
    }
    
    private addOptionElements(){
        let element = <HTMLDivElement>document.createElement("div");
        element.classList.add("options");
        this._optionsElement = element;
        this.addArrowElement();

        let i: number = 0;
        for (let option of this._options){
            this.addOptionElement(i, option);
            i ++;
        }
        this.updateOptionsWidth();
        this._element.appendChild(element);
    }

    private updateOptionsWidth() {
        this._optionsElement.style.width = Math.min(8, this._options.length) * 1.25 + "em";
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
        Utils.addLongClick(element, event => this.optionLongClicked(event, option, index));
        Utils.addClick(element, event => this.optionClicked(event, option, index));
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

    protected optionLongClicked(event: Event, option: any, index: number){
    }

    protected updateOptionElement(element: HTMLDivElement, option: any){
    }

    protected updateSelectedOptionElement(element: HTMLDivElement, option: any) {
        this.updateOptionElement(element, option);
    }
    
    protected updateSelectedOption() {
        this.updateSelectedOptionElement(this._selectedElement, this.selectedOption);
        if (this.hideWhenEmpty){
            this._element.classList.toggle('hidden', this._options.length == 0);
        }
    }
}