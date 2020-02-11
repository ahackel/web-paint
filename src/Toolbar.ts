export default class Toolbar {
    get selectedIndex(): number {
        return this._selectedIndex;
    }

    set selectedIndex(value: number) {
        this._buttons[this._selectedIndex].classList.remove("selected");
        this._selectedIndex = value;
        this._buttons[this._selectedIndex].classList.add("selected");
        if (this.selectionChanged){
            this.selectionChanged();
        }
    }

    public selectionChanged: Function | undefined;

    private _selectedIndex: number = 0;
    private _container: HTMLElement;
    private _titles: string[] = ["✏", "🖍️", "🖌", "🧽"];
    private _buttons: HTMLDivElement[] = [];

    constructor(id: string) {
        this._container = <HTMLElement>document.getElementById(id);
    }

    addToolButton(title: string, action: Function) {
        let {element, index} = this.createButton(title);
        element.classList.toggle("selected", this._selectedIndex === index);
        element.addEventListener("click", () => {
            this.selectedIndex = index;
            action();
        });
    }

    addActionButton(title: string, action: Function) {
        let {element, index} = this.createButton(title);
        element.addEventListener("click", event => {
            action(event);
        });
    }

    private createButton(title: string) {
        let element = document.createElement("div");
        let index = this._buttons.length;
        element.classList.add("button");
        element.innerText = title;
        this._buttons.push(element);
        this._container.appendChild(element);

        return {element, index};
    }
}