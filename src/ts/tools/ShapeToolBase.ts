import Tool from "./Tool";
import Point from "../utils/Point";
import Utils from "../utils/Utils";

// Fills an area with the selected color 
export default abstract class ShapeToolBase extends Tool {

    protected _startPosition: Point;
    private _drawShapeRequested: boolean;

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
            this.updateShape();
            this._drawShapeRequested = false;
        }
    }

    requestDrawShape() {
        this._drawShapeRequested = true;
    }

    updateShape() {
        let ctx = this.getBufferCtx();

        this.painter.restoreCurrentHistoryState();
        ctx.clearRect(0, 0, this.painter.width, this.painter.height);

        const x = Math.min(this._startPosition.x, this.mouse.x);
        const y = Math.min(this._startPosition.y, this.mouse.y);
        const width = Math.abs(this._startPosition.x - this.mouse.x);
        const height = Math.abs(this._startPosition.y - this.mouse.y);

        this.drawShape(ctx, x, y, width, height);

        //this.painter.ctx.globalAlpha = this.opacity;
        this.painter.baseLayer.drawImage(ctx.canvas);
        this.painter.baseLayer.ctx.globalAlpha = 1;
    }

    abstract drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
}
