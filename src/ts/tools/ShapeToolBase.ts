import Tool from "./Tool";
import Point from "../utils/Point";
import Utils from "../utils/Utils";
import {PaintView, IPointerData} from "../views/PaintView";

// Fills an area with the selected color 
export default abstract class ShapeToolBase extends Tool {

    protected _startPosition: Point;
    protected _position: Point;
    private _drawShapeRequested: boolean;

    down(data: IPointerData): void {
        this._startPosition = data.position;
        this._position = data.position;
        let ctx = this.getBufferCtx();
        ctx.strokeStyle = this.color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = this.lineWidth;

        // this.painter.ctx.globalCompositeOperation = this._operation;

        this.requestDrawShape();
    }

    move(data: IPointerData): void {
        this._position = data.position;
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

        this._painter.restoreCurrentHistoryState();
        ctx.clearRect(0, 0, this._painter.width, this._painter.height);

        const x = Math.min(this._startPosition.x, this._position.x);
        const y = Math.min(this._startPosition.y, this._position.y);
        const width = Math.abs(this._startPosition.x - this._position.x);
        const height = Math.abs(this._startPosition.y - this._position.y);

        this.drawShape(ctx, x, y, width, height);

        //this.painter.ctx.globalAlpha = this.opacity;
        this._painter.baseLayer.drawImage(ctx.canvas);
        this._painter.baseLayer.ctx.globalAlpha = 1;
    }

    abstract drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
}
