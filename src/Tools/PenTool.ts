import Tool from "./Tool";
import Point from "../Point";

export default class PenTool extends Tool {

    private _lastPoint: Point = new Point(0, 0);

    private lerp(a: number, b: number, alpha: number): number{
        return a * (1 - alpha) + b * alpha;
    }

    down(): void {
        let ctx1 = this.painter.getLayer(1);
        ctx1.clearRect(0,0, this.painter.width, this.painter.height);
        ctx1.beginPath();
        ctx1.moveTo(this.mouse.x, this.mouse.y);
        ctx1.strokeStyle = this.painter.strokeStyle;
        ctx1.lineWidth = this.painter.lineWidth;
        ctx1.lineCap = "round";
        ctx1.lineJoin = "round";

        this._lastPoint = this.mouse.copy();
        this.move();
    }

    move(): void {
        if (!this.painting) {
            return;
        }

        let ctx0 = this.painter.getLayer(0);
        let ctx1 = this.painter.getLayer(1);

        let midPoint = new Point(
            (this.mouse.x + this._lastPoint.x) * 0.5,
            (this.mouse.y + this._lastPoint.y) * 0.5,
            );

        let a = this.lerp(0.5, 1.5, this.pressure);
        ctx1.lineWidth = this.painter.lineWidth * a;
        ctx1.quadraticCurveTo(this._lastPoint.x, this._lastPoint.y, midPoint.x, midPoint.y);
        ctx1.stroke();

        this.painter.applyOverlay(ctx1);

        ctx0.drawImage(ctx1.canvas, 0, 0);
        ctx1.clearRect(0,0, this.painter.width, this.painter.height);
        ctx1.beginPath();
        ctx1.moveTo(midPoint.x, midPoint.y);

        this._lastPoint = this.mouse.copy();
    }

    up(): void {
    }
}