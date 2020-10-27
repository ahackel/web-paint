import {View} from "./View";
import Point from "./Point";
import Tool from "./tools/Tool";
import PenTool from "./tools/PenTool";
import ImageStorage from "./ImageStorage";
import ColorPalette from "./ColorPalette";
import ToolPalette from "./ToolPalette";
import PaintBucketTool from "./tools/PaintBucketTool";
import {Palette} from "./Palette";

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
    private _tools: Tool[];

    constructor(id: string, onBackClicked: Function) {
        super(id);

        let backButton = <HTMLDivElement>document.getElementById("back-button");
        backButton.addEventListener('touchstart', () => {});
        backButton.addEventListener('click', () => onBackClicked());

        let clearButton = <HTMLDivElement>document.getElementById("clear-button");
        clearButton.addEventListener('touchstart', () => {});
        clearButton.addEventListener('click', () => this.clear());

        let canvas = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d", { alpha: true });
        // this.ctx.imageSmoothingQuality = "high";
        this.ctx.imageSmoothingEnabled = false;
        this.addEventListeners();
        
        this._colorPalette = new ColorPalette("color-palette");
        this._colorPalette.onSelectionChanged = (color: string) => this.strokeStyle = color;

        this._toolPalette = new ToolPalette("tool-palette");
        this._toolPalette.onSelectionChanged = (option: string, index: number) => {
            const toolCount = this._tools.length;
            this.currentTool = this._tools[Math.min(index, toolCount - 1)];
        };

        this._tools = [
            new PenTool(this, 20, "source-over"),
            new PenTool(this, 30, "darken"),
            new PenTool(this, 40, "destination-out"),
            new PaintBucketTool(this)
        ]
        this.currentTool = this._tools[0];
    }

    private addEventListeners() {
        let canvas = this.ctx.canvas;
        canvas.addEventListener('click', event => event.preventDefault());

        if (window.PointerEvent != null){
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

    private getTouchEventPosition = (event: TouchEvent) => {
        let target = <HTMLElement>event.target;
        let rect = target.getBoundingClientRect();

        var touch = event.touches[0];
        let x = (touch.clientX - rect.left) / rect.width * this.width;
        let y = (touch.clientY - rect.top) / rect.height * this.height;

        if (this.pixelPerfect){
            x = Math.round(x);
            y = Math.round(y);
        }
        return new Point(x, y);
    }

    private getPointerEventPaintingFlag(event: PointerEvent) {
        switch (event.pointerType) {
            case "touch":
                return true;
            default:
                return event.buttons === 1;
        }
    }

    pointerDown(event: PointerEvent) {
        event.preventDefault();
        this.down(this.getPointerEventPaintingFlag(event), this.getPointerEventPosition(event), event.pressure);
    }

    pointerMove(event: PointerEvent) {
        event.preventDefault();
        this.move(this.getPointerEventPaintingFlag(event), this.getPointerEventPosition(event), event.pressure);
    }

    pointerUp(event: PointerEvent) {
        event.preventDefault();
        this.up(this.getPointerEventPaintingFlag(event), this.getPointerEventPosition(event));
    }

    touchStart(event: TouchEvent) {
        event.preventDefault();
        this.down(true, this.getTouchEventPosition(event), 1);
    }

    touchMove(event: TouchEvent) {
        event.preventDefault();
        this.move(true, this.getTouchEventPosition(event), 1);
    }

    touchEnd(event: TouchEvent) {
        event.preventDefault();
        this.up(true,event.touches.length > 0 ? this.getTouchEventPosition(event) : this.currentTool.mouse);
    }

    private move(isPainting: boolean, mouse: Point, pressure: number) {
        if (!this.currentTool) {
            return;
        }

        this.currentTool.painting = isPainting;
        this.currentTool.pressure = pressure;

        let newMouse = mouse;
        let delta = Point.distance(this.currentTool.mouse, newMouse);

        if (delta > 3) {
            this.currentTool.mouse = newMouse;
            this.currentTool.move();
        }

        //console.log("pointer move", this.currentTool.mouse, this.currentTool.painting, event.pointerType, event.pressure);
    }

    private down(isPainting: boolean, mouse: Point, pressure: number) {
        Palette.collapseAll();

        if (!this.currentTool) {
            return;
        }

        event.preventDefault();

        this.currentTool.painting = isPainting;
        this.currentTool.pressure = pressure;
        this.currentTool.mouse = mouse;
        this.currentTool.down();

        //console.log("pointer down", this.currentTool.mouse, this.currentTool.painting, event.pointerType, event.pressure);
    }

    private up(isPainting: boolean, mouse: Point) {
        if (!this.currentTool) {
            return;
        }

        event.preventDefault();

        this.currentTool.painting = isPainting;
        this.currentTool.mouse = mouse;
        this.currentTool.up();
        //console.log("pointer up", this.currentTool.mouse, this.currentTool.painting, event.pointerType);

        // if (this.strokeFinished){
        //     this.strokeFinished();
        // }
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