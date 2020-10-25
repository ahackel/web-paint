import {View} from "./View";

export class Palette extends View {
    public onSelectionChanged: Function | undefined;
    private _selectedElement: HTMLDivElement;
    private _options: string[];
    private _selectedIndex: number;

    get SelectedIndex(){ return this._selectedIndex }
    set SelectedIndex(value){
        this._selectedIndex = value;
        this.updateOption(this._selectedElement, this.SelectedOption);
    }
    get SelectedOption(){ return this._options[this._selectedIndex] }

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

    collapse() {
        this._element.classList.add("collapsed");
    }

    expand() {
        this._element.classList.remove("collapsed");
    }

    toggle() {
        this._element.classList.toggle("collapsed");
    }

    addSelectedOption() {
        let element = <HTMLDivElement>document.createElement("div");
        this._selectedElement = element;
        element.addEventListener("touchstart", event => {
            event.preventDefault();
            this.toggle(); });
        this.updateOption(element, this.SelectedOption);
        this._element.appendChild(element);
    }

    addOption(index: number, option: string) {
        let element = <HTMLDivElement>document.createElement("div");
        element.addEventListener("touchstart", event => {
            event.preventDefault();
            this.SelectedIndex = index;
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