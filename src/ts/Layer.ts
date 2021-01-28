import {config} from "./config";
import Utils from "./utils/Utils";
import Point from "./utils/Point";
import * as PIXI from 'pixi.js';
import {Sprite} from "pixi.js";

interface IPointer {
    clientX: number,
    clientY: number
}

interface IPointerList {
    readonly length: number;
    [index: number]: IPointer;
}

export default class Layer {

    public onDoubleTap: Function | undefined;
    
    protected _sprite: PIXI.Sprite;
    private _index: number;
    private _pinchCenter: Point;
    private _localDragPosition: Point;
    private _pinchStartDist: number;
    private _pinchStartRotation: number;
    private _startScale: number = 1;
    private _startRotation: number = 0;
    private _lastTouchStartTime: number = 0;
    private _pointers: PointerEvent[] = [];
    private _floating: boolean;
    
    get id(): string { return this._sprite.name; }
    get sprite(): PIXI.Sprite { return this._sprite; }
    get renderTexture(): PIXI.RenderTexture { return <PIXI.RenderTexture>this._sprite.texture; }

    get width(): number { return this._sprite.width; };
    get height(): number { return this._sprite.height; };
    get position() { return this._sprite.position; }
    get rotation() { return this._sprite.rotation; }
    get scale() { return this._sprite.scale; }
    
    get floating(): boolean { return this._floating; }
    
    set floating(value: boolean) { 
        this._floating = value;
        // this._sprite.style.pointerEvents = value ? "auto" : "none";
        // if (value){
        //     this.addEventListeners();
        // }
        // else {
        //     this.removeEventListeners();
        // }
    }

    constructor(container: PIXI.Container, id: string) {
        this._sprite = new PIXI.Sprite();
        this._sprite.name = id;
        container.addChild(this._sprite);
        this.bindEventListeners();
    }
    
    remove() {
        this._sprite.destroy();
    }
    
    drawToCanvas(ctx: CanvasRenderingContext2D) {
        // ctx.save();
        // let x = this._position.x + 0.5 * this.width;
        // let y = this._position.y + 0.5 * this.height;
        // ctx.setTransform(this._scale, 0, 0, this._scale, x, y);
        // ctx.rotate(this._rotation);
        // ctx.translate(-0.5 * this.width, -0.5 * this.height);
        // ctx.drawImage(this._sprite, 0, 0);
        // ctx.restore();
    }

    private addEventListeners() {
        // // pinch gesture handling inspired by https://codepen.io/hanseklund/pen/izloq
        //
        // this._sprite.addEventListener('click', this.preventDefault);
        //
        // if (Utils.pointerEventsSupported()){
        //     this._sprite.addEventListener('touchstart', this.preventDefault);
        //     this._sprite.addEventListener('pointerdown', this.pointerDown);
        // }
        // else{
        //     this._sprite.addEventListener('touchstart', this.touchStart);
        // }
    }
    
    private removeEventListeners() {
        // this._sprite.removeEventListener('click', this.preventDefault);
        //
        // if (Utils.pointerEventsSupported()){
        //     this._sprite.removeEventListener('touchstart', this.preventDefault);
        //     this._sprite.removeEventListener('pointerdown', this.pointerDown);
        // }
        // else{
        //     this._sprite.removeEventListener('touchstart', this.touchStart);
        // }
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
        // event.preventDefault();
        // this._sprite.setPointerCapture(event.pointerId);
        // this.addPointerEvent(event);
        //
        // if (this._pointers.length === 1){
        //     if (event.timeStamp < this._lastTouchStartTime + config.doubleTapDelay){
        //         this.doubleTap(event);
        //     }
        //     this._lastTouchStartTime = event.timeStamp;
        //
        //     this._sprite.addEventListener("pointermove", this.pointerMove);
        //     this._sprite.addEventListener("pointerup", this.pointerUp);
        //
        //     this._pinchCenter = new Point(
        //         this._position.x + 0.5 * this.width,
        //         this._position.y + 0.5 * this.height);
        //
        //     if (event.altKey){
        //         let p1 = this.clientToPixel(this._pointers[0]);
        //         let p2 = Point.mirror(p1, this._pinchCenter);
        //         this.pinchStart(p1, p2);
        //     }
        //     else{
        //         this.dragStart(this.clientToPixel(this._pointers[0]));
        //     }
        // }
        //
        // if (this._pointers.length === 2 ){
        //     this.pinchStart(this.clientToPixel(this._pointers[0]), this.clientToPixel(this._pointers[1]));
        // }  
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
        // event.preventDefault();
        // this._sprite.releasePointerCapture(event.pointerId);
        // this.removePointerEvent(event);
        //
        // if (this._pointers.length == 1) {
        //     this.dragStart(this.clientToPixel(this._pointers[0]));
        // }
        //
        // if (this._pointers.length == 0){
        //     this._sprite.removeEventListener("pointermove", this.pointerMove);
        //     this._sprite.removeEventListener("pointerup", this.pointerUp);
        // }
    }

    private touchStart(event: TouchEvent) {
        // event.preventDefault();
        //
        // if (event.touches.length === 1){
        //     if (event.timeStamp < this._lastTouchStartTime + config.doubleTapDelay){
        //         this.doubleTap(event);
        //     }
        //     this._lastTouchStartTime = event.timeStamp;
        //    
        //     this._sprite.addEventListener('touchmove', this.touchMove);
        //     this._sprite.addEventListener('touchend', this.touchEnd);
        //
        //     this._pinchCenter = new Point(
        //         this._position.x + 0.5 * this.width,
        //         this._position.y + 0.5 * this.height);
        //
        //     if (event.altKey){
        //         let p1 = this.clientToPixel(event.touches[0]);
        //         let p2 = Point.mirror(p1, this._pinchCenter);
        //         this.pinchStart(p1, p2);
        //     }
        //     else{
        //         this.dragStart(this.clientToPixel(event.touches[0]));
        //     }
        // }
        //
        // if (event.touches.length === 2){
        //     this.pinchStart(this.clientToPixel(event.touches[0]), this.clientToPixel(event.touches[1]));
        // }
    }

    private touchMove(event: TouchEvent) {
        event.preventDefault();
        this.move(event.touches, event.altKey);
    }

    private move(pointers: IPointerList, altKey: boolean) {
        // if (pointers.length === 1) {
        //     if (altKey) {
        //         let p1 = this.clientToPixel(pointers[0]);
        //         let p2 = Point.mirror(p1, this._pinchCenter);
        //         this.pinchMove(p1, p2);
        //     } else {
        //         this.dragMove(this.clientToPixel(pointers[0]));
        //     }
        // }
        // if (pointers.length === 2) {
        //     this.pinchMove(this.clientToPixel(pointers[0]), this.clientToPixel(pointers[1]));
        // }
    }

    private touchEnd (event: TouchEvent) {
        // event.preventDefault();
        // this._sprite.removeEventListener('touchmove', this.touchMove);
        // this._sprite.addEventListener('touchend', this.touchEnd);
    }

    transform(position: Point, scale: number, rotation: number) {
        // this._position = position;
        // this._rotation = rotation;
        // this._scale = scale;
        // const index = this._index;
        // this._sprite.style.transform = `translate(${position.x}em, ${position.y}em) rotate(${rotation}rad) scale(${scale}) translateZ(${index}px)`;
        // this._sprite.style.outlineWidth = `${2 / scale}em`;
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

    private dragStart(position: Point) {
        // this._localDragPosition = Point.subtract(position, this.position);
    }

    private dragMove(position: Point) {
        // position.subtract(this._localDragPosition);
        // this.transform(position, this._scale, this._rotation);
    }

    private pinchStart(p1: Point, p2: Point) {
        // let center = Point.center(p1, p2);
        // this._pinchStartDist = Point.distance(p1, p2);
        // this._pinchStartRotation = Math.atan2(p1.y - center.y, p1.x - center.x);
        // this._startRotation = this._rotation;
        // this._startScale = this._scale;       
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

    private clientToPixel(position1: IPointer){
        // let parent = this._sprite.parentElement;
        // let rect = parent.getBoundingClientRect();
        //
        // const isPortraitOrientation = rect.height > rect.width;
        //
        // let nx = (position1.clientX - rect.left) / rect.width;
        // let ny = (position1.clientY - rect.top) / rect.height;
        //
        // let x = (isPortraitOrientation ? 1 - ny : nx) * config.width;
        // let y = (isPortraitOrientation ? nx : ny) * config.height;
        //
        // return new Point(x, y);
    }

    clear(renderer: PIXI.Renderer) {
        const oldRt = renderer.renderTexture.current;
        renderer.renderTexture.bind(this.renderTexture);
        renderer.renderTexture.clear();
        renderer.renderTexture.bind(oldRt);
    }

    drawImage(image: HTMLImageElement, renderer: PIXI.Renderer) {
        const imageSprite = new PIXI.Sprite(PIXI.Texture.from(image));
        renderer.render(imageSprite, this.renderTexture);
        imageSprite.destroy({texture: true});
    }
}