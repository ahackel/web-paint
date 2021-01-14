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
import {config} from "../config";
import RectangleTool from "../tools/RectangleTool";
import LineTool from "../tools/LineTool";
import StampTool from "../tools/StampTool";
import StampPalette from "../palettes/StampPalette";
import Layer from "../Layer";
import ILayer from "../ILayer";
import CanvasLayer from "../CanvasLayer";
import ImageLayer from "../ImageLayer ";
import SelectionTool from "../tools/SelectionTool";

// var Pressure = require('pressure');

export default class PaintView extends View {
    public readonly scaleFactor = 1;
    public readonly width: number;
    public readonly height: number;

    public brushTool: Tool;
    public markerTool: Tool;
    public eraserTool: Tool;
    public selectionTool: SelectionTool;
    public paintBucketTool: Tool;

    private _currentTool: Tool;
    private _imageId: string;
    private _color: string;
    private _opacity: number;
    private _lineWidth: number;
    private _autoMaskCtx: CanvasRenderingContext2D;
    private _colorPalette: ColorPalette;
    private _toolPalette: ToolPalette;
    private _sizePalette: SizePalette;
    private _stampPalette: StampPalette;
    private _tools: Tool[];
    private _currentTouchId: number = 0;
    private _undoBuffer: ImageData;
    private _undoButton: HTMLDivElement;
    private _timeStamp: number;
    private _tickTimeStamp: number;
    private _autoMaskCaptured: boolean;
    private _stamp: string;
    private _layers: { [id : string] : ILayer } = {};
    private _sheet: HTMLElement;

    get color(): string { return this._color; }
    get stamp(): string { return this._stamp; }
    get opacity(): number { return this._opacity; }
    get lineWidth(): number { return this._lineWidth; }
    get autoMaskCtx(): CanvasRenderingContext2D { return this._autoMaskCtx; }
    //get layers(): Layer[] { return this._layers; }
    get baseLayer(): CanvasLayer { return <CanvasLayer>this._layers["base-layer"]; }
    get overlayLayer(): ImageLayer { return <ImageLayer>this._layers["overlay-layer"]; }

    constructor(id: string, onBackClicked: Function) {
        super(id);
        
        this._sheet = document.getElementById("sheet");

        this.width = config.width;
        this.height = config.height;
        Utils.log(`Setting PaintView size to ${this.width} x ${this.height}`);
        
        this.createButtons(onBackClicked);
        this.addCanvasLayer("base-layer", 0, 0, this.width, this.height,false);
        this.addEventListeners();
        this.createTools();
        this.createPalettes();

        let autoMaskCanvas = document.createElement("canvas");
        autoMaskCanvas.id = "auto-mask";
        autoMaskCanvas.width = this.width;
        autoMaskCanvas.height = this.height;
        this._autoMaskCtx = <CanvasRenderingContext2D>autoMaskCanvas.getContext("2d", {alpha: true});
    }
    
    getLayer(id: string){
        return this._layers[id];
    }

    private createButtons(onBackClicked: Function) {
        let backButton = <HTMLDivElement>document.getElementById("back-button");
        Utils.addFastClick(backButton, () => onBackClicked());

        let clearButton = <HTMLDivElement>document.getElementById("clear-button");
        Utils.addFastClick(clearButton, () => this.clear(true, true));

        this._undoButton = <HTMLDivElement>document.getElementById("undo-button");
        Utils.addFastClick(this._undoButton, () => this.undo());

        let importImageField = <HTMLInputElement>document.getElementById("import-image-field");
        importImageField.addEventListener("change", files => {
            if (importImageField.files.length == 0){
                return;
            }
            let file = importImageField.files[0];
            let image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = () => {
                this.setTool(this.selectionTool);
                this.selectionTool.setImage(image);
            }
        })
        let importImageButton = <HTMLDivElement>document.getElementById("import-image-button");
        Utils.addFastClick(importImageButton, () => importImageField.click());
    }

    private addLayer(layer: ILayer): ILayer {
        layer.index = Object.keys(this._layers).length;
        this._layers[layer.id] = layer;
        return layer;
    }
    
    public addImageLayer(id: string, x: number, y: number, width: number, height: number, floating: boolean): ImageLayer{
        const layer = new ImageLayer(this._sheet, id, x, y, width, height);
        layer.floating = floating;
        this.addLayer(layer);
        return layer;
    }
    
    public addCanvasLayer(id: string, x: number, y: number, width: number, height: number, floating: boolean): CanvasLayer{
        const layer = new CanvasLayer(this._sheet, id, x, y, width, height);
        layer.floating = floating;
        this.addLayer(layer);
        return layer;
    }
    
    public removeLayer(layer: ILayer) {
        if (!layer){
            return;
        }
        layer.remove();
        delete this._layers[layer.id]
    }
    
    public createOverlay(){
        if (this.overlayLayer){
            return;
        }
        this.addLayer(new ImageLayer(this._sheet, "overlay-layer", 0, 0, this.width, this.height));
    }
    
    public removeOverlay(){
        this.removeLayer(this.overlayLayer);
    }
    
    public setOverlay(url: string){
        if (!url){
            this.removeOverlay();
            return;
        }
        this.createOverlay();
        this.overlayLayer.image.src = url;
                //this.processOverlay(this.overlay.ctx);

                // show processed overlay:
                // this._overlayCtx.canvas.toBlob(blob => {
                //     this._overlay.src = URL.createObjectURL(blob);
                // })
    }
    
    private createTools() {
        this._tools = [];
        this.brushTool = this.addTool(new PenTool(this, "source-over"));
        this.markerTool = this.addTool(new PenTool(this, "darken"));
        this.eraserTool = this.addTool(new PenTool(this, "destination-out"));
        this.selectionTool = <SelectionTool>this.addTool(new SelectionTool(this));
        this.paintBucketTool = this.addTool(new PaintBucketTool(this));
        this._currentTool = this.brushTool;
    }
    
    private addTool(tool: Tool){
        this._tools.push(tool);
        return tool;
    }

    private createPalettes() {
        this._toolPalette = new ToolPalette("tool-palette");
        this._toolPalette.onSelectionChanged = (option: string, index: number) => this.setTool(this._tools[index]);

        this._sizePalette = new SizePalette("size-palette");
        this._sizePalette.onSelectionChanged = (lineWidth: number) => {
            this._lineWidth = lineWidth;
        };
        this._lineWidth = this._sizePalette.size;

        this._colorPalette = new ColorPalette("color-palette");
        this._colorPalette.onSelectionChanged = (color: string) => this._color = color;
        this._color = this._colorPalette.color;

        this._stampPalette = new StampPalette("stamp-palette");
        this._stampPalette.onSelectionChanged = (stamp: string) => {
            this._stamp = stamp;
            this.setTool(this.selectionTool);
            this.selectionTool.setImageUrl(this.stamp);
        }
        this._stamp = this._stampPalette.stamp;

        this._opacity = 1;
    }

    private setTool(tool: Tool) {
        if (this._currentTool){
            this._currentTool.disable();
        }
        this._currentTool = tool;
        if (this._currentTool){
            this._currentTool.enable();
        }
        this._toolPalette.selectedIndex = this._tools.indexOf(tool);

        // this._sizePalette.setVisible(!(this._currentTool instanceof StampTool));
        // this._stampPalette.setVisible(this._currentTool instanceof StampTool);
    }

    private addEventListeners() {
        let canvas = this.baseLayer.canvas;
        canvas.style.pointerEvents = "auto";
        //canvas.addEventListener('keydown', event => this.keyDown(event));
        document.addEventListener('keydown', event => this.keyDown(event));
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

    private getPointerEventPosition(event: PointerEvent) {
        let target = <HTMLElement>event.target;
        let rect = target.getBoundingClientRect();
        const isPortraitOrientation = rect.height > rect.width;

        let nx = (event.clientX - rect.left) / rect.width;
        let ny = (event.clientY - rect.top) / rect.height;
        
        let x = (isPortraitOrientation ? 1 - ny : nx) * this.width;
        let y = (isPortraitOrientation ? nx : ny) * this.height; 

        if (config.pixelPerfect){
            x = Math.round(x);
            y = Math.round(y);
        }
        return new Point(x, y);
    }

    private getTouchEventPosition(touch: Touch) {
        let rect = this.baseLayer.canvas.getBoundingClientRect();
        const isPortraitOrientation = rect.height > rect.width;

        let nx = (touch.clientX - rect.left) / rect.width;
        let ny = (touch.clientY - rect.top) / rect.height;

        let x = (isPortraitOrientation ? 1 - ny : nx) * this.width;
        let y = (isPortraitOrientation ? nx : ny) * this.height;

        if (config.pixelPerfect){
            x = Math.round(x);
            y = Math.round(y);
        }
        return new Point(x, y);
    }
    
    private keyDown(event: KeyboardEvent){
        if (!this._currentTool) {
            return;
        }
        this._currentTool.keyDown(event);
    }

    pointerDown(event: PointerEvent) {
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
        let pressure = event.pointerType == "pen" ? Utils.clamp(0.5, 1, event.pressure * 2) : 1;
        this.move(event.timeStamp, true, this.getPointerEventPosition(event), pressure);
    }

    pointerUp(event: PointerEvent) {
        event.preventDefault();
        if (event.pointerType == 'touch' && event.pointerId !== this._currentTouchId){
            return;
        }

        // Return if this was not the left mouse button:
        // if (event.pointerType != 'touch' && event.buttons !== 1){
        //     return;
        // }

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

        // this._currentTool.painting = isPainting;
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
        
        this.recordUndo();
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
        this.saveImage();
    }

    clear(registerUndo: boolean = false, save: boolean = false) {
        if (registerUndo){
            this.recordUndo();
        }
        this.baseLayer.clear();
        if (save){
            this.saveImage();
        }
    }

    recordUndo(){
        this._undoBuffer = this.baseLayer.getData();
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
            this.recordUndo();
        }
        this.baseLayer.putData(undoBuffer);
    }

    loadImage(id: string) {
        return ImageStorage.loadImage(id)
            .then(image => {
                this._imageId = id;
                this.clear();
                if (image){
                    this.baseLayer.drawImage(image);
                }
                
                this.setOverlay(Utils.getOverlayPath(id));
            })
    }

    saveImage() {
        Utils.log("Saving image");
        this.baseLayer.canvas.toBlob(blob => ImageStorage.saveImage(this._imageId, blob as Blob));
    }

    show(){
        super.show();
        this._currentTouchId = 0;
        this.clearUndoBuffer();
        this._autoMaskCaptured = false;
        window.requestAnimationFrame(timeStamp => this.tick(timeStamp))
        this._currentTool.enable();
    }
    
    hide(){
        this.saveImage();
        if (this._currentTool){
            this._currentTool.disable();
        }
        super.hide();
    }

    private tick(timeStamp: number) {
        if (!this.isVisible()){
            return;
        }

        window.requestAnimationFrame(timeStamp => this.tick(timeStamp))
        
        if (config.debug){
            Utils.updateFPSCounter();
        }

        if (!this._currentTool) {
            return;
        }
        
        let delta = timeStamp - this._tickTimeStamp;
        this._tickTimeStamp = timeStamp;
        this._currentTool.tick(delta);
    }

    captureAutoMask(position: Point) {
        this._autoMaskCaptured = true;
        if (!this.overlayLayer){
            return;
        }
        
        // let imageData = this._autoMaskCtx.getImageData(0, 0, this.width, this.height);
        //
        // // avoid expensive floodfill:
        // const index = (position.x + position.y * this.width) * 4 + 3;
        // if (this._autoMaskCaptured && imageData.data[index] > 0){
        //     return;
        // }
        //
        // Utils.log("capturing auto mask");
        // Utils.floodFill(this.overlayLayer.ctx, imageData.data, position);
        // Utils.dilateMask(imageData.data, this.width, this.height);
        // this._autoMaskCtx.putImageData(imageData, 0, 0);
    }

    private processOverlay(ctx: CanvasRenderingContext2D) {
        const imageData = ctx.getImageData(0, 0, this.width, this.height);
        const pixels = imageData.data;
        for (let i = pixels.length - 1; i >= 0; i--) {
            pixels[i] = pixels[i] > 64 ? 255 : 0;
        }
        ctx.putImageData(imageData, 0, 0);
    }

}