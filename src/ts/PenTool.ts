import Tool from "./Tool";
import Point from "./Point";

export default class PenTool extends Tool {

    private _lastPoint: Point = new Point(0, 0);

    private lerp(a: number, b: number, alpha: number): number{
        return a * (1 - alpha) + b * alpha;
    }

    down(): void {
        let ctx1 = this.painter.ctx;
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

        let ctx1 = this.painter.ctx;

        let midPoint = new Point(
            (this.mouse.x + this._lastPoint.x) * 0.5,
            (this.mouse.y + this._lastPoint.y) * 0.5,
            );

        let a = this.lerp(0.5, 1.5, this.pressure);
        ctx1.lineWidth = this.painter.lineWidth * a;
        ctx1.quadraticCurveTo(this._lastPoint.x, this._lastPoint.y, midPoint.x, midPoint.y);
        ctx1.stroke();
        ctx1.beginPath();
        ctx1.moveTo(midPoint.x, midPoint.y);

        this._lastPoint = this.mouse.copy();
    }

    up(): void {
    }
}