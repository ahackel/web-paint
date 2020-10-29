import Point from "./Point";

export default class Utils {

    public static addFastClick(element: HTMLElement, callback: (this: HTMLElement, event: any) => any){
        element.addEventListener("touchstart", event => event.preventDefault());
        element.addEventListener("touchend", callback);
        element.addEventListener("click", callback);
    }

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
    
    public static stringToColor(h: string): number{
        let r = 0, g = 0, b = 0;

        if (h.length == 4) {
            r = parseInt(h[1] + h[1], 16);
            g = parseInt(h[2] + h[2], 16);
            b = parseInt(h[3] + h[3], 16);
        } 
        else  {
            r = parseInt(h[1] + h[2], 16);
            g = parseInt(h[3] + h[4], 16);
            b = parseInt(h[5] + h[6], 16);
        }

        return 0xFF000000 + r + (g << 8) + (b << 16);
    }
 
    public static floodFill(imageCtx: CanvasRenderingContext2D, startPosition: Point, color: string){
        const width = imageCtx.canvas.width;
        const height = imageCtx.canvas.height;
        const imageData = imageCtx.getImageData(0, 0, width, height);

        const i32 = new Uint32Array(imageData.data.buffer);

        startPosition = startPosition.round();
        const startIndex: number = Math.round(startPosition.x) + Math.round(startPosition.y) * width;
        const startColor: number = i32[startIndex];
        const fillColor: number = this.stringToColor(color);

        let stack: Point[] = [];
        stack.push(startPosition);

        while (stack.length > 0)
        {
            let pos = stack.pop();

            if (isBorderPixel(pos.x, pos.y)) {
                continue;
            }

            const minX = scanLeft(pos.x, pos.y);
            const maxX = scanRight(pos.x, pos.y);
            addToStack(minX, maxX, pos.y - 1);
            addToStack(minX, maxX, pos.y + 1);
        }

        imageCtx.putImageData(imageData, 0, 0);


        function scanLeft(x: number, y: number): number
        {
            let minX = x;
            while (minX >= 0)
            {
                if (isBorderPixel(minX, y)){
                    break;
                }

                i32[minX + y * width] = fillColor;
                minX -= 1;
            }

            return minX + 1;
        }

        function scanRight(x: number, y: number): number
        {
            let maxX: number = x + 1;
            while (maxX < width)
            {
                if (isBorderPixel(maxX, y)){
                    break;
                }

                i32[maxX + y * width] = fillColor;
                maxX += 1;
            }

            return maxX - 1;
        }
        
        function addToStack(minX: number, maxX: number, y: number)
        {
            if (y < 0 || y >= height)
            {
                return;
            }

            for (let cx = minX; cx <= maxX; cx++)
            {
                if (isBorderPixel(cx, y)){
                    continue;

                }
                stack.push(new Point(cx, y));
            }
 
        }       

        function isBorderPixel(x: number, y: number) {
            return i32[x + y * width] !== startColor;
        }
    }
}