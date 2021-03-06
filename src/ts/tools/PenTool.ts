import Tool from "./Tool";
import Vector from "../math/Vector";
import {PaintView, IPointerData} from "../views/PaintView";
import * as Utils from "../utils/Utils";

// @ts-ignore
import brushPath from "url:../../img/brush.png";
import Layer from "../Layer";

// Paints lines with varying stroke width
export default class PenTool extends Tool {

    private _startIndex: number;
    private _points: Vector[];
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
        this._painter.captureAutoMask(data.position.clone().round());
        
        this._points = [data.position];
        const width = this.getWidth(data.pressure, data.speed);
        this._widths = [width];
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
        //     const dist = Vector.distance(p1, p2);
        //     const step = Math.max(1, 0.125 * Math.min(w1, w2, 64));
        //     for (let d = 0; d <= dist; d += step){
        //         const a = d / dist;
        //         const p = Vector.lerp(p1, p2, a);
        //         const w = Utils.lerp(w1, w2, a);
        //         this.drawBrush(ctx, p.x, p.y, w);
        //     }
        // }
        this._startIndex = Math.max(0, this._points.length - 1);
    }
    
    drawConnectedLines(ctx: CanvasRenderingContext2D, points: Vector[], widths: number[]){
        const pointCount = points.length;
        if (pointCount == 0){
            return;
        }
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        let start = points[0];
        let startWidth = widths[0] * this.lineWidth;

        if (pointCount == 1){
            // single dot
            ctx.beginPath();
            ctx.arc(start.x, start.y, 0.5 * startWidth, 0, 2 * Math.PI);
            ctx.fill();
        }

        for (let i = 1; i < pointCount; i++) {
            ctx.beginPath();
            ctx.lineWidth = widths[i] * this.lineWidth;
            ctx.lineTo(points[i-1].x, points[i-1].y);
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

        this._points = this._points.concat(newPoints);
        const numSegments = newPoints.length;

        let width = this.getWidth(data.pressure, data.speed);
        const lastWidth = this._widths[this._widths.length - 1];
        const maxWidthDifferencePerSegment = 2;
        const maxWidthDifference = maxWidthDifferencePerSegment * numSegments;
        width = Utils.clamp(lastWidth - maxWidthDifference, lastWidth + maxWidthDifference, width);

        for (let i = 0; i < numSegments; i++) {
            this._widths.push(Utils.lerp(lastWidth, width, i / numSegments));
        }

        this.requestDrawPath();
    }

    private interpolatePoints(newPoint: Vector): Vector[] {
        const segmentLength = Math.max(4, 0.1 * this.lineWidth);
        const points: Vector[] = [];
        
        if (this._points.length == 0){
            return;
        }
        
        const start = this._points[this._points.length - 1];
        const end = newPoint;
        const dist = start.distanceTo(end);

        if (dist < segmentLength){
            return points;
        }

        let control = start;
        if (this._points.length > 1){
            const previous = this._points[this._points.length - 2];
            const tangent = start.clone().subtract(previous).normalize();
            control = start.clone().add(tangent.clone().multiplyScalar(0.3 * dist));
        }
        
        const a = segmentLength / dist;
        for (let i = a; i <= 1; i += a) {
            const Vector = this.pointOnQuadraticCurve(start, control, end, i);
            points.push(Vector);
        }
        return points;
    }

    private pointOnQuadraticCurve(start : Vector, control: Vector, end: Vector, a: number): Vector {
        const f1 = (1 - a) * (1 - a);
        const f2 = 2 * a * (1 - a);
        const f3 = a * a;
        
        return new Vector(
            start.x * f1 + control.x * f2 + end.x * f3,
            start.y * f1 + control.y * f2 + end.y * f3);
    }

    pressureChanged(){
        this.requestDrawPath();
    }

    getWidth(pressure: number, speed: number){
        speed = Utils.clamp(1, 2, speed);
        return pressure / speed; // range: 0.5 - 1
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