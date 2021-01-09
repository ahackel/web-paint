import Tool from "./Tool";
import Point from "../utils/Point";

// @ts-ignore
import brushPath from "url:../../img/stamps/star.png";
import Utils from "../utils/Utils";
import PaintView from "../views/PaintView";

// Fills an area with the selected color 
export default class StampTool extends Tool {

    private _stampImage: HTMLImageElement;
    private _stampButton: HTMLDivElement;

    constructor(painter: PaintView) {
        super(painter);
        this._stampButton = <HTMLDivElement>document.getElementById("stamp-button");
        Utils.addFastClick(this._stampButton, () => this.performStamp());
        this._stampButton.hidden = true;
    }

    tick(delta: number) {
        if (!this.painter.stamp || !this.painter.floatingLayer || !this._stampImage){
            return;
        }
        
        if (this.getFileName(this._stampImage.src) != this.getFileName(this.painter.stamp)){
            this.setStampImage(this.painter.stamp);
            return;
        }
        
        
        if (this.painter.floatingLayer.ctx.fillStyle != this.painter.color) {
            this.drawStampImage();
        }
    }
    
    getFileName(url: string){
        return url.substring(url.lastIndexOf('/')+1)
    }

    enable() {
        this.mouse = new Point(this.painter.width * 0.5, this.painter.height * 0.5);
        this.showStampLayer();
        this._stampButton.hidden = false;
    }

    disable() {
        this.hideStampLayer();
        this._stampButton.hidden = true;
    }
    
    performStamp(){
        this.painter.recordUndo();
        this.painter.floatingLayer.drawToCanvas(this.painter.baseLayer.ctx);
        this.painter.saveImage();
    }

    private hideStampLayer() {
        this.painter.removeLayer(this.painter.floatingLayer);
    }

    private showStampLayer() {
        if (this.painter.floatingLayer){
            return;
        }
        
        const x = this.mouse.x - 0.5 * 10;
        const y = this.mouse.y - 0.5 * 10;
        this.painter.newFloatingLayer(x, y, 10, 10);
        this.setStampImage(this.painter.stamp);
    }    
    
    private drawStampImage() {
        const img = this._stampImage;
        const width = img.width;
        const height = img.height;
        
        const layer = this.painter.floatingLayer;

        layer.resize(width, height);
        layer.ctx.fillStyle = this.painter.color;
        layer.ctx.fillRect(0, 0, width, height);
        layer.ctx.globalCompositeOperation = "destination-in";
        layer.drawImage(img);
        layer.ctx.globalCompositeOperation = "source-over";
        layer.canvas.style.opacity = "0.5";
    }

    private setStampImage(id: string) {
        this.loadStampImage(id)
            .then(img => {
                this._stampImage = img;
                this.drawStampImage()
            });       
    }

    private loadStampImage(id: string): Promise<HTMLImageElement> {
        if (!this._stampImage){
            this._stampImage = new Image();
        }
        if (this._stampImage.src == this.painter.stamp){
            return Promise.resolve(this._stampImage);
        }

        this._stampImage.src = id;
        return new Promise<HTMLImageElement>(resolve => {
            this._stampImage.onload = () => resolve(this._stampImage);
        });
    }
}
