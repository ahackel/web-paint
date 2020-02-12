export class View {

	protected _element: HTMLDivElement;

	constructor(id: string) {
		this._element = <HTMLDivElement>document.getElementById(id);
		if (!this._element){
			console.error(`Could not find element with id ${id}`);
		}
	}

	show = () => this._element.hidden = false;
	hide = () => this._element.hidden = true;
}
