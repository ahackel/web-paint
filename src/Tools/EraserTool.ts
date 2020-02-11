import Tool from "./Tool";
import Point from "../Point";
import PainterUtils from "../PainterUtils";

export default class EraserTool extends Tool {

    private _lastPoint: Point = new Point(0, 0);

    down(): void {
        let maskCtx = this.painter.getLayer(-1);
        let ctx1 = this.painter.getLayer(1);
        this.painter.applyOverlay(maskCtx, false);

        ctx1.clearRect(0,0, this.painter.width, this.painter.height);
        ctx1.beginPath();
        ctx1.moveTo(this.mouse.x, this.mouse.y);
        ctx1.strokeStyle = "white";
        ctx1.lineWidth = this.painter.lineWidth * 4;
        ctx1.lineCap = "round";
        ctx1.lineJoin = "round";

        this._lastPoint = this.mouse.copy();
    }

    move(): void {
        if (!this.painting) {
            return;
        }

        let midPoint = new Point(
            (this.mouse.x + this._lastPoint.x) * 0.5,
            (this.mouse.y + this._lastPoint.y) * 0.5,
        );

        let ctx0 = this.painter.getLayer(0);
        let ctx1 = this.painter.getLayer(1);
        let maskCtx = this.painter.getLayer(-1);
        ctx1.quadraticCurveTo(this._lastPoint.x, this._lastPoint.y, midPoint.x, midPoint.y);
        ctx1.stroke();

        PainterUtils.lerpCanvas(ctx0, maskCtx, ctx1);

        ctx1.clearRect(0,0, this.painter.width, this.painter.height);
        ctx1.beginPath();
        ctx1.moveTo(midPoint.x, midPoint.y);

        this._lastPoint = this.mouse.copy();
    }

    up(): void {
    }
}