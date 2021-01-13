import Layer from "./Layer";

export default class ImageLayer extends Layer<HTMLImageElement> {

    get image(): HTMLImageElement { return this._element; }

    constructor(parent: HTMLElement, id: string, x: number, y: number, width: number, height: number) {
        super(parent, "img", id, x, y, width, height);
        this._element.onload = () => {
            // if this.image.completed
            this.resize(this.image.naturalWidth, this.image.naturalHeight);
        }
    }
}