import Tool from "./Tool";
import Point from "../utils/Point";
import {PaintView, IPointerData} from "../views/PaintView";
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
    private _brushCtx: CanvasRenderingContext2D;
    
    private readonly _operation: string;

    constructor(painter: PaintView, buttonId: string, operation: string = "darken") {
        super(painter, buttonId);
        this._operation = operation;
        this.createBrushCtx();
    }

    private createBrushCtx() {
        let brushCanvas = document.createElement("canvas");
        brushCanvas.id = "brush";
        brushCanvas.width = 64;
        brushCanvas.height = 64;
        this._brushCtx = <CanvasRenderingContext2D>brushCanvas.getContext("2d", {alpha: true});
        this._brushCtx.imageSmoothingQuality = "high";
        this._brushCtx.imageSmoothingEnabled = true;
    }

    down(data: IPointerData): void {
        this._painter.captureAutoMask(data.position.copy().round());
        
        this._lastPoint = data.position.copy()
        this._points = [this._lastPoint];
        this._widths = [this.getWidth(data.pressure, data.speed)];
        this._startIndex = 0;

        let ctx = this._painter.baseLayer.ctx;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;


        // let ctx = this._brushCtx;
        // let brushWidth = ctx.canvas.width;
        // ctx.clearRect(0, 0, brushWidth, brushWidth);
        // ctx.fillStyle = this.color;
        // let radius = brushWidth * 0.5;
        // ctx.beginPath();
        // ctx.arc(radius, radius, radius - 1, 0, 2 * Math.PI);
        // ctx.fill();  
        this._painter.baseLayer.ctx.globalCompositeOperation = this._operation;

        this.requestDrawPath();
    }
    
    up(): void{
        this._painter.recordHistoryState();
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
        if (this._points.length == 0) {
            return;
        }

        let ctx = this._painter.baseLayer.ctx;
        this.drawVaryingLines(ctx, this._points.slice(this._startIndex), this._widths.slice(this._startIndex));
        
        // if (this._points.length - this._startIndex == 1){
        //     const p = this._points[this._startIndex];
        //     this.drawBrush(ctx, p.x, p.y, this._widths[this._startIndex]);
        //     return;
        // }
        //
        // for (let i = this._startIndex; i < this._points.length - 1; i++) {
        //     const p1 = this._points[i];
        //     const p2 = this._points[i+1];
        //    
        //     const w1 = this._widths[i];
        //     const w2 = this._widths[i+1];
        //
        //     const dist = Point.distance(p1, p2);
        //     const step = Math.max(1, 0.125 * Math.min(w1, w2, 64));
        //     for (let d = 0; d <= dist; d += step){
        //         const a = d / dist;
        //         const p = Point.lerp(p1, p2, a);
        //         const w = Utils.lerp(w1, w2, a);
        //         this.drawBrush(ctx, p.x, p.y, w);
        //     }
        // }
        this._startIndex = Math.max(0, this._points.length - 1);
    }
    
    drawConnectedLines(ctx: CanvasRenderingContext2D, points: Point[], widths: number[]){
        const pointCount = points.length;
        if (pointCount == 0){
            return;
        }
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        let p1 = points[0];
        
        if (pointCount == 1) {
            ctx.lineWidth = widths[0];
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
            return;
        }

        // let p2 = this._points[this._startIndex + 1];
        // let midPoint: Point = Point.center(p1, p2);

        let p2 = points[1];
        let midPoint = Point.center(p1, p2);
        ctx.moveTo(midPoint.x, midPoint.y);

        for (let i = 0; i < pointCount - 1; i++) {
            p1 = points[i];
            p2 = points[i + 1];
            midPoint = Point.center(p1, p2);
            ctx.lineWidth = widths[i];
            ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
        }
        ctx.stroke();
    }
    
    drawVaryingLines(ctx: CanvasRenderingContext2D, points: Point[], widths: number[]){
        const pointCount = points.length;
        if (pointCount == 0){
            return;
        }
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        let p1 = points[0];

        if (pointCount == 1) {
            ctx.beginPath();
            ctx.lineWidth = widths[0];
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
            return;
        }

        let p2 = points[1];
        for (let i = 0; i < pointCount - 1; i++) {
            p1 = points[i];
            p2 = points[i + 1];
            this.varLine(ctx, p1.x, p1.y, p2.x, p2.y, widths[i], widths[i+1]);
        }
    }

    varLine(ctx, x1, y1, x2, y2, w1, w2) {
        var dx = (x2 - x1),  shiftx = 0;
        var dy = (y2 - y1),  shifty = 0;
        w1 /= 2;   w2 /= 2; // we only use w1/2 and w2/2 for computations.    
        // length of the AB vector
        var length = Math.sqrt(dx * dx + dy * dy);
        if (!length) return; // exit if zero length
        dx /= length ;    dy /= length ;
        shiftx = - dy * w1 ;  // compute AA1 vector's x
        shifty =   dx * w1 ;  // compute AA1 vector's y
        var angle = Math.atan2(shifty, shiftx);
        ctx.beginPath();
        ctx.moveTo(x1 + shiftx, y1 + shifty);
        ctx.arc(x1,y1, w1, angle, angle+Math.PI); // draw A1A2
        shiftx =  - dy * w2 ;  // compute BB1 vector's x
        shifty =    dx * w2 ;  // compute BB1 vector's y
        ctx.lineTo(x2 - shiftx, y2 - shifty); // draw A2B1
        ctx.arc(x2,y2, w2, angle+Math.PI, angle); // draw A1A2    
        ctx.closePath(); // draw B2A1
        ctx.fill();
    }
    
    drawBrush(ctx: CanvasRenderingContext2D, x: number, y: number, width: number){
        let radius = width * 0.5;
        x -= radius;
        y -= radius;
        // x = Math.floor(x - radius);
        // y = Math.floor(y - radius);
        // width = Math.ceil(width);
        ctx.drawImage(this._brushCtx.canvas, x, y, width, width);
    }

    move(data: IPointerData): void {
        this._lastPoint = data.position.copy();
        let width = this.getWidth(data.pressure, data.speed);
        this._points.push(this._lastPoint);
        const lastWidth = this._widths[this._widths.length - 1];
        this._widths.push(Utils.clamp(lastWidth - 1, lastWidth + 1, width));

        this.requestDrawPath();
    }

    pressureChanged(){
        this.requestDrawPath();
    }

    getWidth(pressure: number, speed: number){
        pressure = Utils.clamp(0.5, 2, pressure * 2);
        speed = Utils.clamp(1, 5, speed);
        return this.lineWidth * pressure / speed;
    }

    private applyAutoMask() {
        if (!this._painter.autoMaskCtx){
            return;
        }
        
        let ctx = this.getBufferCtx();
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(this._painter.autoMaskCtx.canvas, 0, 0);
        ctx.globalCompositeOperation = "source-over";
    }
}