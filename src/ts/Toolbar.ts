import {View} from "./views/View";

export class Toolbar extends View {
    constructor(id: string) {
        super(id);
        this.show();
    }
    
    flip(){
        if (this._element.classList.contains("left") || this._element.classList.contains("right")){
            this._element.classList.toggle("left");
            this._element.classList.toggle("right");
        }
        if (this._element.classList.contains("top") || this._element.classList.contains("bottom")){
            this._element.classList.toggle("top");
            this._element.classList.toggle("bottom");
        }
    }
}