import Tool from "./Tool";
import Point from "../utils/Point";
import PaintView from "../views/PaintView";
import Utils from "../utils/Utils";

// @ts-ignore
import brushPath from "url:../../img/brush.png";

// Paints lines with varying stroke width
export default class PenTool extends Tool {

    private _lastPoint: Point = new Point(0, 0);
    private _startIndex: number;
    private _points: Point[];
    private _widths: number[];
    private _drawPathRequested: boolean;
    
    private readonly _operation: string;

    constructor(painter: PaintView, buttonId: string, operation: string = "darken") {
        super(painter, buttonId);
        this._operation = operation;
    }

    down(): void {
        this.painter.captureAutoMask(this.mouse.copy().round());
        
        this._lastPoint = this.mouse.copy()
        this._points = [this._lastPoint];
        this._widths = [this.getWidth()];
        this._startIndex = 0; 

        let ctx = this.painter.baseLayer.ctx;
        ctx.strokeStyle = this.color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        this.painter.baseLayer.ctx.globalCompositeOperation = this._operation;

        this.requestDrawPath();
    }
    
    up(): void{
        this.painter.recordHistoryState();
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
        let ctx = this.painter.baseLayer.ctx;
        if (this._points.length > 0){
            // this.painter.restoreCurrentHistoryState();
            //ctx.clearRect(0, 0, this.painter.width, this.painter.height);

            let p1 = this._points[this._startIndex];
            
            if (this._points.length == 1){
                let radius = this.getWidth() * 0.5;
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = ctx.strokeStyle;
                ctx.fill();
                return;
            }

            let p2 = this._points[this._startIndex + 1];
            let midPoint: Point = Point.center(p1, p2);

            ctx.beginPath();
            ctx.moveTo(midPoint.x, midPoint.y);

            for (let i = this._startIndex + 1; i < this._points.length; i++){
                // point.x += (this.random(i) - 0.5) * this._widths[i] * 0.3;
                // point.y += (this.random(i) - 0.5) * this._widths[i] * 0.3;

                midPoint = Point.center(p1, p2);
                ctx.lineWidth = this._widths[i];
                // point = this._points[i];
                // ctx.lineTo(point.x, point.y)
                ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                ctx.stroke();
                p1 = this._points[i];
                p2 = this._points[i + 1];
            }
            this._startIndex = this._points.length - 2;
            // ctx.moveTo(oldPoint.x, oldPoint.y);
            // ctx.quadraticCurveTo(point.x, point.y, this._lastPoint.x, this._lastPoint.y);
            // ctx.stroke();
            //
            
            // this.applyAutoMask();
            //
            // this.painter.baseLayer.ctx.globalAlpha = this.opacity;
            // this.painter.baseLayer.drawImage(ctx.canvas);
            // this.painter.baseLayer.ctx.globalAlpha = 1;
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

    pressureChanged(){
        this.requestDrawPath();
    }

    getWidth(){
        let pressure = Utils.clamp(0.5, 2, this.pressure * 2);
        let speed = Utils.clamp(1, 5, this.speed);
        return this.lineWidth * pressure / speed;
    }

    private applyAutoMask() {
        if (!this.painter.autoMaskCtx){
            return;
        }
        
        let ctx = this.getBufferCtx();
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(this.painter.autoMaskCtx.canvas, 0, 0);
        ctx.globalCompositeOperation = "source-over";
    }
}