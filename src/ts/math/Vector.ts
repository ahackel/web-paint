import Utils from "../utils/Utils";

export default class Vector {
    public x: number;
    public y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    
    set(x = 0, y = x){
        this.x = x;
        this.y = y;
        return this;
    }

    clone(): Vector{
        return new Vector(this.x, this.y);
    }

    add(v: Vector){
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    subtract(v: Vector){
        this.x -= v.x;
        this.y -= v.y;
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

    invert() {
        this.x *= -1;
        this.y *= -1;
        return this;
    };

    multiplyScalar(s: number) {
        this.x *= s;
        this.y *= s;
        return this;
    };

    divideScalar(s: number) {
        if(s === 0) {
            this.x = 0;
            this.y = 0;
        } else {
            var invScalar = 1 / s;
            this.x *= invScalar;
            this.y *= invScalar;
        }
        return this;
    };
    
    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    } 
    
    normalize() {
        return this.divideScalar(this.length());
    }

    distanceToSq(v: Vector) {
        const dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    
    distanceTo(v: Vector) {
        return Math.sqrt(this.distanceToSq(v));
    }

    lerp(v: Vector, alpha: number) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    };
}