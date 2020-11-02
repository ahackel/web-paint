import Tool from "./Tool";
import Point from "../Point";
import PaintView from "../PaintView";
// @ts-ignore
import brushPath from "url:../../img/brush.png";
import Utils from "../Utils";

export default class PenTool extends Tool {

    private _lastPoint: Point = new Point(0, 0);
    private _brush: HTMLImageElement;
    private _brushCtx: CanvasRenderingContext2D;
    private _operation: string;
    private _points: Point[];
    private _widths: number[];

    private lerp(a: number, b: number, alpha: number): number{
        return a * (1 - alpha) + b * alpha;
    }

    constructor(painter: PaintView, operation: string = "darken") {
        super(painter);
        this._operation = operation;

        let brushCanvas = document.createElement("canvas");
        brushCanvas.width = this.painter.width;
        brushCanvas.height = this.painter.height;
        this._brushCtx = <CanvasRenderingContext2D>brushCanvas.getContext("2d", { alpha: true });
        this._brushCtx.imageSmoothingQuality = "high";
        this._brushCtx.imageSmoothingEnabled = true;
    }

    down(): void {
        this._lastPoint = this.mouse.copy()
        this._points = [this._lastPoint];
        this._widths = [this.getWidth()];

        let ctx = this._brushCtx;
        ctx.strokeStyle = this.painter.strokeStyle;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        this.painter.ctx.globalCompositeOperation = this._operation;

        window.webkitRequestAnimationFrame(() => this.drawPath());
    }

    drawPath(){
        let ctx = this._brushCtx;
        if (this._points.length > 0){
            this.painter.undo(false);
            ctx.clearRect(0, 0, this.painter.width, this.painter.height);

            let point = this._points[0];
            let oldPoint = point;

            for (let i = 0; i < this._points.length; i++){
                let lastPoint = this._points[Math.max(0, i - 1)];
                point = this._points[i];

                let midPoint = new Point(
                    (point.x + lastPoint.x) * 0.5,
                    (point.y + lastPoint.y) * 0.5,
                    );

                ctx.lineWidth = this._widths[i];
                ctx.beginPath();
                ctx.moveTo(oldPoint.x, oldPoint.y);
                ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, midPoint.x, midPoint.y);
                ctx.stroke();
                oldPoint = midPoint;
            }
            ctx.moveTo(oldPoint.x, oldPoint.y);
            ctx.quadraticCurveTo(point.x, point.y, this._lastPoint.x, this._lastPoint.y);
            ctx.stroke();

            let radius = this.getWidth() * 0.5;
            ctx.beginPath();
            ctx.arc(this._lastPoint.x, this._lastPoint.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fill();

            this.painter.ctx.drawImage(ctx.canvas, 0, 0);
        }
    }

    // brushLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    //
    //     const brushSize = this.painter.brushSize;
    //     let diffX = Math.abs(x2 - x1),
    //         diffY = Math.abs(y2 - y1),
    //         dist = Math.sqrt(diffX * diffX + diffY * diffY) || 1,
    //         step = 0.5 * brushSize / dist,
    //         i = 0,
    //         t = 0,
    //         b, x, y;
    //
    //     while (i <= dist) {
    //         t = Math.max(0, Math.min(1, i / dist));
    //         x = x1 + (x2 - x1) * t;
    //         y = y1 + (y2 - y1) * t;
    //         ctx.drawImage(this._brushCtx.canvas, x - brushSize * 0.5, y - brushSize * 0.5, brushSize, brushSize);
    //         i += step
    //     }
    // }

    move(): void {
        if (!this.painting) {
            return;
        }

        // let ctx1 = this.painter.ctx;
        //
        // let midPoint = new Point(
        //     (this.mouse.x + this._lastPoint.x) * 0.5,
        //     (this.mouse.y + this._lastPoint.y) * 0.5,
        //     );
        //
        // let a = this.lerp(0.5, 1.5, this.pressure);
        // ctx1.lineWidth = this.painter.lineWidth * a;
        // ctx1.globalCompositeOperation = "darken";
        //
        // ctx1.quadraticCurveTo(this._lastPoint.x, this._lastPoint.y, midPoint.x, midPoint.y);
        // ctx1.stroke();
        // ctx1.beginPath();
        // ctx1.moveTo(midPoint.x, midPoint.y);
        //

        this._lastPoint = this.mouse.copy();
        let delta = Point.distance(this._points[this._points.length - 1], this._lastPoint);

        let width = this.getWidth();
        if (delta > width * 0.25) {
            this._points.push(this._lastPoint);
            this._widths.push(width);
        }

        window.webkitRequestAnimationFrame(() => this.drawPath());
    }

    up(): void {
    }

    pressureChanged(){
        window.webkitRequestAnimationFrame(() => this.drawPath());
    }

    getWidth(){
        return this.painter.lineWidth * Utils.clamp(0.3, 1, this.pressure / this.speed);
    }
}