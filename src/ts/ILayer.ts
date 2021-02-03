import Vector from "./math/Vector";

export default interface ILayer {
    readonly id: string;
    readonly width: number;
    readonly height: number;
    readonly position: Vector;
    readonly rotation: number;
    readonly scale: number;
    floating: boolean;
    index: number;

    remove(): void;
    resize(width: number, height: number): void;
    drawToCanvas(ctx: CanvasRenderingContext2D): void;
    transform(position: Vector, scale: number, rotation: number): void;
}