import Tool from "./Tool";
import Point from "../utils/Point";
import {PaintView, IPointerData} from "../views/PaintView";
import Utils from "../utils/Utils";

// @ts-ignore
import brushPath from "url:../../img/brush.png";
import Layer from "../Layer";

// Paints lines with varying stroke width
export default class PenTool extends Tool {

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
        
        this._points = [data.position];
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
        this.drawConnectedLines(ctx, this._points.slice(this._startIndex), this._widths.slice(this._startIndex));
        
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
        ctx.moveTo(p1.x, p1.y);

        if (pointCount == 1) {
            ctx.lineWidth = widths[0];
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
            return;
        }

        for (let i = 1; i < pointCount; i++) {
            ctx.beginPath();
            ctx.lineWidth = widths[i];
            ctx.moveTo(points[i-1].x, points[i-1].y);
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
        }
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
        let newPoints = this.interpolatePoints(data.position);
        console.log(newPoints);

        this._points = this._points.concat(newPoints);
        const numSegments = newPoints.length;

        let width = this.getWidth(data.pressure, data.speed);
        const lastWidth = this._widths[this._widths.length - 1];
        const maxWidthDifferencePerSegment = 2;
        const maxWidthDifference = 2 * numSegments;
        width = Utils.clamp(lastWidth - maxWidthDifference, lastWidth + maxWidthDifference, width);

        for (let i = 0; i < numSegments; i++) {
            this._widths.push(Utils.lerp(lastWidth, width, i / numSegments));
        }

        this.requestDrawPath();
    }

    private interpolatePoints(newPoint: Point): Point[] {
        const segmentLength = Math.max(2, 0.1 * this.lineWidth);
        const points: Point[] = [];
        
        if (this._points.length == 0){
            return;
        }
        
        const start = this._points[this._points.length - 1];
        const end = newPoint;
        const dist = Point.distance(start, end);

        if (dist < segmentLength){
            return points;
        }

        let control = start;
        if (this._points.length > 1){
            const tangent = Point.subtract(start, this._points[this._points.length - 2]).normalize();
            control = Point.add(start, tangent.copy().scale(0.3 * dist));
        }
        
        const a = segmentLength / dist;
        for (let i = a; i <= 1; i += a) {
            const point = this.pointOnQuadraticCurve(start, control, end, i);
            points.push(point);
        }
        return points;
    }

    private pointOnQuadraticCurve(start : Point, control: Point, end: Point, a: number): Point {
        return Point.add(Point.scale(start, (1 - a) * (1 - a)),
            Point.scale(control, 2 * a * (1 - a)),
            Point.scale(end, a * a)
        );
    }

    pressureChanged(){
        this.requestDrawPath();
    }

    getWidth(pressure: number, speed: number){
        pressure = Utils.clamp(0.5, 2, pressure * 2);
        speed = Utils.clamp(1, 2, speed);
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