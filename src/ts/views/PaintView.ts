import {View} from "./View";
import Tool from "../tools/Tool";
import ColorPalette from "../palettes/ColorPalette";
import ToolPalette from "../palettes/ToolPalette";
import SizePalette from "../palettes/SizePalette";
import Utils from "../utils/Utils";
import PenTool from "../tools/PenTool";
import PaintBucketTool from "../tools/PaintBucketTool";
import Point from "../utils/Point";
import {Palette} from "../palettes/Palette";
import ImageStorage from "../storage/ImageStorage";

// var Pressure = require('pressure');

export default class PaintView extends View {
    public readonly pixelPerfect = false;   // Make sure to perform painting operations on rounded pixel positions
    public readonly imageSmoothing = true;  // Whether to use smooth pixel filtering or to draw hard pixel edges
    public readonly scaleFactor = 1;
    public readonly width: number;
    public readonly height: number;
    
    private _currentTool: Tool;
    private _imageId: string;
    private _color: string;
    private _opacity: number;
    private _lineWidth: number;
    private _ctx: CanvasRenderingContext2D;
    private _colorPalette: ColorPalette;
    private _toolPalette: ToolPalette;
    private _sizePalette: SizePalette;
    private _tools: Tool[];
    private _currentTouchId: number = 0;
    private _undoBuffer: ImageData;
    private _undoButton: HTMLDivElement;
    private _timeStamp: number;
    private _tickTimeStamp: number;

    get color(): string { return this._color; }
    get opacity(): number { return this._opacity; }
    get lineWidth(): number { return this._lineWidth; }
    get ctx(): CanvasRenderingContext2D { return this._ctx; }

    constructor(id: string, onBackClicked: Function) {
        super(id);

        this.width = window.screen.availWidth;
        this.height = window.screen.availHeight;
        
        this.createButtons(onBackClicked);
        this.createCtx();
        this.addEventListeners();
        this.createPalettes();
        this.createTools();
    }

    private createButtons(onBackClicked: Function) {
        let backButton = <HTMLDivElement>document.getElementById("back-button");
        Utils.addFastClick(backButton, () => onBackClicked());

        let clearButton = <HTMLDivElement>document.getElementById("clear-button");
        Utils.addFastClick(clearButton, () => this.clear(true));

        this._undoButton = <HTMLDivElement>document.getElementById("undo-button");
        Utils.addFastClick(this._undoButton, () => this.undo());
    }

    private createCtx() {
        let canvas = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this._ctx = <CanvasRenderingContext2D>canvas.getContext("2d", {alpha: true});
        this._ctx.imageSmoothingQuality = "high";
        this._ctx.imageSmoothingEnabled = this.imageSmoothing;
    }

    private createTools() {
        this._tools = [
            new PenTool(this, "darken"),
            new PenTool(this, "source-over"),
            new PenTool(this, "destination-out"),
            new PaintBucketTool(this)
        ]
        this._currentTool = this._tools[0];
    }

    private createPalettes() {
        this._colorPalette = new ColorPalette("color-palette");
        this._colorPalette.onSelectionChanged = (color: string) => this._color = color;
        this._color = this._colorPalette.color;

        this._toolPalette = new ToolPalette("tool-palette");
        this._toolPalette.onSelectionChanged = (option: string, index: number) => {
            const toolCount = this._tools.length;
            this._currentTool = this._tools[Math.min(index, toolCount - 1)];
        };

        this._sizePalette = new SizePalette("size-palette");
        this._sizePalette.onSelectionChanged = (lineWidth: number) => {
            this._lineWidth = lineWidth;
        };
        this._lineWidth = this._sizePalette.size;
    }

    private addEventListeners() {
        let canvas = this._ctx.canvas;
        canvas.addEventListener('click', event => event.preventDefault());

        if (window.PointerEvent != null){
            // Required to prevent pointerDown events from being choked when tapping repeatedly: 
            canvas.addEventListener('touchstart', event => event.preventDefault());
            
            canvas.addEventListener('pointerdown', event => this.pointerDown(event));
            canvas.addEventListener('pointermove', event => this.pointerMove(event));
            canvas.addEventListener('pointerup', event => this.pointerUp(event));
            canvas.addEventListener('pointercancel', event => event.preventDefault());
        }
        else{
            canvas.addEventListener('touchstart', event => this.touchStart(event));
            canvas.addEventListener('touchmove', event => this.touchMove(event));
            canvas.addEventListener('touchend', event => this.touchEnd(event));
            canvas.addEventListener('touchcancel', event => event.preventDefault());
        }
        //canvas.addEventListener('touchforcechanged', event => this.pressureChanged(<TouchEvent>event))
        // Pressure.set(canvas, {
        //     change: (force: number, event: Event) => this.pressureChanged(force)
        // })
    }

    private getPointerEventPosition = (event: PointerEvent) => {
        let target = <HTMLElement>event.target;
        let rect = target.getBoundingClientRect();

        let x = (event.clientX - rect.left) / rect.width * this.width;
        let y = (event.clientY - rect.top) / rect.height * this.height;

        if (this.pixelPerfect){
            x = Math.round(x);
            y = Math.round(y);
        }
        return new Point(x, y);
    }

    private getTouchEventPosition = (touch: Touch) => {
        let canvas = this._ctx.canvas;
        let rect = canvas.getBoundingClientRect();

        let x = (touch.clientX - rect.left) / rect.width * this.width;
        let y = (touch.clientY - rect.top) / rect.height * this.height;

        if (this.pixelPerfect){
            x = Math.round(x);
            y = Math.round(y);
        }
        return new Point(x, y);
    }

    pointerDown(event: PointerEvent) {
        console.log("pointerDown");
        event.preventDefault();

        if (event.pointerType == 'touch' && this._currentTouchId !== 0){
            return;
        }

        if (event.pointerType != 'touch' && event.buttons !== 1){
            return;
        }

        let target = <HTMLElement>event.target;
        target.setPointerCapture(event.pointerId);

        this._currentTouchId = event.pointerId;
        let pressure = event.pointerType == "pen" ? Utils.clamp(0.3, 1, event.pressure * 2) : 1;
        this.down(event.timeStamp, true, this.getPointerEventPosition(event), pressure);
        this.up(true, this.getPointerEventPosition(event));
    }

    pointerMove(event: PointerEvent) {
        event.preventDefault();
        if (event.pointerType == 'touch' && event.pointerId !== this._currentTouchId){
            return;
        }

        if (event.pointerType != 'touch' && event.buttons !== 1){
            return;
        }

        // normalize pressure:
        let pressure = event.pointerType == "pen" ? Utils.clamp(0.3, 1, event.pressure * 2) : 1;
        this.move(event.timeStamp, true, this.getPointerEventPosition(event), pressure);
    }

    pointerUp(event: PointerEvent) {
        event.preventDefault();
        if (event.pointerType == 'touch' && event.pointerId !== this._currentTouchId){
            return;
        }

        if (event.pointerType != 'touch' && event.buttons !== 1){
            return;
        }

        let target = <HTMLElement>event.target;
        target.releasePointerCapture(event.pointerId);

        this.up(this.getPointerEventPaintingFlag(event), this.getPointerEventPosition(event));
        this._currentTouchId = 0;
    }

    private getPointerEventPaintingFlag = (e: PointerEvent) => e.pointerType === "touch" ? true : e.buttons === 1;

    pressureChanged(force: number){
        let pressure = Utils.clamp(0.3, 1, force * 2);
        this._currentTool.pressure = Math.max(pressure, this._currentTool.pressure);
        this._currentTool.pressureChanged();
    }

    touchStart(event: TouchEvent) {
        event.preventDefault();
        if (this._currentTouchId !== 0){
            return;
        }
        this._currentTouchId = event.targetTouches[0].identifier;
        this.down(event.timeStamp,true, this.getTouchEventPosition(event.targetTouches[0]), 1);
    }

    touchMove(event: TouchEvent) {
        event.preventDefault();
        let touch = PaintView.findTouch(event.targetTouches, this._currentTouchId);
        if (touch == null){
            return;
        }
        this.move(event.timeStamp, true, this.getTouchEventPosition(touch), 1);
    }

    touchEnd(event: TouchEvent) {
        event.preventDefault();
        let touch = PaintView.findTouch(event.targetTouches, this._currentTouchId);
        if (touch != null){
            return;
        }
        this.up(true,event.touches.length > 0 ? this.getTouchEventPosition(touch) : this._currentTool.mouse);
        this._currentTouchId = 0;
    }

    private static findTouch(touches: TouchList, id: number){
        for (let i = 0; i < touches.length; i++) {
            if (touches[i].identifier == id){
                return touches[i];
            }
        }
        return null;
    }

    private move(timeStamp: number, isPainting: boolean, mouse: Point, pressure: number) {
        if (!this._currentTool) {
            return;
        }

        this._currentTool.painting = isPainting;
        this._currentTool.pressure = pressure;

        let newMouse = mouse;
        let delta = Point.distance(this._currentTool.mouse, newMouse);

        if (delta > 2) {
            let timeDelta = timeStamp - this._timeStamp;
            this._timeStamp = timeStamp;
            let speed = delta / timeDelta;

            this._currentTool.speed = Utils.lerp(this._currentTool.speed, speed, 0.2);
            this._currentTool.mouse = newMouse;
            this._currentTool.move();
        }
    }

    private down(timeStamp: number, isPainting: boolean, mouse: Point, pressure: number) {
        Palette.collapseAll();

        if (!this._currentTool) {
            return;
        }
        
        this.registerUndo();
        this._timeStamp = timeStamp;
        this._currentTool.speed = 1;
        this._currentTool.painting = isPainting;
        this._currentTool.pressure = pressure;
        this._currentTool.mouse = mouse;
        this._currentTool.down();
    }

    private up(isPainting: boolean, mouse: Point) {
        if (!this._currentTool) {
            return;
        }

        this._currentTool.painting = isPainting;
        this._currentTool.mouse = mouse;
        this._currentTool.up();
    }

    clear(registerUndo: boolean = false) {
        if (registerUndo){
            this.registerUndo();
        }
        this._ctx.clearRect(0,0, this.width, this.height);
    }

    registerUndo(){
        this._undoBuffer = this._ctx.getImageData(0, 0, this.width, this.height);
        this.updateUndoButtonState();
    }

    clearUndoBuffer(){
        this._undoBuffer = null;
        this.updateUndoButtonState();
    }

    updateUndoButtonState(){
        this._undoButton.classList.toggle("disabled", this._undoBuffer == null);
    }

    undo(swapBuffers = true) {
        if (!this._undoBuffer){
            return;
        }
        let undoBuffer = this._undoBuffer;
        if (swapBuffers){
            this.registerUndo();
        }
        this._ctx.putImageData(undoBuffer, 0, 0);
    }

    loadImage(id: string) {
        return ImageStorage.loadImage(id)
            .then(image => {
                this._imageId = id;
                this.clear();
                if (image){
                    this._ctx.drawImage(image, 0, 0);
                }
            })
    }

    saveImage() {
        this._ctx.canvas.toBlob(blob => ImageStorage.saveImage(this._imageId, blob as Blob));
    }

    show(){
        super.show();
        this._currentTouchId = 0;
        this.clearUndoBuffer();
        window.requestAnimationFrame(timeStamp => this.tick(timeStamp))
    }

    hide(){
        if (this._imageId){
            this.saveImage();
        }
        super.hide();
    }

    private tick(timeStamp: number) {
        if (!this.isVisible()){
            return;
        }

        window.requestAnimationFrame(timeStamp => this.tick(timeStamp))

        if (!this._currentTool) {
            return;
        }
        
        let delta = timeStamp - this._tickTimeStamp;
        this._tickTimeStamp = timeStamp;
        this._currentTool.tick(delta);
    }
}