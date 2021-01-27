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
import ShapePalette from "../palettes/ShapePalette";
import Layer from "../Layer";
import ILayer from "../ILayer";
import CanvasLayer from "../CanvasLayer";
import ImageLayer from "../ImageLayer ";
import SelectionTool from "../tools/SelectionTool";
import {Toolbar} from "../Toolbar";
import {History} from "../History";
import * as PIXI from 'pixi.js';

// var Pressure = require('pressure');
export interface IPointerData {
    timeStamp: number;
    position: Point;
    radius: Point;
    tilt: Point;
    pressure: number;
    speed: number;
    isPressed: boolean;
}

export class PaintView extends View {
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
    private _mainToolbar: Toolbar;
    private _contextToolbar: Toolbar;
    private _colorPalette: ColorPalette;
    private _sizePalette: SizePalette;
    private _shapePalette: ShapePalette;
    private _tools: Tool[];
    private _currentTouchId: number = 0;
    private _history: History;
    private _undoButton: HTMLDivElement;
    private _redoButton: HTMLDivElement;
    private _lastPointerData: IPointerData;
    private _tickTimeStamp: number;
    private _autoMaskCaptured: boolean;
    private _stamp: string;
    private _layers: { [id : string] : ILayer } = {};
    private _sheet: HTMLElement;
    private _importImageButton: HTMLDivElement;
    private _isDirty: boolean;
    private _lastSaveTimestamp: number = 0;

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

        const pixiApp = new PIXI.Application();
        this._element.appendChild(pixiApp.view);
        
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.drawCircle(50, 40, 100);
        graphics.endFill();
        pixiApp.stage.addChild(graphics);
        
        this._history = new History();
        this._sheet = document.getElementById("sheet");

        this.width = config.width;
        this.height = config.height;
        Utils.log(`Setting PaintView size to ${this.width} x ${this.height}`);

        this.addCanvasLayer("base-layer", 0, 0, this.width, this.height,false);
        this.baseLayer.canvas.classList.add("hidden");
        this.addEventListeners();
        this.createButtons(onBackClicked);
        this.createToolbar();
        this.createPalettes();
        this.createTools();
    }
    
    getLayer(id: string){
        return this._layers[id];
    }

    private createButtons(onBackClicked: Function) {
        let backButton = <HTMLDivElement>this._element.getElementsByClassName("button back")[0];
        Utils.addClick(backButton, () => onBackClicked());

        this._undoButton = <HTMLDivElement>document.getElementById("undo-button");
        Utils.addClick(this._undoButton, () => this.undo());

        this._redoButton = <HTMLDivElement>document.getElementById("redo-button");
        Utils.addClick(this._redoButton, () => this.redo());

        let importImageField = <HTMLInputElement>document.getElementById("import-image-field");
        importImageField.addEventListener("change", files => {
            if (importImageField.files.length == 0){
                return;
            }
            let file = importImageField.files[0];
            let image = new Image();
            const url = URL.createObjectURL(file);
            image.src = url;
            image.onload = () => {
                this.setTool(this.selectionTool);
                this.selectionTool.setImage(image);
                URL.revokeObjectURL(url);
            }
            
            // Reset input field so the change event will be triggered again if the user selects the same asset again
            importImageField.value = null;
        })
        this._importImageButton = <HTMLDivElement>document.getElementById("import-image-button");
        Utils.addClick(this._importImageButton, () => importImageField.click());
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
        let penButton = document.getElementById("tool-pen");
        Utils.addLongClick(penButton, () => this.fill());
        Utils.addClick(penButton, () => this.setTool(this.markerTool));
        let eraserButton = document.getElementById("tool-eraser");
        Utils.addLongClick(eraserButton, () => this.clear(true));
        Utils.addClick(eraserButton, () => this.setTool(this.eraserTool));
        let selectionButton = document.getElementById("tool-selection");
        Utils.addClick(selectionButton, () => this.setTool(this.selectionTool));
        Utils.addLongClick(selectionButton, () => {
            this.setTool(this.selectionTool);
            this.selectionTool.selectAll();
        });
        
        this._tools = [];
        // this.brushTool = this.addTool(new PenTool(this, "tool-", "source-over"));
        this.markerTool = this.addTool(new PenTool(this, "tool-pen", "source-over"));
        this.eraserTool = this.addTool(new PenTool(this, "tool-eraser", "destination-out"));
        this.selectionTool = <SelectionTool>this.addTool(new SelectionTool(this, "tool-selection"));
        // this.paintBucketTool = this.addTool(new PaintBucketTool(this));
        // this._currentTool = this.brushTool;
        this.setTool(this.markerTool);
    }
    
    private addTool(tool: Tool){
        this._tools.push(tool);
        return tool;
    }
    
    private createToolbar(){
        this._mainToolbar = new Toolbar("main-toolbar");

        this._contextToolbar = new Toolbar("context-toolbar");
    }

    private createPalettes() {
        this._sizePalette = new SizePalette("size-palette");
        this._sizePalette.onSelectionChanged = (lineWidth: number) => {
            this._lineWidth = lineWidth;
        };
        this._lineWidth = this._sizePalette.size;

        this._colorPalette = new ColorPalette("color-palette");
        this._colorPalette.onSelectionChanged = (color: string) => this._color = color;
        this._color = this._colorPalette.color;

        this._shapePalette = new ShapePalette("stamp-palette");
        this._shapePalette.onSelectionChanged = (stamp: string) => {
            this._stamp = stamp;
            this.setTool(this.selectionTool);
            this.selectionTool.setImageUrl(this.stamp);
        }
        this._stamp = this._shapePalette.stamp;

        this._opacity = 1;
    }

    private setTool(tool: Tool) {
        if (this._currentTool == tool){
            return;
        }
        
        if (this._currentTool){
            this._currentTool.disable();
        }
        this._currentTool = tool;
        if (this._currentTool){
            this._currentTool.enable();
        }

        this._colorPalette.setVisible(this._currentTool == this.markerTool);
        this._sizePalette.setVisible(this._currentTool == this.markerTool || this._currentTool == this.eraserTool);
        // this._shapePalette.setVisible(this._currentTool == this.selectionTool);
        // this._importImageButton.classList.toggle("hidden", this._currentTool != this.selectionTool);
    }

    private addEventListeners() {
        let canvas = this.baseLayer.canvas;
        canvas.style.pointerEvents = "auto";
        //canvas.addEventListener('keydown', event => this.keyDown(event));
        document.addEventListener('keydown', event => this.keyDown(event));
        canvas.addEventListener('click', event => event.preventDefault());

        if (config.usePointerEvents && window.PointerEvent != null){
            // Required to prevent pointerDown events from being choked when tapping repeatedly: 
            canvas.addEventListener('touchstart', event => {
                if (event.cancelable){
                    event.preventDefault();
                }
            });
            
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
        if (!this.isVisible()){
            return;
        }
        
        switch (event.code){
            case 'KeyV':
                if (event.metaKey){
                    this.setTool(this.selectionTool);
                    this.selectionTool.pasteFromClipboard();
                }
                break;
        }
        
        if (!this._currentTool) {
            return;
        }
        this._currentTool.keyDown(event);
    }

    pointerDown(event: PointerEvent) {
        event.preventDefault();
        if (!event.isPrimary || event.buttons !== 1) {
            return;
        }

        let target = <HTMLElement>event.target;
        target.setPointerCapture(event.pointerId);
        this._currentTouchId = event.pointerId;

        this.down({
            timeStamp: event.timeStamp,
            position: this.getPointerEventPosition(event),
            radius: this.screenToSheet(new Point(event.width, event.height)),
            tilt: this.getTilt(event),
            pressure: this.getNormalizedPointerPressure(event),
            speed: 1,
            isPressed: true
        });
     }

    pointerMove(event: PointerEvent) {
        event.preventDefault();
        if (!event.isPrimary || event.buttons !== 1) {
            return;
        }

        this.move({
            timeStamp: event.timeStamp,
            position: this.getPointerEventPosition(event),
            radius: this.screenToSheet(new Point(event.width, event.height)),
            tilt: this.getTilt(event),
            pressure: this.getNormalizedPointerPressure(event),
            speed: 1,
            isPressed: true
        });
    }

    getNormalizedPointerPressure(event: PointerEvent): number {
        return event.pointerType == "pen" ? event.pressure : 1;
    }

    getNormalizedTouchPressure(touch: Touch): number {
        return touch.touchType == "stylus" ? touch.force : 1;
    }

    getTilt(event: PointerEvent): Point {
        return event.pointerType == "pen" ? new Point(event.tiltX, event.tiltY) : new Point(0, 0);
    }

    getTiltFromTouch(touch: Touch): Point {
        return touch.touchType == "stylus" ? new Point(0, 0) : new Point(0, 0);
    }

    pointerUp(event: PointerEvent) {
        event.preventDefault();
        if (!event.isPrimary){
            return;
        }

        let target = <HTMLElement>event.target;
        target.releasePointerCapture(event.pointerId);

        this.up({
            timeStamp: event.timeStamp,
            position: this.getPointerEventPosition(event),
            radius: new Point(event.width, event.height),
            tilt: this.getTilt(event),
            pressure: 1,
            speed: 1,
            isPressed: false
        });
        this._currentTouchId = 0;
    }
    
    pressureChanged(force: number){
        // let pressure = Utils.clamp(0.3, 1, force * 2);
        // this._currentTool.pressure = Math.max(pressure, this._currentTool.pressure);
        // this._currentTool.pressureChanged();
    }

    touchStart(event: TouchEvent) {
        event.preventDefault();
        if (this._currentTouchId !== 0){
            return;
        }
        const touch = event.targetTouches[0];
        this._currentTouchId = touch.identifier;
        this.down({
            timeStamp: event.timeStamp,
            position: this.getTouchEventPosition(touch),
            radius: this.screenToSheet(new Point(touch.radiusX, touch.radiusY)),
            tilt: this.getTiltFromTouch(touch),
            pressure: this.getNormalizedTouchPressure(touch),
            speed: 1,
            isPressed: true
        });
    }

    touchMove(event: TouchEvent) {
        event.preventDefault();
        let touch = PaintView.findTouch(event.targetTouches, this._currentTouchId);
        if (touch == null){
            return;
        }
        console.log(touch.force)
        this.move({
            timeStamp: event.timeStamp,
            position: this.getTouchEventPosition(touch),
            radius: this.screenToSheet(new Point(touch.radiusX, touch.radiusY)),
            tilt: this.getTiltFromTouch(touch),
            pressure: this.getNormalizedTouchPressure(touch),
            speed: 1,
            isPressed: true
        });
    }

    touchEnd(event: TouchEvent) {
        event.preventDefault();
        let touch = PaintView.findTouch(event.targetTouches, this._currentTouchId);
        if (touch != null){
            // current touch is still in the list of target touches, this means it has not ended yet
            return;
        }
        this.up({
            timeStamp: event.timeStamp,
            position: new Point(0 ,0),
            radius: new Point(0 ,0),
            tilt: new Point(0 ,0),
            pressure: 1,
            speed: 1,
            isPressed: false
        });
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

    private move(data: IPointerData) {
        if (!this._currentTool) {
            return;
        }

        let delta = Point.distance(this._lastPointerData.position, data.position);

        if (delta <= 1) {
            return;
        }
        
        this._lastPointerData = this._lastPointerData || data;
        let timeDelta = data.timeStamp - this._lastPointerData.timeStamp;
        const speed = delta / timeDelta;
        data.speed = Utils.lerp(this._lastPointerData.speed, speed, 0.2);
        this._lastPointerData = data;
        this._currentTool.move(data);
    }

    private down(data: IPointerData) {
        Palette.collapseAll();

        if (!this._currentTool) {
            return;
        }

        this._lastPointerData = data;
        this._currentTool.down(data);
    }

    private up(data: IPointerData) {
        if (!this._currentTool) {
            return;
        }

        this._lastPointerData = data;
        this._currentTool.up(data);
    }

    clear(recordHistoryState: boolean = false) {
        this.baseLayer.clear();
        if (recordHistoryState){
            this.recordHistoryState();
        }
    }

    fill() {
        this.baseLayer.ctx.fillStyle = this.color;
        this.baseLayer.ctx.fillRect(0, 0, this.width, this.height);
        this.recordHistoryState();
    }

    private ResetHistory() {
        this._history.clear();
        this.recordHistoryState();
        this.updateUndoButtons();
    }

    recordHistoryState(){
        this._history.recordState(this.baseLayer.getData());
        this.updateUndoButtons();
        this.setDirty();
    }

    updateUndoButtons(){
        this._undoButton.classList.toggle("disabled", !this._history.canUndo);
        this._redoButton.classList.toggle("disabled", !this._history.canRedo);
    }

    undo() {
        if (!this._history.canUndo){
            return;
        }
        this.baseLayer.putData(this._history.undo());
        this.updateUndoButtons();
        this.setDirty();
    }
    
    redo() {
        if (!this._history.canRedo){
            return;
        }
        this.baseLayer.putData(this._history.redo());
        this.updateUndoButtons()
        this.setDirty();
    }

    restoreCurrentHistoryState(){
        this.baseLayer.putData(this._history.getCurrentState());
    }

    loadImage(id: string) {
        return ImageStorage.loadImage(id)
            .then(image => {
                this._imageId = id;
                this.clear();
                if (image){
                    this.baseLayer.drawImage(image);
                }
                
                this.setOverlay(Utils.getImageOverlayUrl(id));
                this.ResetHistory();
                this._isDirty = false;
            })
    }

    private saveImage() {
        Utils.log("Saving image");
        this.baseLayer.canvas.toBlob(blob => ImageStorage.saveImage(this._imageId, blob as Blob));
        this._isDirty = false;
        this._lastSaveTimestamp = Date.now();
    }

    setDirty() {
        this._isDirty = true;
    }

    show(){
        super.show();
        this._currentTouchId = 0;
        this._autoMaskCaptured = false;
        window.requestAnimationFrame(timeStamp => this.tick(timeStamp))
        this._currentTool.enable();
    }
    
    hide(){
        Palette.collapseAll();

        if (this._currentTool){
            this._currentTool.disable();
        }
        if (this._layers){
            // Always save when closing the paint view in case we forgot to set the dirty flag somewhere:
            this.saveImage();
        }
        if (this._history){
            this._history.clear();
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

        let delta = timeStamp - this._tickTimeStamp;
        this._tickTimeStamp = timeStamp;

        if (this._currentTool) {
            this._currentTool.tick(delta);
            
            // never save while painting to avoid lags:
            if (this._lastPointerData && this._lastPointerData.isPressed){
                return;
            }
        }
        
        if (this._isDirty && Date.now() > this._lastSaveTimestamp + config.saveInterval){
            this.saveImage();
        }
    }

    captureAutoMask(position: Point) {
        if (!config.useAutoMask){
            return;
        }
        
        this._autoMaskCaptured = true;
        // if (!this.overlayLayer){
        //     return;
        // }

        if (!this._autoMaskCtx){
            let autoMaskCanvas = document.createElement("canvas");
            autoMaskCanvas.id = "auto-mask";
            autoMaskCanvas.width = this.width;
            autoMaskCanvas.height = this.height;
            this._autoMaskCtx = <CanvasRenderingContext2D>autoMaskCanvas.getContext("2d", {alpha: true});
        }

        let imageData = this._autoMaskCtx.getImageData(0, 0, this.width, this.height);

        // avoid expensive floodfill:
        const index = (position.x + position.y * this.width) * 4 + 3;
        // if (this._autoMaskCaptured && imageData.data[index] > 0){
        //     return;
        // }

        Utils.log("capturing auto mask");
        Utils.floodFill(this.baseLayer.ctx, imageData.data, position, this.color);
        Utils.dilateMask(imageData.data, this.width, this.height);
        this._autoMaskCtx.putImageData(imageData, 0, 0);
    }

    private processOverlay(ctx: CanvasRenderingContext2D) {
        const imageData = ctx.getImageData(0, 0, this.width, this.height);
        const pixels = imageData.data;
        for (let i = pixels.length - 1; i >= 0; i--) {
            pixels[i] = pixels[i] > 64 ? 255 : 0;
        }
        ctx.putImageData(imageData, 0, 0);
    }

    private screenToSheet(p: Point): Point {
        return new Point(p.x / screen.width * config.width, p.y / screen.height * config.height);
    }
}