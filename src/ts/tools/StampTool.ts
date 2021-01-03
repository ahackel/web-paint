import Tool from "./Tool";
import Point from "../utils/Point";

// @ts-ignore
import brushPath from "url:../../img/stamps/star.png";

// Fills an area with the selected color 
export default class StampTool extends Tool {

    protected _startPosition: Point;
    private _drawShapeRequested: boolean;
    private _stampImage: HTMLImageElement;

    down() {
        this._startPosition = this.mouse;
        let ctx = this.getBufferCtx();
        ctx.strokeStyle = this.color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = this.lineWidth;

        // this.painter.ctx.globalCompositeOperation = this._operation;

        this.requestDrawShape();
    }

    move(): void {
        if (!this.painting) {
            return;
        }

        this.requestDrawShape();
    }

    tick(delta: number) {
        if (this._drawShapeRequested) {
            if (!this._stampImage || this._stampImage.src != this.painter.stamp){
                this.loadStampImage();
                return;
            }
            this.updateShape();
            this._drawShapeRequested = false;
        }
    }

    requestDrawShape() {
        this._drawShapeRequested = true;
    }

    updateShape() {
        let ctx = this.getBufferCtx();

        this.painter.undo(false);
        ctx.clearRect(0, 0, this.painter.width, this.painter.height);

        const x = Math.min(this._startPosition.x, this.mouse.x);
        const y = Math.min(this._startPosition.y, this.mouse.y);
        const width = Math.abs(this._startPosition.x - this.mouse.x);
        const height = Math.abs(this._startPosition.y - this.mouse.y);

        this.drawShape(ctx, x, y, width, height);

        //this.painter.ctx.globalAlpha = this.opacity;
        this.painter.ctx.drawImage(ctx.canvas, 0, 0);
        this.painter.ctx.globalAlpha = 1;
    }

    drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number){
        ctx.save();
        const aspect = this._stampImage.width / this._stampImage.height;
        const size = Point.distance(this._startPosition, this.mouse);
        const dx = this.mouse.x - this._startPosition.x;
        const dy = this.mouse.y - this._startPosition.y;
        const angle = Math.atan2(dy, dx);
        width = size * 2;
        height = width / aspect;
        x = this._startPosition.x - width * 0.5;
        y = this._startPosition.y - height * 0.5;
        ctx.translate(this._startPosition.x, this._startPosition.y);
        ctx.rotate(angle);
        ctx.translate(-this._startPosition.x, -this._startPosition.y);
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, width, height);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(this._stampImage, x, y, width, height);
        ctx.restore();
    }

    private loadStampImage() {
        if (!this._stampImage){
            this._stampImage = new Image();
        }
        this._stampImage.src = this.painter.stamp;
    }
}
