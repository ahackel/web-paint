import Tool from "./Tool";
import Point from "../utils/Point";
import CanvasLayer from "../CanvasLayer";
import Rect from "../utils/Rect";
import ImageStorage from "../storage/ImageStorage";
import Utils from "../utils/Utils";
import PaintView from "../views/PaintView";
import {config} from "../config";

// Provides a floating selection the user can manipulate 
export default class SelectionTool extends Tool {
    readonly selectionLayerId = "selection-layer";

    get selectionLayer(): CanvasLayer { return <CanvasLayer>this.painter.getLayer(this.selectionLayerId) }
    get selection(): Rect { return this._selection; }
    get hasFloatingSelection(): boolean { return this._hasFloatingSelection; }
    set hasFloatingSelection(value: boolean) { 
        this._hasFloatingSelection = value;
        this.toggleFloatingSelectionButtons(value);
    }
    get isInShapesPalette(): boolean { return this._isInShapesPalette; }
    set isInShapesPalette(value: boolean) { 
        this._isInShapesPalette = value;
        this._saveButton.classList.toggle("disabled", value);
    }
    
    protected _startPosition: Point;
    protected _selection: Rect = Rect.Empty();
    private _hasFloatingSelection: boolean;
    private _drawSelectionOutlineRequested: boolean;
    private _isInShapesPalette: boolean;
    private _deleteButton: HTMLDivElement;
    private _stampButton: HTMLDivElement;
    private _saveButton: HTMLDivElement;
    private _fullscreenButton: HTMLDivElement;

    constructor(painter: PaintView, buttonId: string) {
        super(painter, buttonId);
        this._deleteButton = <HTMLDivElement>document.getElementById("selection-delete-button");
        Utils.addFastClick(this._deleteButton, () => this.clearSelection());
        this._stampButton = <HTMLDivElement>document.getElementById("selection-stamp-button");
        Utils.addFastClick(this._stampButton, () => this.paintSelectionToCanvas());
        this._saveButton = <HTMLDivElement>document.getElementById("selection-save-button");
        Utils.addFastClick(this._saveButton, () => this.saveSelectionAsNewStamp());
        this._fullscreenButton = <HTMLDivElement>document.getElementById("selection-fullscreen-button");
        Utils.addFastClick(this._fullscreenButton, () => this.showSelectionInFullscreen());
        this.hasFloatingSelection = false;
    }
    
    toggleFloatingSelectionButtons(visible: boolean){
        this._deleteButton.classList.toggle("hidden", !visible);
        this._stampButton.classList.toggle("hidden", !visible);
        this._fullscreenButton.classList.toggle("hidden", !visible);
        this._saveButton.classList.toggle("hidden", !visible);
    }

    enable() {
        super.enable();
        this.createSelectionLayer();
        this.hasFloatingSelection = false;
        this.isInShapesPalette = false;
    }

    disable() {
        super.disable();
        this.paintSelectionToCanvas();
        this.destroySelectionLayer();
        this.hasFloatingSelection = false;
    }
    
    down() {
        this.startNewSelection();
    }

    private startNewSelection() {
        this.paintSelectionToCanvas();
        this.selectionLayer.setPositionAndSize(0, 0, this.painter.width, this.painter.height);
        this.selectionLayer.transform(new Point(0, 0), 1, 0);
        this.selectionLayer.floating = false;

        this.hasFloatingSelection = false;
        this.isInShapesPalette = false;
        this._startPosition = this.getMousePosition();
        
        let ctx = this.selectionLayer.ctx;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.strokeStyle = "black";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        this.requestDrawSelectionOutline();
    }

    private getMousePosition() {
        return this.mouse.copy().round().clamp(0, 0, this.painter.width - 1, this.painter.height - 1);
    }

    move(): void {
        if (!this.painting) {
            return;
        }
        this.mouse.round();

        this.requestDrawSelectionOutline();
    }
    
    up(): void {
        this.cutSelection();
    }

    tick(delta: number) {
        if (this._drawSelectionOutlineRequested) {
            this.updateSelectionAndDrawOutline();
            this._drawSelectionOutlineRequested = false;
        }
    }
    
    keyDown(event: KeyboardEvent) {
        switch (event.code){
            case 'Backspace':
                this.clearSelection();
                break;
            case 'KeyC':
                if (event.metaKey){
                    this.copyToClipboard();
                }
                break;
        }
    }

    private clearSelection() {
        this.selectionLayer.clear();
        this.startNewSelection();
    }

    setImage(image: HTMLImageElement){
        this.hasFloatingSelection = true;
        this.selectionLayer.resize(image.width, image.height);
        this.selectionLayer.floating = true;
        this.selectionLayer.drawImage(image);
        this.isInShapesPalette = true;
    }

    setImageUrl(url: string){
        const img = new Image();
        img.src = url;
        img.onload = () => {
            this.setImage(img);
        }
    }

    private requestDrawSelectionOutline() {
        this._drawSelectionOutlineRequested = true;
    }

    private updateSelectionAndDrawOutline() {
        if (this.hasFloatingSelection){
            return;
        }
        this.selectionLayer.clear();
        let ctx = this.selectionLayer.ctx;

        const position = this.getMousePosition();

        const x = Math.min(this._startPosition.x, position.x);
        const y = Math.min(this._startPosition.y, position.y);
        const width = Math.abs(this._startPosition.x - position.x);
        const height = Math.abs(this._startPosition.y - position.y);
        this._selection = new Rect(x, y, width, height);

        ctx.strokeRect(x, y, width, height);
    }
    
    private destroySelectionLayer() {
        this.painter.removeLayer(this.selectionLayer);
    }

    private createSelectionLayer() {
        if (this.selectionLayer){
            return;
        }

        this.painter.addCanvasLayer(this.selectionLayerId, 0, 0, this.painter.width, this.painter.height, false);
        this.selectionLayer.onDoubleTap = (event: TouchEvent) => {
            if (event.altKey){
                this.saveSelectionAsNewStamp();
                return;
            }
            this.paintSelectionToCanvas();
        }
    }
    
    private cutSelection() {
        this.selectionLayer.clear();
        this._selection = Utils.getVisiblePixelFrame(this.painter.baseLayer.ctx, this.selection);
        
        if (this.selection.isEmpty()){
            return;
        }

        this.hasFloatingSelection = true;
        const {x, y, width, height} = this.selection;
        
        this.selectionLayer.setPositionAndSize(x, y, width, height);
        this.selectionLayer.floating = true;
        this.selectionLayer.ctx.drawImage(this.painter.baseLayer.canvas, x, y, width, height, 0, 0, width, height);
        this.painter.baseLayer.clear(this.selection);
    }

    private paintSelectionToCanvas() {
        if (!this.hasFloatingSelection){
            return;
        }
        this.painter.recordUndo();
        this.painter.baseLayer.ctx.globalCompositeOperation = "source-over";
        this.selectionLayer.drawToCanvas(this.painter.baseLayer.ctx);
    }

    private saveSelectionAsNewStamp() {
        ImageStorage.keys()
            .then((keys: string[]) => {
                const shapesIds = keys.filter(x => x.startsWith("Shape"));
                if (shapesIds.length >= config.maxShapeCount){
                    console.log("Cannot save selection as shape because there are already too many in storage.");
                    return;
                }
                
                const id = "Shape" + Date.now();
                console.log(`Saving selection as: ${id}`);
                this.selectionLayer.canvas.toBlob(blob => ImageStorage.saveImage(id, blob as Blob));
                this.isInShapesPalette = true;
            });
    }


    copyToClipboard(){
        this.selectionLayer.canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]));
        console.log("copied selection to clipboard");
    }

    pasteFromClipboard() {
        navigator.permissions.query({name: "clipboard-read"})
            .then(result => {
                if (!(result.state == "granted" || result.state == "prompt")) {
                    return;
                }
                navigator.clipboard.read()
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            if (!data[i].types.includes("image/png")){
                                continue;
                            }
                            data[i].getType("image/png")
                                .then(blob => {
                                    this.setImageUrl(URL.createObjectURL(blob));
                                })
                        }
                    });
            });
    }

    private showSelectionInFullscreen() {
        let img = new Image();
        this.selectionLayer.canvas.toBlob(blob => img.src = URL.createObjectURL(blob));
        img.classList.add("fullscreen");
        Utils.addFastClick(img, () => {
            img.remove();
        })
        document.body.appendChild(img);
    }

    selectAll() {
        this.startNewSelection();
        this._selection = new Rect(0, 0, this.painter.width, this.painter.height);
        this.cutSelection();
    }
}
