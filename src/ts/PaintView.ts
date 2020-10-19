import {View} from "./View";
import Point from "./Point";
import Tool from "./Tool";
import PenTool from "./PenTool";
import ImageStorage from "./ImageStorage";
import ColorPalette from "./ColorPalette";
import ToolPalette from "./ToolPalette";

export default class PaintView extends View {

    pixelPerfect = true;
    scaleFactor = 1;
    width = 1024 * this.scaleFactor;
    height = 768 * this.scaleFactor;
    currentTool: Tool;
    strokeStyle: string | CanvasGradient | CanvasPattern = "#000";
    lineWidth: number = 8;
    imageId: string;

    public readonly ctx: CanvasRenderingContext2D;
    private _colorPalette: ColorPalette;
    private _toolPalette: ToolPalette;

    constructor(id: string, onBackClicked: Function) {
        super(id);

        let backButton = <HTMLDivElement>document.getElementById("back-button");
        backButton.addEventListener('click', event => onBackClicked());

        let canvas = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d", { alpha: true });
        // this.ctx.imageSmoothingQuality = "high";
        // this.ctx.imageSmoothingEnabled = true;
        this.addEventListeners();
        
        this._colorPalette = new ColorPalette("color-palette");
        this._colorPalette.onSelectionChanged = (color: string) => this.strokeStyle = color;

        this._toolPalette = new ToolPalette("tool-palette");
        this._toolPalette.onSelectionChanged = (option: string, index: number) => {
            this.clear();
        };

        this.currentTool = new PenTool(this);
    }

    private addEventListeners() {
        let canvas = this.ctx.canvas;
        canvas.addEventListener('click', event => event.preventDefault());
        canvas.addEventListener('pointerdown', event => this.pointerDown(event));
        canvas.addEventListener('pointermove', event => this.pointerMove(event));
        canvas.addEventListener('pointerup', event => this.pointerUp(event));
        canvas.addEventListener('pointercancel', event => this.pointerCancel(event));
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
    };

    private getPointerEventPaintingFlag(event: PointerEvent) {
        switch (event.pointerType) {
            case "touch":
                return true;
            default:
                return event.buttons === 1;
        }
    }
    pointerDown(event: PointerEvent) {
        this._colorPalette.collapse();
        this._toolPalette.collapse();

        if (!this.currentTool) {
            return;
        }

        event.preventDefault();

        this.currentTool.painting = this.getPointerEventPaintingFlag(event);
        this.currentTool.pressure = event.pressure;
        this.currentTool.mouse = this.getPointerEventPosition(event);
        this.currentTool.down();

        //console.log("pointer down", this.currentTool.mouse, this.currentTool.painting, event.pointerType, event.pressure);
    }

    pointerMove(event: PointerEvent) {
        if (!this.currentTool) {
            return;
        }

        event.preventDefault();

        this.currentTool.painting = this.getPointerEventPaintingFlag(event);
        this.currentTool.pressure = event.pressure;

        let newMouse = this.getPointerEventPosition(event);
        let delta = Point.distance(this.currentTool.mouse, newMouse);

        if (delta > 3){
            this.currentTool.mouse = newMouse;
            this.currentTool.move();
        }

        //console.log("pointer move", this.currentTool.mouse, this.currentTool.painting, event.pointerType, event.pressure);
    }

    pointerUp(event: PointerEvent) {
        if (!this.currentTool) {
            return;
        }

        event.preventDefault();

        this.currentTool.painting = this.getPointerEventPaintingFlag(event);
        this.currentTool.mouse = this.getPointerEventPosition(event);
        this.currentTool.up();
        //console.log("pointer up", this.currentTool.mouse, this.currentTool.painting, event.pointerType);

        // if (this.strokeFinished){
        //     this.strokeFinished();
        // }
    }

    pointerCancel(event: PointerEvent) {
        if (!this.currentTool) {
            return;
        }
        event.preventDefault();
        //console.log("pointer cancel", this.currentTool.mouse, this.currentTool.painting, event.pointerType);
    }

    clear() {
        this.ctx.clearRect(0,0, this.width, this.height);
    }

    fill() {
        this.ctx.fillStyle = this.strokeStyle;
        this.ctx.fillRect(0,0, this.width, this.height);
    }

    loadImage(id: string) {
        return ImageStorage.loadImage(id)
            .then(image => {
                this.imageId = id;
                this.clear();
                if (image){
                    this.ctx.drawImage(image, 0, 0);
                }
            })
    }

    saveImage() {
        this.ctx.canvas.toBlob(blob => ImageStorage.saveImage(this.imageId, blob as Blob));
    }

    hide(){
        if (this.imageId){
            this.saveImage();
        }
        super.hide();
    }
}