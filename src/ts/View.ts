export class View {

	protected _element: HTMLDivElement;

	constructor(id: string) {
		this._element = <HTMLDivElement>document.getElementById(id);
		if (!this._element){
			console.error(`Could not find element with id ${id}`);
		}
		this.hide();
	}

	clear(){
		while (this._element.hasChildNodes()) {
			this._element.removeChild(<HTMLElement>this._element.firstChild);
		}
	}

	show():void {
		this._element.hidden = false;
	}

	hide():void {
		this._element.hidden = true;
	}
}
