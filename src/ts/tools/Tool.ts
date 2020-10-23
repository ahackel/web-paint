import Point from "../Point";
import PaintView from "../PaintView";

export default abstract class Tool {
    mouse: Point;
    painting: boolean = false;
    pressure: number = 1;
    painter: PaintView;

    constructor(painter: PaintView) {
        this.painter = painter;
        this.mouse = new Point(0,0);
    }

    abstract down(): void;
    abstract move(): void;
    abstract up(): void;
}