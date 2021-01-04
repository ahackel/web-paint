import {config} from "./config";
import Utils from "./utils/Utils";
import Point from "./utils/Point";

export default class Layer {

    protected _canvas: HTMLCanvasElement;
    protected _ctx: CanvasRenderingContext2D;
    
    private _currentTouchId: number = 0;
    private _dragOrigin: Point;
    private _pinchStartDist: number;
    private _pinchStartRotation: number;
    private _startScale: number = 1;
    private _startRotation: number = 0;
    private _position: Point = new Point(0, 0);
    private _scale: number = 1;
    private _rotation: number = 0;
    
    get canvas() { return this._canvas; }
    get ctx() { return this._ctx; }
    get width(): number { return this._canvas.width; }
    get height(): number { return this._canvas.height; }
    get floating(): boolean { return this._canvas.classList.contains("floating"); }
    set floating(value: boolean) { this._canvas.classList.toggle("floating", value); }

    constructor(parent: HTMLElement, id: string, width: number, height: number, acceptInput: boolean = false) {
        this._canvas = <HTMLCanvasElement>document.createElement("canvas");
        this._canvas.id = id;
        this._canvas.width = width;
        this._canvas.height = height;
        this._ctx = <CanvasRenderingContext2D>this._canvas.getContext("2d", {alpha: true});
        this._ctx.imageSmoothingQuality = "high";
        this._ctx.imageSmoothingEnabled = config.imageSmoothing;
        if (!acceptInput){
            this._canvas.style.pointerEvents = "none";
        }
        else {
            this.addEventListeners();
        }
            
        parent.appendChild(this._canvas);
    }

    getData(): ImageData {
        return this._ctx.getImageData(0, 0, this.width, this.height);
    }

    putData(data: ImageData) {
        this._ctx.putImageData(data, 0, 0);
    }
    
    drawImage(image: HTMLImageElement | HTMLCanvasElement){
        this._ctx.drawImage(image, 0, 0, this.width, this.height);
    }
    
    clear(){
        this._ctx.clearRect(0,0, this.width, this.height);
    }


    private addEventListeners() {
        this._canvas.addEventListener('click', event => event.preventDefault());

        if (window.PointerEvent != null){
            // Required to prevent pointerDown events from being choked when tapping repeatedly: 
            this._canvas.addEventListener('touchstart', event => this.touchStart(event));
            this._canvas.addEventListener('touchmove', event => this.touchMove(event));
            this._canvas.addEventListener('touchend', event => this.touchEnd(event));
            this._canvas.addEventListener('touchcancel', event => event.preventDefault());
        }
    }

    private touchStart(event: TouchEvent) {
        event.preventDefault();
        
        if (event.touches.length != 2){
            return;
        }

        let target = <HTMLElement>event.target;
        //target.setPointerCapture(event.pointerId);

        //this._currentTouchId = event.pointerId;

        let rect = target.getBoundingClientRect();
        let p1 = new Point(event.touches[0].clientX, event.touches[0].clientY);
        let p2 = new Point(event.touches[1].clientX, event.touches[1].clientY);
        let layerPosition = new Point(rect.x, rect.y);
        let center = Point.center(p1, p2);
        this._dragOrigin = Point.subtract(center, layerPosition);
        this._pinchStartDist = Point.distance(p1, p2);
        this._pinchStartRotation = Math.atan2(p1.y - center.y, p1.x - center.x);
        this._startRotation = this._rotation;
        this._startScale = this._scale;
    }

    private touchMove(event: TouchEvent) {
        event.preventDefault();
        if (event.touches.length != 2){
            return;
        }

        let p1 = new Point(event.touches[0].clientX, event.touches[0].clientY);
        let p2 = new Point(event.touches[1].clientX, event.touches[1].clientY);
        let center = Point.center(p1, p2);
        let distance = Point.distance(p1, p2);
        let angle = Math.atan2(p1.y - center.y, p1.x - center.x);
        let angleChange = angle - this._pinchStartRotation;

        let position = Point.center(p1, p2);
        let scale = this._startScale + 0.01 * (distance - this._pinchStartDist);
        let rotation = this._startRotation + angleChange;
        this.transform(position, scale, rotation);
    }

    private touchEnd(event: TouchEvent) {
        // event.preventDefault();
        // if (event.pointerType == 'touch' && event.pointerId !== this._currentTouchId){
        //     return;
        // }
        //
        // // Return if this was not the left mouse button:
        // // if (event.pointerType != 'touch' && event.buttons !== 1){
        // //     return;
        // // }
        //
        // let target = <HTMLElement>event.target;
        // target.releasePointerCapture(event.pointerId);
        // this._currentTouchId = 0;
    }

    private transform(position: Point, scale: number, rotation: number) {
        // compensate original center:
        position.x += (-0.5 * this.width);
        position.y += (-0.5 * this.height);
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
        this._canvas.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${rotation}rad) scale(${scale})`;
        this._canvas.style.borderWidth = `${2 / scale}px`;
    }
}