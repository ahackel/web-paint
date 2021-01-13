export default class Rect {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    
    get minX() { return this.x; }
    get minY() { return this.y; }
    get maxX() { return this.x + this.width; }
    get maxY() { return this.y + this.height; }

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    isEmpty(): boolean{
        return this.width <= 0 || this.height <= 0;
    }
    
    static Empty(): Rect{
        return new Rect(0, 0, 0, 0);
    }
}