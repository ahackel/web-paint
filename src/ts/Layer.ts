import {config} from "./config";
import Utils from "./utils/Utils";
import Point from "./utils/Point";

export default class Layer {

    protected _canvas: HTMLCanvasElement;
    protected _ctx: CanvasRenderingContext2D;
    
    private _index: number;
    private _pinchCenter: Point;
    private _pinchStartDist: number;
    private _pinchStartRotation: number;
    private _startScale: number = 1;
    private _startRotation: number = 0;
    private _position: Point = new Point(0, 0);
    private _scale: number = 1;
    private _rotation: number = 0;
    
    get id() { return this._canvas.id; }
    get canvas() { return this._canvas; }
    get ctx() { return this._ctx; }
    get width(): number { return this._canvas.width; }
    get height(): number { return this._canvas.height; }
    get position() { return this._position; }
    get rotation() { return this._rotation; }
    get scale() { return this._scale; }
    get floating(): boolean { return this._canvas.classList.contains("floating"); }
    set floating(value: boolean) { 
        this._canvas.classList.toggle("floating", value);
        this._canvas.style.pointerEvents = value ? "auto" : "none";
        if (value){
            this.addEventListeners();
        }
        else {
            this.removeEventListeners();
        }
    }

    constructor(parent: HTMLElement, id: string, index: number, x: number, y: number, width: number, height: number, acceptInput: boolean = false) {
        this._canvas = <HTMLCanvasElement>document.createElement("canvas");
        this._canvas.id = id;
        this._index = index;
        this._canvas.width = width;
        this._canvas.height = height;
        this._canvas.style.width = `${width}em`;
        this._canvas.style.height = `${height}em`;
        this._ctx = <CanvasRenderingContext2D>this._canvas.getContext("2d", {alpha: true});
        this._ctx.imageSmoothingQuality = "high";
        this._ctx.imageSmoothingEnabled = config.imageSmoothing;
        if (!acceptInput){
            this._canvas.style.pointerEvents = "none";
        }
            
        parent.appendChild(this._canvas);
        this.transform(new Point(x, y), 1, 0);
        this.bindEventListeners();
    }
    
    resize(width: number, height: number){
        const x = this.position.x + 0.5 * (this.width - width);
        const y = this.position.y + 0.5 * (this.height - height);

        this._canvas.width = width;
        this._canvas.height = height;
        this._canvas.style.width = `${width}em`;
        this._canvas.style.height = `${height}em`;
        this.transform(new Point(x, y), this.scale, this.rotation);
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
    
    drawToCanvas(ctx: CanvasRenderingContext2D){
        ctx.save();
        let x = this._position.x + 0.5 * this.width;
        let y = this._position.y + 0.5 * this.height;
        ctx.setTransform(this._scale, 0, 0, this._scale, x, y);
        ctx.rotate(this._rotation);
        ctx.translate(-0.5 * this.width, -0.5 * this.height);
        ctx.drawImage(this.canvas, 0, 0);
        ctx.restore();
    }
    
    private addEventListeners() {
        this._canvas.addEventListener('click', this.click);
        this._canvas.addEventListener('touchstart', this.touchStart);

        if (window.PointerEvent != null){
            // Required to prevent pointerDown events from being choked when tapping repeatedly: 
        }
    }
    
    private removeEventListeners() {
        this._canvas.removeEventListener('click', this.click);
        this._canvas.removeEventListener('touchstart', this.touchStart);

        if (window.PointerEvent != null){
            // Required to prevent pointerDown events from being choked when tapping repeatedly: 
        }
    }
    
    private click(event: Event) {
        event.preventDefault();
    }
    
    private touchStart(event: TouchEvent) {
        event.preventDefault();

        if (event.touches.length === 1){
            this.addPinchEventListeners();

            this._pinchCenter = new Point(
                this._position.x + 0.5 * this.width,
                this._position.y + 0.5 * this.height);

            if (event.altKey){
                let p1 = this.pointFromTouch(event.touches[0]);
                let p2 = Point.mirror(p1, this._pinchCenter);
                this.pinchStart(p1, p2);
            }
            else{
                this.dragStart(this.pointFromTouch(event.touches[0]));
            }
        }
        
        if (event.touches.length === 2){
            //target.setPointerCapture(event.pointerId);

            //this._currentTouchId = event.pointerId;

            this.pinchStart(this.pointFromTouch(event.touches[0]), this.pointFromTouch(event.touches[1]));
        }
    }

    private touchMove(event: TouchEvent) {
        event.preventDefault();

        if (event.touches.length === 1){
            if (event.altKey){
                let p1 = this.pointFromTouch(event.touches[0]);
                let p2 = Point.mirror(p1, this._pinchCenter);
                this.pinchMove(p1, p2);
            }
            else{
                this.dragMove(this.pointFromTouch(event.touches[0]));
            }
        }
        if (event.touches.length === 2) {
            this.pinchMove(this.pointFromTouch(event.touches[0]), this.pointFromTouch(event.touches[1]));
        }
    }


    private touchEnd (event: TouchEvent) {
        event.preventDefault();
        this.removePinchEventListeners();
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

    private touchCancel (event: TouchEvent) {
        event.preventDefault();
    }

    private addPinchEventListeners() {
        this._canvas.addEventListener('touchmove', this.touchMove);
        this._canvas.addEventListener('touchend', this.touchEnd);
        this._canvas.addEventListener('touchcancel', this.touchCancel);
    }

    private removePinchEventListeners() {
        this._canvas.removeEventListener('touchmove', this.touchMove);
        this._canvas.addEventListener('touchend', this.touchEnd);
        this._canvas.addEventListener('touchcancel', this.touchCancel);
    }

    public transform(position: Point, scale: number, rotation: number) {
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
        const index = this._index;
        this._canvas.style.transform = `translate(${position.x}em, ${position.y}em) rotate(${rotation}rad) scale(${scale}) translateZ(${index}px)`;
        this._canvas.style.outlineWidth = `${2 / scale}em`;
    }

    private bindEventListeners() {
        
        // TODO: Find a better way. This is ugly:
        this.click = this.click.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.touchCancel = this.touchCancel.bind(this);
    }

    private dragStart(p: Point) {
    }

    private dragMove(position: Point) {
        position.x -= 0.5 * this.width;
        position.y -= 0.5 * this.height;

        this.transform(position, this._scale, this._rotation);
    }

    private pinchStart(p1: Point, p2: Point) {
        let center = Point.center(p1, p2);
        this._pinchStartDist = Point.distance(p1, p2);
        this._pinchStartRotation = Math.atan2(p1.y - center.y, p1.x - center.x);
        this._startRotation = this._rotation;
        this._startScale = this._scale;       
    }

    private pinchMove(p1: Point, p2: Point) {
        let center = Point.center(p1, p2);
        let distance = Point.distance(p1, p2);
        let angle = Math.atan2(p1.y - center.y, p1.x - center.x);
        let angleChange = angle - this._pinchStartRotation;

        let scale = this._startScale * (distance / this._pinchStartDist);
        scale = Utils.clamp(0.1, 10, scale);
        let position = Point.center(p1, p2);
        position.x -= 0.5 * this.width;
        position.y -= 0.5 * this.height;

        let rotation = this._startRotation + angleChange;
        this.transform(position, scale, rotation);
    }
    
    private pointFromTouch(touch: Touch){
        let parent = this._canvas.parentElement;
        let rect = parent.getBoundingClientRect();

        const isPortraitOrientation = rect.height > rect.width;

        let nx = (touch.clientX - rect.left) / rect.width;
        let ny = (touch.clientY - rect.top) / rect.height;

        let x = (isPortraitOrientation ? 1 - ny : nx) * config.width;
        let y = (isPortraitOrientation ? nx : ny) * config.height;

        return new Point(x, y);
    }
}