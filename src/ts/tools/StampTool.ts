import Tool from "./Tool";
import Point from "../utils/Point";

// @ts-ignore
import brushPath from "url:../../img/stamps/star.png";
import Utils from "../utils/Utils";
import PaintView from "../views/PaintView";

// Fills an area with the selected color 
export default class StampTool extends Tool {

    private _stampImage: HTMLImageElement;
    private _scale = 1;
    private _rotation = 0;
    private _stampButton: HTMLDivElement;

    constructor(painter: PaintView) {
        super(painter);
        this._stampButton = <HTMLDivElement>document.getElementById("stamp-button");
        Utils.addFastClick(this._stampButton, () => this.performStamp());
        this._stampButton.hidden = true;
    }

    tick(delta: number) {
        if (!this._stampImage || !this.painter.hasFloatingLayer()){
            return;
        }
        
        if (this._stampImage.src != this.painter.stamp || this.painter.floatingLayer.ctx.fillStyle != this.painter.color) {
            this.recreateStamp();
        }
    }

    enable() {
        this.mouse = new Point(this.painter.width * 0.5, this.painter.height * 0.5);
        this.showStamp();
        this._stampButton.hidden = false;
    }

    disable() {
        this.hideStamp();
        this._stampButton.hidden = true;
    }
    
    performStamp(){
        this.painter.recordUndo();
        this.painter.floatingLayer.drawToCanvas(this.painter.baseLayer.ctx);        
    }

    private hideStamp() {
        if (!this.painter.hasFloatingLayer()){
            return;
        }
        
        // save transform:
        let layer = this.painter.floatingLayer;
        this._scale = layer.scale;
        this._rotation = layer.rotation;
        this.mouse = new Point(layer.position.x + 0.5 * layer.width, layer.position.y + 0.5 * layer.height);

        this.painter.removeLayer(this.painter.floatingLayer);
    }

    private showStamp() {
        if (this.painter.hasFloatingLayer()) {
            this._scale = this.painter.floatingLayer.scale;
            this._rotation = this.painter.floatingLayer.rotation;
        }

        this.loadStampImage()
            .then(img => {
                const width = img.width;
                const height = img.height;
                const x = this.mouse.x - 0.5 * width;
                const y = this.mouse.y - 0.5 * height;
                let layer = this.painter.newFloatingLayer(x, y, width, height);
                layer.ctx.fillStyle = this.painter.color;
                layer.ctx.fillRect(0, 0, width, height);
                layer.ctx.globalCompositeOperation = "destination-in";
                layer.drawImage(img);
                layer.ctx.globalCompositeOperation = "source-over";
                layer.transform(new Point(x, y), this._scale, this._rotation);
                layer.canvas.style.opacity = "0.5";
            })       
    }

    private recreateStamp(){
        this.hideStamp();
        this.showStamp();
    }

    private loadStampImage(): Promise<HTMLImageElement> {
        if (!this._stampImage){
            this._stampImage = new Image();
        }
        if (this._stampImage.src == this.painter.stamp){
            return Promise.resolve(this._stampImage);
        }

        this._stampImage.src = this.painter.stamp;
        return new Promise<HTMLImageElement>(resolve => {
            this._stampImage.onload = () => resolve(this._stampImage);
        });
    }
}
