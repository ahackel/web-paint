import {config} from "./config";
import Layer from "./Layer";
import Rect from "./utils/Rect";

export default class CanvasLayer extends Layer<HTMLCanvasElement> {

    protected _ctx: CanvasRenderingContext2D;
    
    get canvas() { return this._element; }
    get ctx() { return this._ctx; }

    constructor(parent: HTMLElement, id: string, x: number, y: number, width: number, height: number) {
        super(parent, "canvas", id, x, y, width, height);
        this._ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d", {alpha: true});
        this._ctx.imageSmoothingQuality = "high";
        this._ctx.imageSmoothingEnabled = config.imageSmoothing;
    }
    
    getData(): ImageData {
        return this._ctx.getImageData(0, 0, this.width, this.height);
    }

    putData(data: ImageData) {
        this._ctx.putImageData(data, 0, 0);
    }
    
    drawImage(image: HTMLImageElement | HTMLCanvasElement, rect?: Rect){
        const {x, y, width, height} = rect || {x:0, y:0, width:this.width, height:this.height};
        this._ctx.drawImage(image, x, y, width, height);
    }
    
    clear(rect?: Rect){
        const {x, y, width, height} = rect || {x:0, y:0, width:this.width, height:this.height};
        this._ctx.clearRect(x, y, width, height);
    }
}