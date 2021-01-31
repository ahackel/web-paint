import {config} from "./config";
import Utils from "./utils/Utils";
import Vector from "./math/Vector";
import ILayer from "./ILayer";

interface IPointer {
    clientX: number,
    clientY: number
}

interface IPointerList {
    readonly length: number;
    [index: number]: IPointer;
}

export default abstract class Layer<T extends HTMLImageElement | HTMLCanvasElement> implements ILayer {

    public onDoubleTap: Function | undefined;
    
    protected _element: T;
    private _index: number;
    private _pinchCenter: Vector;
    private _localDragPosition: Vector;
    private _pinchStartDist: number;
    private _pinchStartRotation: number;
    private _startScale: number = 1;
    private _startRotation: number = 0;
    private _position: Vector = new Vector(0, 0);
    private _scale: number = 1;
    private _rotation: number = 0;
    private _lastTouchStartTime: number = 0;
    private _pointers: PointerEvent[] = [];
    private _width: number;
    private _height: number;
    
    get id(): string { return this._element.id; }
    get index(): number { return this._index; }
    set index(v: number) {
        this._index = v;
        this.transform(this.position, this.scale, this.rotation);
    }
    get width(): number { return this._width; };
    get height(): number { return this._height; };
    get position() { return this._position; }
    get rotation() { return this._rotation; }
    get scale() { return this._scale; }
    get floating(): boolean { return this._element.classList.contains("floating"); }
    
    set floating(value: boolean) { 
        this._element.classList.toggle("floating", value);
        this._element.style.pointerEvents = value ? "auto" : "none";
        if (value){
            this.addEventListeners();
        }
        else {
            this.removeEventListeners();
        }
    }

    constructor(parent: HTMLElement, tag: string, id: string, x: number, y: number, width: number, height: number) {
        this._element = <T>document.createElement(tag);
        this._element.id = id;
        this._element.classList.add("layer");
        this._index = 0;
        this._width = width;
        this._height = height;
        this._element.width = width;
        this._element.height = height;
        this._element.style.width = `${width}em`;
        this._element.style.height = `${height}em`;
        this._element.style.pointerEvents = "none";
            
        parent.appendChild(this._element);
        this.transform(new Vector(x, y), 1, 0);
        this.bindEventListeners();
    }
    
    remove() {
        this._element.remove();
    }

    resize(width: number, height: number) {
        const x = this.position.x + 0.5 * (this.width - width);
        const y = this.position.y + 0.5 * (this.height - height);

        this.setPositionAndSize(x, y, width, height);
    }

    setPositionAndSize(x: number, y: number, width: number, height: number) {
        this._width = width;
        this._height = height;
        this._element.width = width;
        this._element.height = height;
        this._element.style.width = `${width}em`;
        this._element.style.height = `${height}em`;
        this.transform(new Vector(x, y), this.scale, this.rotation);
    }

    drawToCanvas(ctx: CanvasRenderingContext2D) {
        ctx.save();
        let x = this._position.x + 0.5 * this.width;
        let y = this._position.y + 0.5 * this.height;
        ctx.setTransform(this._scale, 0, 0, this._scale, x, y);
        ctx.rotate(this._rotation);
        ctx.translate(-0.5 * this.width, -0.5 * this.height);
        ctx.drawImage(this._element, 0, 0);
        ctx.restore();
    }

    private addEventListeners() {
        // pinch gesture handling inspired by https://codepen.io/hanseklund/pen/izloq
        
        this._element.addEventListener('click', this.preventDefault);

        if (Utils.pointerEventsSupported()){
            this._element.addEventListener('touchstart', this.preventDefault);
            this._element.addEventListener('pointerdown', this.pointerDown);
        }
        else{
            this._element.addEventListener('touchstart', this.touchStart);
        }
    }
    
    private removeEventListeners() {
        this._element.removeEventListener('click', this.preventDefault);

        if (Utils.pointerEventsSupported()){
            this._element.removeEventListener('touchstart', this.preventDefault);
            this._element.removeEventListener('pointerdown', this.pointerDown);
        }
        else{
            this._element.removeEventListener('touchstart', this.touchStart);
        }
    }
    
    private preventDefault(event: Event) {
        event.preventDefault();
    }
    
    private doubleTap(event: TouchEvent | PointerEvent) {
        if (this.onDoubleTap){
            this.onDoubleTap(event);
        }
    }
    
    private pointerDown(event: PointerEvent){
        event.preventDefault();
        this._element.setPointerCapture(event.pointerId);
        this.addPointerEvent(event);

        if (this._pointers.length === 1){
            if (event.timeStamp < this._lastTouchStartTime + config.doubleTapDelay){
                this.doubleTap(event);
            }
            this._lastTouchStartTime = event.timeStamp;

            this._element.addEventListener("pointermove", this.pointerMove);
            this._element.addEventListener("pointerup", this.pointerUp);

            this._pinchCenter = new Vector(
                this._position.x + 0.5 * this.width,
                this._position.y + 0.5 * this.height);

            if (event.altKey){
                let p1 = this.clientToPixel(this._pointers[0]);
                let p2 = this._pinchCenter.clone().multiplyScalar(2).subtract(p1);
                this.pinchStart(p1, p2);
            }
            else{
                this.dragStart(this.clientToPixel(this._pointers[0]));
            }
        }
        
        if (this._pointers.length === 2 ){
            this.pinchStart(this.clientToPixel(this._pointers[0]), this.clientToPixel(this._pointers[1]));
        }  
    }

    private addPointerEvent(event: PointerEvent) {
        const index = this._pointers.findIndex(x => x.pointerId == event.pointerId);
        if (index < 0) {
            this._pointers.push(event);
        } else {
            this._pointers[index] = event;
        }
    }

    private removePointerEvent(event: PointerEvent) {
        const index = this._pointers.findIndex(x => x.pointerId == event.pointerId);
        if (index >= 0) {
            this._pointers.splice(index, 1);
        }
    }

    private pointerMove(event: PointerEvent) {
        event.preventDefault();
        this.addPointerEvent(event);
        this.move(this._pointers, event.altKey);
    }

    private pointerUp(event: PointerEvent) {
        event.preventDefault();
        this._element.releasePointerCapture(event.pointerId);
        this.removePointerEvent(event);

        if (this._pointers.length == 1) {
            this.dragStart(this.clientToPixel(this._pointers[0]));
        }

        if (this._pointers.length == 0){
            this._element.removeEventListener("pointermove", this.pointerMove);
            this._element.removeEventListener("pointerup", this.pointerUp);
        }
    }

    private touchStart(event: TouchEvent) {
        event.preventDefault();

        if (event.touches.length === 1){
            if (event.timeStamp < this._lastTouchStartTime + config.doubleTapDelay){
                this.doubleTap(event);
            }
            this._lastTouchStartTime = event.timeStamp;
            
            this._element.addEventListener('touchmove', this.touchMove);
            this._element.addEventListener('touchend', this.touchEnd);

            this._pinchCenter = new Vector(
                this._position.x + 0.5 * this.width,
                this._position.y + 0.5 * this.height);

            if (event.altKey){
                let p1 = this.clientToPixel(event.touches[0]);
                let p2 = this._pinchCenter.clone().multiplyScalar(2).subtract(p1);
                this.pinchStart(p1, p2);
            }
            else{
                this.dragStart(this.clientToPixel(event.touches[0]));
            }
        }
        
        if (event.touches.length === 2){
            this.pinchStart(this.clientToPixel(event.touches[0]), this.clientToPixel(event.touches[1]));
        }
    }

    private touchMove(event: TouchEvent) {
        event.preventDefault();
        this.move(event.touches, event.altKey);
    }

    private move(pointers: IPointerList, altKey: boolean) {
        if (pointers.length === 1) {
            if (altKey) {
                let p1 = this.clientToPixel(pointers[0]);
                let p2 = this._pinchCenter.clone().multiplyScalar(2).subtract(p1);
                this.pinchMove(p1, p2);
            } else {
                this.dragMove(this.clientToPixel(pointers[0]));
            }
        }
        if (pointers.length === 2) {
            this.pinchMove(this.clientToPixel(pointers[0]), this.clientToPixel(pointers[1]));
        }
    }

    private touchEnd (event: TouchEvent) {
        event.preventDefault();
        this._element.removeEventListener('touchmove', this.touchMove);
        this._element.addEventListener('touchend', this.touchEnd);
    }

    transform(position: Vector, scale: number, rotation: number) {
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
        const index = this._index;
        this._element.style.transform = `translate(${position.x}em, ${position.y}em) rotate(${rotation}rad) scale(${scale}) translateZ(${index}px)`;
        this._element.style.outlineWidth = `${2 / scale}em`;
        this._element.style.outlineOffset = `-${2 / scale}em`;
    }

    private bindEventListeners() {
        
        // TODO: Find a better way. This is ugly:
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);

        this.pointerDown = this.pointerDown.bind(this);
        this.pointerMove = this.pointerMove.bind(this);
        this.pointerUp = this.pointerUp.bind(this);
    }

    private dragStart(position: Vector) {
        this._localDragPosition = position.clone().subtract(this.position);
    }

    private dragMove(position: Vector) {
        position.subtract(this._localDragPosition);
        this.transform(position, this._scale, this._rotation);
    }

    private pinchStart(p1: Vector, p2: Vector) {
        let center = p1.clone().add(p2).multiplyScalar(0.5);
        this._pinchStartDist = p1.distanceTo(p2);
        this._pinchStartRotation = Math.atan2(p1.y - center.y, p1.x - center.x);
        this._startRotation = this._rotation;
        this._startScale = this._scale;       
    }

    private pinchMove(p1: Vector, p2: Vector) {
        let center = p1.clone().add(p2).multiplyScalar(0.5);
        let distance = p1.distanceTo(p2);
        let angle = Math.atan2(p1.y - center.y, p1.x - center.x);
        let angleChange = angle - this._pinchStartRotation;

        let scale = this._startScale * (distance / this._pinchStartDist);
        scale = Utils.clamp(0.1, 10, scale);
        let position = p1.clone().add(p2).multiplyScalar(0.5);
        position.x -= 0.5 * this.width;
        position.y -= 0.5 * this.height;

        let rotation = this._startRotation + angleChange;
        this.transform(position, scale, rotation);
    }

    private clientToPixel(position1: IPointer){
        let parent = this._element.parentElement;
        let rect = parent.getBoundingClientRect();

        const isPortraitOrientation = rect.height > rect.width;

        let nx = (position1.clientX - rect.left) / rect.width;
        let ny = (position1.clientY - rect.top) / rect.height;

        let x = (isPortraitOrientation ? 1 - ny : nx) * config.width;
        let y = (isPortraitOrientation ? nx : ny) * config.height;

        return new Vector(x, y);
    }
}