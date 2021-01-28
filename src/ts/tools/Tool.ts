import {PaintView, IPointerData} from "../views/PaintView";

// Base class for all tools
export default abstract class Tool {
    protected _painter: PaintView;
    
    get color() { return this._painter.color };
    get opacity() { return this._painter.opacity }
    get lineWidth() { return this._painter.lineWidth };
    
    private static _bufferCtx: CanvasRenderingContext2D;
    protected _buttonElement: HTMLElement; 

    constructor(painter: PaintView, buttonId: string) {
        this._painter = painter;
        this._buttonElement = document.getElementById(buttonId);
    }

    // creates a context to draw the current stroke to so we can draw the complete stroke with a different
    // operation. The buffer can be shared by different tools.
    private createBufferCtx() {
        let brushCanvas = document.createElement("canvas");
        brushCanvas.id = "buffer";
        brushCanvas.width = this._painter.width;
        brushCanvas.height = this._painter.height;
        Tool._bufferCtx = <CanvasRenderingContext2D>brushCanvas.getContext("2d", {alpha: true});
        Tool._bufferCtx.imageSmoothingQuality = "high";
        Tool._bufferCtx.imageSmoothingEnabled = true;
    }

    protected getBufferCtx(){
        if (Tool._bufferCtx == null){
            this.createBufferCtx();
        }
        return Tool._bufferCtx;
    }

    enable(): void {
        this._buttonElement.classList.add("selected");
    }
    disable(): void {
        this._buttonElement.classList.remove("selected");
    }

    down(data: IPointerData): void {}

    move(data: IPointerData): void {}
    
    up(data: IPointerData): void {}
    
    pressureChanged(): void {}
    tick(delta: number): void {}
    keyDown(event: KeyboardEvent): void {}
}