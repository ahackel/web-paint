import Tool from "./Tool";
import Point from "../Point";
import PaintView from "../PaintView";
// @ts-ignore
import brushPath from "url:../../img/brush.png";

export default class PenTool extends Tool {

    private _lastPoint: Point = new Point(0, 0);
    private _brush: HTMLImageElement;
    private _brushCtx: CanvasRenderingContext2D;
    private _operation: string;
    private _brushSize: number;

    private lerp(a: number, b: number, alpha: number): number{
        return a * (1 - alpha) + b * alpha;
    }

    constructor(painter: PaintView, brushSize: number = 20, operation: string = "darken") {
        super(painter);
        this._brushSize = brushSize;
        this._operation = operation;

        this._brush = new Image();
        this._brush.onload = () => {
            this._brushCtx.drawImage(this._brush, 0, 0);
            this._brushCtx.globalCompositeOperation = "source-in";
        }
        this._brush.src = brushPath;
        let brushCanvas = document.createElement("canvas");
        brushCanvas.width = 128;
        brushCanvas.height = 128;
        this._brushCtx = <CanvasRenderingContext2D>brushCanvas.getContext("2d", { alpha: true });
        this._brushCtx.imageSmoothingQuality = "high";
        this._brushCtx.imageSmoothingEnabled = true;
    }

    down(): void {
        this._brushCtx.fillStyle = this.painter.strokeStyle;
        this._brushCtx.fillRect(0, 0, 128, 128);
        this._lastPoint = this.mouse.copy();
        this.move();
    }

    brushLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {

        let diffX = Math.abs(x2 - x1),
            diffY = Math.abs(y2 - y1),
            dist = Math.sqrt(diffX * diffX + diffY * diffY) || 1,
            step = 0.5 * this._brushSize / dist,
            i = 0,
            t = 0,
            b, x, y;

        while (i <= dist) {
            t = Math.max(0, Math.min(1, i / dist));
            x = x1 + (x2 - x1) * t;
            y = y1 + (y2 - y1) * t;
            ctx.drawImage(this._brushCtx.canvas, x - this._brushSize * 0.5, y - this._brushSize * 0.5, this._brushSize, this._brushSize);
            i += step
        }
    }

    move(): void {
        if (!this.painting) {
            return;
        }

        let ctx1 = this.painter.ctx;

        let midPoint = new Point(
            (this.mouse.x + this._lastPoint.x) * 0.5,
            (this.mouse.y + this._lastPoint.y) * 0.5,
            );

        let a = this.lerp(0.5, 1.5, this.pressure);
        ctx1.lineWidth = this.painter.lineWidth * a;
        ctx1.globalCompositeOperation = this._operation;

        this.brushLine(ctx1, this._lastPoint.x, this._lastPoint.y, this.mouse.x, this.mouse.y);

        this._lastPoint = this.mouse.copy();
    }

    up(): void {
    }
}