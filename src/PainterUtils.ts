import Point from "./Point";

export default class PainterUtils {

    public static createNewImageId(): string {
        return Date.now().toString();
    }

    public static lerp(a: number, b: number, alpha: number): number{
        return a * (1 - alpha) + b * alpha;
    }

    public static lerpCanvas(ctxA: CanvasRenderingContext2D, ctxB: CanvasRenderingContext2D, ctxMask: CanvasRenderingContext2D) {
        const width = ctxA.canvas.width;
        const height = ctxA.canvas.height;
        const dataA = ctxA.getImageData(0, 0, width, height);
        const dataB = ctxB.getImageData(0, 0, width, height);
        const dataMask = ctxMask.getImageData(0, 0, width, height);

        const a32 = new Uint8ClampedArray(dataA.data.buffer);
        const b32 = new Uint8ClampedArray(dataB.data.buffer);
        const m32 = new Uint8ClampedArray(dataMask.data.buffer);

        for (let i = 0; i < width * height; i++){
            const a = m32[i * 4 + 3] / 255;
            a32[i * 4 + 0] = (1 - a) * a32[i * 4 + 0] + a * b32[i * 4 + 0];
            a32[i * 4 + 1] = (1 - a) * a32[i * 4 + 1] + a * b32[i * 4 + 1];
            a32[i * 4 + 2] = (1 - a) * a32[i * 4 + 2] + a * b32[i * 4 + 2];
            a32[i * 4 + 3] = (1 - a) * a32[i * 4 + 3] + a * b32[i * 4 + 3];
        }
        ctxA.putImageData(dataA, 0, 0);
    }

    public static floodFill(imageCtx: CanvasRenderingContext2D, maskCtx: CanvasRenderingContext2D, startPosition: Point){
        const width = imageCtx.canvas.width;
        const height = imageCtx.canvas.height;
        const imageData = imageCtx.getImageData(0, 0, width, height);
        const maskData = maskCtx.createImageData(width, height);

        const white = 0xFFFFFFFF;

        // Use 32bit buffer for single pixel read writes
        const i32 = new Uint8ClampedArray(imageData.data.buffer);
        const m32 = new Uint32Array(maskData.data.buffer);

        const startIndex = Math.round(startPosition.x) + Math.round(startPosition.y) * width;

        let stack: number[] = [];
        stack.push(startIndex);

        let index;
        while (stack.length > 0) {
            index = <number>stack.pop();

            if (m32[index] !== 0) {
                continue;
            }

            let minX = index % width;
            let maxX = minX + 1;
            const y = Math.floor(index / width);

            while (minX >= 0){
                index = minX + y * width;
                if (isBorderPixel(index)){
                    break;
                }
                m32[index] = white;
                minX--;
            }

            while (maxX < width){
                index = maxX + y * width;
                if (isBorderPixel(index)){
                    break;
                }
                m32[index] = white;
                maxX++;
            }

            for (let x = minX + 1; x < maxX; x++){
                if (y > 0) {
                    index = x + (y - 1) * width;
                    if (m32[index] === 0 && !isBorderPixel(index)){
                        stack.push(index)
                    }
                }
                if (y < height - 1) {
                    index = x + (y + 1) * width;
                    if (m32[index] === 0 && !isBorderPixel(index)){
                        stack.push(index)
                    }
                }
            }
        }

        maskCtx.putImageData(maskData, 0, 0);

        function isBorderPixel(index: number) {
            // const r = i32[index * 4 + 0];
            // const g = i32[index * 4 + 1];
            // const b = i32[index * 4 + 2];
            const a = i32[index * 4 + 3];
            // const value = r + b + g;
            return a === 255;
        }
    }
}