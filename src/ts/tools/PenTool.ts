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
    private _random: number[];
    private _drawPathRequested: boolean;

    private lerp(a: number, b: number, alpha: number): number{
        return a * (1 - alpha) + b * alpha;
    }
    
    private random(index: number){
        if (!this._random){
            this._random = [];
            for (let i = 0; i < 200; i++) {
                this._random.push(Math.random());
            }
        }
        return this._random[index % this._random.length];
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

        this.requestDrawPath();
    }
    
    tick(delta: number) {
        if (this._drawPathRequested){
            this.drawPath();
            this._drawPathRequested = false;
        }
    }

    requestDrawPath(){
        this._drawPathRequested = true;
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
                point = this._points[i].copy();
                // point.x += (this.random(i) - 0.5) * this._widths[i] * 0.3;
                // point.y += (this.random(i) - 0.5) * this._widths[i] * 0.3;

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

            this.painter.ctx.globalAlpha = 0.9;
            this.painter.ctx.drawImage(ctx.canvas, 0, 0);
            this.painter.ctx.globalAlpha = 1;
        }
    }

    move(): void {
        if (!this.painting) {
            return;
        }

        this._lastPoint = this.mouse.copy();
        let width = this.getWidth();
        this._points.push(this._lastPoint);
        const lastWidth = this._widths[this._widths.length - 1];
        this._widths.push(Utils.clamp(lastWidth - 1, lastWidth + 1, width));

        this.requestDrawPath();
    }

    up(): void {
    }

    pressureChanged(){
        this.requestDrawPath();
    }

    getWidth(){
        return this.painter.lineWidth * Utils.clamp(0.3, 1, this.pressure / this.speed);
    }
}