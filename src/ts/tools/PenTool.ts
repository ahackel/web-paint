import Tool from "./Tool";
import Point from "../utils/Point";
import {IPointerData, PaintView} from "../views/PaintView";
import Utils from "../utils/Utils";
import {config} from "../config";
import * as PIXI from 'pixi.js';
import {SCALE_MODES} from 'pixi.js';

interface IPointData {
    position: Point,
    width: number,
    tilt: Point,
    speed: number
}

const maxParticles = 500;

// Paints lines with varying stroke width
export default class PenTool extends Tool {

    private _startIndex: number;
    private _points: IPointData[] = [];
    private _drawPathRequested: boolean;
    private _brushCtx: CanvasRenderingContext2D;
    private _mode: string;
    private _particles: PIXI.Sprite[] = [];
    private _brush: PIXI.ParticleContainer;

    private readonly _operation: string;

    constructor(painter: PaintView, buttonId: string, operation: string = "darken") {
        super(painter, buttonId);
        this._operation = operation;
        this._mode = "line";
        this.createBrush();
    }

    private createBrush() {
        this._particles = [];

        this._brush = new PIXI.ParticleContainer(maxParticles, {
            vertices: true,
            rotation: true,
            position: true,
            uvs: true,
            tint: false
        });

        for (let i = 0; i < maxParticles; i++) {
            
            const circle = new PIXI.Graphics(); 
            circle.beginFill(0x000000);
            circle.drawCircle(32, 32, 32);
            circle.endFill();
            const rt = this._painter.pixi.renderer.generateTexture(circle, SCALE_MODES.LINEAR, 1);
            circle.destroy();
            
            const particle = new PIXI.Sprite(rt);
            particle.tint = 0x000000;
            particle.anchor.set(0.5);
            particle.scale.set(0);

            this._particles.push(particle);
            this._brush.addChild(particle);
        }
        // this._painter.baseLayer.sprite.addChild(this._brush);
    }

    down(data: IPointerData): void {
        this._painter.captureAutoMask(data.position.copy().round());
        
        const width = this.getWidth(data.pressure, data.speed, data.tilt);
        const position = this.getPosition(data.position, data.tilt, width);
        this._points = [{
            position: position,
            width: width,
            tilt: data.tilt,
            speed: data.speed
        }];
        this._startIndex = 0;

        this.requestDrawPath();
    }
    
    up(): void{
        this._points = [];
        this._startIndex = 0;
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

        if (this._mode == "line"){
            this.drawConnectedLines(this._points.slice(this._startIndex));
//             this.drawConnectedLines(this._points);
        }
        // else if (this._mode == "crayon"){
        //     this.drawRandomPixelLines(ctx, this._points.slice(this._startIndex));
        // }
        
        this._startIndex = Math.max(0, this._points.length - 1);
    }
    
    drawConnectedLines(points: IPointData[]){
        const pointCount = points.length;
        if (pointCount == 0){
            return;
        }
        

        for (let i = 0; i < maxParticles; i++)
        {
            const particle = this._particles[i];

            if (i > points.length - 1) {
                particle.scale.set(0);
                continue;    
            }

            const point = points[i];
            
            particle.scale.set(1);
            particle.width = point.width;
            particle.height = point.width;
            particle.x = point.position.x;
            particle.y = point.position.y;
        }
        
        const rt = <PIXI.RenderTexture>this._painter.baseLayer.sprite.texture;
        this._painter.pixi.renderer.render(this._brush, rt, false, null, true);

            // ctx.lineCap = "round";
        // ctx.lineJoin = "round";
        // let start = points[0].position;
        // let startWidth = points[0].width * this.lineWidth;
        //
        // if (pointCount == 1){
        //     // single dot
        //     ctx.beginPath();
        //     ctx.arc(start.x, start.y, 0.5 * startWidth, 0, 2 * Math.PI);
        //     ctx.fill();
        // }
        //
        // for (let i = 1; i < pointCount; i++) {
        //     ctx.beginPath();
        //     ctx.lineWidth = points[i].width * this.lineWidth;
        //     const lastPosition = points[i-1].position;
        //     const position = points[i].position;
        //     ctx.lineTo(lastPosition.x, lastPosition.y);
        //     ctx.lineTo(position.x, position.y);
        //     ctx.stroke();
        // }
    }
    
    drawRandomPixelLines(ctx: CanvasRenderingContext2D, points: IPointData[]){
        const pointCount = points.length;
        if (pointCount == 0){
            return;
        }

        ctx.globalAlpha = 0.8;

        if (pointCount == 1){
            this.drawRandomPixelLine(ctx, points[0], points[0]);
            return;
        }
        
        for (let i = 1; i < pointCount; i++) {
            this.drawRandomPixelLine(ctx, points[i-1], points[i])
        }
        ctx.globalAlpha = 1;
    }
    
    _lastTangent: Point = new Point(1, 0)

    private drawRandomPixelLine(ctx: CanvasRenderingContext2D, start: IPointData, end: IPointData, maxPixelCount = 300) {
        // TODO: Get correct angle:
        const altitude = Math.max(Math.abs(start.tilt.x), Math.abs(start.tilt.y));
        start.width = Utils.lerp(3, 100, Math.pow(altitude / 90, 4));
        end.width = start.width;
        const averageWidth = 0.5 * (start.width + end.width);
        let pixelSize = Utils.clamp(2, 12, averageWidth * 0.5);
        const tiltInfluence = Utils.lerp(1,0.1, Math.max(start.tilt.x, start.tilt.y) / 90);
        //const pressureInfluence = Utils.lerp(1,0.1, Math.max(start.tilt.x, start.tilt.y) / 90);
        const density = tiltInfluence * 0.1 / Utils.clamp(1, 5, start.speed);
        const dist = Point.distance(start.position, end.position);
        let pixelCount = (dist + averageWidth) * averageWidth * density;
        
        if (pixelCount > maxPixelCount){
            pixelSize *= pixelCount / maxPixelCount;
            pixelCount = maxPixelCount;
        }
        
        ctx.beginPath();
//        const tangent = dist == 0 ? this._lastTangent : Point.subtract(start.position, end.position).normalize();
        const tangent = start.tilt.normalize();
        this._lastTangent = tangent;
        // const normal = new Point(-tangent.y, tangent.x);
        const normal = start.tilt.normalize();
        
        for (let i = 0; i < pixelCount; i++) {
            const a = Math.random();
            const position = Point.lerp(start.position, end.position, a);
            const width = Utils.lerp(start.width, end.width, a);

            let size = Utils.lerp(1, pixelSize, Math.random());
            const radius = Math.max(0, 0.5 * (width - size));

            // use this for even distribution:
            const r = radius * Math.sqrt(Math.random());
            // this will focus distribution to the center:
            // const r = radius * Math.random();
            const angle = Math.random() * 2 * Math.PI;

            const offset = Point.scale(normal,radius * Utils.lerp(-1, 1, Math.pow(Math.random(), 3)));
            position.add(offset);
            
            if (config.pixelPerfect){
                position.round();
                size = Math.ceil(size);
            }
            
            ctx.arc(position.x, position.y, 0.5 * size, 0, Math.PI * 2);
            ctx.closePath();
            //ctx.fillRect(position.x, position.y, size, size);
        }
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
        let width = this.getWidth(data.pressure, data.speed, data.tilt);
        const position = this.getPosition(data.position, data.tilt, width);
        
        const newPoint = {
            position: position,
            width: width,
            tilt: data.tilt,
            speed: data.speed
        }
        
        let newPoints = this.interpolatePoints(newPoint);

        this._points = this._points.concat(newPoints);
        // const numSegments = newPoints.length;

        // const lastWidth = this._points[this._points.length - 1];
        // const maxWidthDifferencePerSegment = 2;
        // const maxWidthDifference = maxWidthDifferencePerSegment * numSegments;
        // width = Utils.clamp(lastWidth - maxWidthDifference, lastWidth + maxWidthDifference, width);

        this.requestDrawPath();
    }

    private interpolatePoints(newPoint: IPointData): IPointData[] {
        const segmentLength = Math.max(4, 0.1 * this.lineWidth);
        const points: IPointData[] = [];
        
        if (this._points.length == 0){
            return points;
        }
        
        const start = this._points[this._points.length - 1];
        const end = newPoint;
        const startPosition = start.position;
        const endPosition = end.position;
        const startWidth = start.width;
        const endWidth = end.width;
        const startTilt = start.tilt;
        const endTilt = end.tilt;
        const dist = Point.distance(startPosition, endPosition);

        if (dist < segmentLength){
            return points;
        }

        let controlPoint = startPosition;
        if (this._points.length > 1){
            const tangent = Point.subtract(startPosition, this._points[this._points.length - 2].position).normalize();
            controlPoint = Point.add(startPosition, tangent.copy().scale(0.3 * dist));
        }
        
        const a = segmentLength / dist;
        for (let i = a; i <= 1; i += a) {
            points.push({
                position: this.pointOnQuadraticCurve(startPosition, controlPoint, endPosition, i),
                width: Utils.lerp(startWidth, endWidth, i),
                tilt: Point.lerp(startTilt, endTilt, i),
                speed: Utils.lerp(start.speed, end.speed, i),
            });
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

    getWidth(pressure: number, speed: number, tilt: Point){
        pressure = Utils.lerp(0.5, 2, pressure);
        speed = Utils.clamp(1, 2, speed);
        const tiltVariation = Utils.lerp(1, 8, Math.max(tilt.x, tilt.y) / 90);
        return this.lineWidth * tiltVariation * pressure / speed; // range: 0.5 - 1
    }

    getPosition(position: Point, tilt: Point, width: number): Point {
        return position;
        
        const tiltInfluence = 0.75;
        return Point.add(position, Point.scale(tilt, tiltInfluence * 0.5 * width / 90));
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