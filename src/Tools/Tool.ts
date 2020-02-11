import Point from "../Point";
import Painter from "../Painter";

export default abstract class Tool {
    mouse: Point;
    painting: boolean = false;
    pressure: number = 1;
    painter: Painter;

    constructor(painter: Painter) {
        this.painter = painter;
        this.mouse = new Point(0,0);
    }

    abstract down(): void;
    abstract move(): void;
    abstract up(): void;
}