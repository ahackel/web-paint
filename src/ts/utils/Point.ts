import Utils from "./Utils";

export default class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    copy(): Point{
        return new Point(this.x, this.y);
    }

    static add(a: Point, ...rest: Point[]){
        let sum = a.copy();
        for (let point of rest) {
            sum.x += point.x;
            sum.y += point.y;
        }
        return sum;
    }
    
    add(p: Point){
        this.x += p.x;
        this.y += p.y;
        return this;
    }

    static subtract(a: Point, b: Point){
        return new Point(a.x - b.x, a.y - b.y);
    }

    subtract(p: Point){
        this.x -= p.x;
        this.y -= p.y;
        return this;
    }

    round(){
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    
    clamp(minX: number, minY: number, maxX: number, maxY: number){
        this.x = Utils.clamp(minX, maxX, this.x);
        this.y = Utils.clamp(minY, maxY, this.y);
        return this;
    }
    
    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    } 
    
    normalize() {
        const length = this.length();
        if (length == 0){
            return;
        }
        this.x /= length;
        this.y /= length;
        return this;
    }
    
    scale(f: number){
        this.x *= f;
        this.y *= f;
        return this;
    }

    static scale(p: Point, f: number): Point{
        return new Point(p.x * f, p.y * f);
    }

    static distance(a: Point, b: Point) {
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static center(a: Point, b: Point) {
        return new Point(0.5 * (a.x + b.x), 0.5 * (a.y + b.y));
    }

    static mirror(p: Point, center: Point) {
        return new Point(2 * center.x - p.x, 2 * center.y - p.y);
    }

    static lerp(p1: Point, p2: Point, a: number){
        return new Point(
            p1.x * (1 - a) + p2.x * a,
            p1.y * (1 - a) + p2.y * a);
    }

    static cosInterp(p1: Point, p2: Point, a: number){
        const a2 = (1 - Math.cos(a * Math.PI))/2;
        return new Point(
            p1.x * (1 - a) + p2.x * a,
            p1.y * (1 - a2) + p2.y * a2);
    }
}