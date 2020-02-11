export class View {

    protected _element: HTMLElement;

    constructor(id: string) {
        this._element = <HTMLElement>document.getElementById(id);
    }

    show = () => this._element.hidden = false;
    hide = () => this._element.hidden = true;
}