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
		this._element.classList.remove("hidden");
	}

	hide():void {
		this._element.classList.add("hidden");
	}
	
	setVisible(visible: boolean){
		this._element.classList.toggle("hidden", !visible);
	}

	isVisible(): boolean {
		return !this._element.classList.contains("hidden");
	}
}
