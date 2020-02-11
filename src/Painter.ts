import Point from "./Point";
import Tool from "./Tools/Tool";
import PainterUtils from "./PainterUtils";
import ImageMeta from "./ImageMeta";
import ImageStorage from "./ImageStorage";

export default class Painter {
    public strokeStyle: string | CanvasGradient | CanvasPattern = "#000";
    public lineWidth: number = 1;
    public strokeFinished: Function | undefined;
    public currentTool: Tool | undefined;

    private _parent: HTMLElement;
    private _layers: CanvasRenderingContext2D[] = [];

    underlay: HTMLImageElement | undefined;
    overlay: HTMLImageElement | undefined;

    public width: number;
    public height: number;
    imageId: string;
    meta: ImageMeta;
    pixelPerfect: boolean;

    constructor(parent: HTMLElement) {
        this._parent = parent;
        this.imageId = PainterUtils.createNewImageId();
        this.meta = new ImageMeta();

        let scaleFactor = 1;
        this.width = 1024 * scaleFactor;
        this.height = 768 * scaleFactor;
        this.pixelPerfect = false;

        this.createLayer(-1);
        this.createLayer(0);
        this.createLayer(1);

        this.addEventListeners();
    }

    private addEventListeners() {
        let canvas = this.getLayer(1).canvas;
        canvas.addEventListener('click', event => event.preventDefault());
        canvas.addEventListener('pointerdown', event => this.pointerDown(event));
        canvas.addEventListener('pointermove', event => this.pointerMove(event));
        canvas.addEventListener('pointerup', event => this.pointerUp(event));
        canvas.addEventListener('pointercancel', event => this.pointerCancel(event));
    }

    private createLayer(index: number) {
        let canvas = <HTMLCanvasElement>document.createElement("Canvas");
        canvas.id = `layer${index}`;
        canvas.width = this.width;
        canvas.height = this.height;
        let ctx = <CanvasRenderingContext2D>canvas.getContext("2d", { alpha: true });
        //ctx.imageSmoothingQuality = "high";
        //ctx.imageSmoothingEnabled = true;
        if (index >= 0) {
            // Negative layers are invisible:
            this._parent.appendChild(canvas);
        }
        this._layers[index] = ctx;
    }

    public getLayer = (index: number) => this._layers[index];

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

        if (this.strokeFinished){
            this.strokeFinished();
        }
    }

    pointerCancel(event: PointerEvent) {
        if (!this.currentTool) {
            return;
        }
        event.preventDefault();
        //console.log("pointer cancel", this.currentTool.mouse, this.currentTool.painting, event.pointerType);
    }

    clear(removeOverlay = false) {
        let ctx = this.getLayer(0);
        //ctx.fillStyle = this.strokeStyle;
        //ctx.fillRect(0, 0, this.width, this.height);
        ctx.clearRect(0,0, this.width, this.height);

        if (removeOverlay){
            this.meta.overlay = "";
            this.overlay = undefined;
            return;
        }

        // if (this.underlay){
        //     ctx.globalCompositeOperation = "multiply";
        //     ctx.drawImage(this.underlay, 0, 0, this.width, this.height);
        //     ctx.globalCompositeOperation = "source-over";
        // }
        this.applyOverlay(ctx, false);
    }

    applyOverlay(ctx: CanvasRenderingContext2D, masked = true) {
        if (this.overlay) {
            if (masked)
            {
                ctx.globalCompositeOperation = "source-atop";
            }
            ctx.drawImage(this.overlay, 0, 0, this.width, this.height);
            ctx.globalCompositeOperation = "source-over";
        }
    }

    loadImage(id: string) {
        return ImageStorage.loadImage(id)
            .then(image => {
                this.imageId = image.id;
                this.getLayer(0).drawImage(image, 0, 0);
                return ImageStorage.loadMeta(id)
            })
            .then(meta => this.setMeta(meta as ImageMeta || new ImageMeta()));
    }

    loadOrCreateImage(id: string) {
        return this.loadImage(id)
            .catch(() => {
                this.imageId = id;
                let meta: ImageMeta = new ImageMeta();
                this.setMeta(meta).then(() => {
                    this.clear();
                })
            })
    }

    newImage(meta: ImageMeta = new ImageMeta()) {
        this.imageId = PainterUtils.createNewImageId();
        this.setMeta(meta).then(() => {
            this.clear();
        })
    }

    private loadUnderlay(){
        return ImageStorage.loadImage(this.meta.underlay)
            .then(img => this.underlay = img)
            .catch(() => this.underlay = undefined)
    }

    private loadOverlay(){
        return ImageStorage.loadImage(this.meta.overlay)
            .then(img => this.overlay = img)
            .catch(() => this.underlay = undefined)
    }

    setMeta(meta: ImageMeta){
        this.meta = meta;
        return Promise.all([this.loadUnderlay(), this.loadOverlay()]);
    }

    saveImage() {
        this.getLayer(0).canvas.toBlob(blob => ImageStorage.saveImage(this.imageId, blob as Blob, this.meta));
    }
}