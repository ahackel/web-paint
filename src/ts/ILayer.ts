import Point from "./utils/Point";

export default interface ILayer {
    readonly id: string;
    readonly width: number;
    readonly height: number;
    readonly position: Point;
    readonly rotation: number;
    readonly scale: number;
    floating: boolean;
    index: number;

    remove(): void;
    resize(width: number, height: number): void;
    drawToCanvas(ctx: CanvasRenderingContext2D): void;
    transform(position: Point, scale: number, rotation: number): void;
}