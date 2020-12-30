import Point from "./Point";
import {config} from "../config";

let _times: number[] = [];
let _fps: number = 60;
let _fpsDisplay: HTMLElement;
let _fpsCounterEnabled = true;

export default class Utils {
    
    public static log(message?: any, ...optionalParams: any[]){
        if (!config.Debug){
            return;
        }
        console.log(message, optionalParams);
    }

    public static updateFPSCounter(){
        if (!_fpsCounterEnabled){
            return false;    
        }

        const now = performance.now();
        while (_times.length > 0 && _times[0] <= now - 1000) {
            _times.shift();
        }
        _times.push(now);
        _fps = this.lerp(_fps, _times.length, 0.1);
        if (_fpsDisplay == null){
            _fpsDisplay = <HTMLElement>document.getElementById("fps-counter");
            if (_fpsDisplay == null){
                this.log("Could not find fps counter element. Disabling fps counter.");
                _fpsCounterEnabled = false;
                return;
            }
        }
        _fpsDisplay.innerText = _fps.toFixed(0);
    }

    public static getImageSize(): [number, number] {
        // return screen.width > screen.height ? [screen.width, screen.height] : [screen.height, screen.width];
        return [config.width, config.height];
    }

    public static addFastClick(element: HTMLElement, callback: (this: HTMLElement, event: any) => any){
        element.addEventListener("touchstart", event => event.preventDefault());
        element.addEventListener("touchend", callback);
        element.addEventListener("click", callback);
    }

    public static addLongClick(element: HTMLElement, callback: (this: HTMLElement, event: any) => any, delay: number = 1500){
        
        let timer: any;
        let caller = this;
        let called: boolean = false;
        
        element.addEventListener("touchstart", event => {
            timer = setTimeout(() => {
                callback.call(caller, event);
                called = true;
            }, delay);
        });
        element.addEventListener("touchend", event => {
            if (called){
                event.stopImmediatePropagation();
            }
            else{
                clearTimeout(timer);
            }
        });
    }

    public static DispatchEventToAllElements(event: Event) {
        const elements = document.getElementsByTagName("*");
        for (let i = 0; i < elements.length; i++) {
            elements[i].dispatchEvent(event);
        }
    }

    public static createNewImageId(): string {
        return Date.now().toString();
    }

    public static lerp(a: number, b: number, alpha: number): number{
        return a * (1 - alpha) + b * alpha;
    }

    public static clamp(lower: number, upper: number, n: number): number{
        return Math.min(upper, Math.max(lower, n));
    }

    public static lerpColor(color1: number, color2: number, alpha: number): number{
        if (alpha == 0){
            return color1;
        }

        if (alpha == 1){
            return color2;
        }

        const aa = (color1 & 0xff000000) >> 24;
        const ba = (color1 & 0x00ff0000) >> 16;
        const ga = (color1 & 0x0000ff00) >> 8;
        const ra = (color1 & 0x000000ff);

        const ab = (color2 & 0xff000000) >> 24;
        const bb = (color2 & 0x00ff0000) >> 16;
        const gb = (color2 & 0x0000ff00) >> 8;
        const rb = (color2 & 0x000000ff);

        const r = Math.floor(Utils.lerp(ra, rb, alpha));
        const g = Math.floor(Utils.lerp(ga, gb, alpha));
        const b = Math.floor(Utils.lerp(ba, bb, alpha));
        const a = 255; //Math.floor(Utils.lerp(aa, ab, alpha));

        return r + (g << 8) + (b << 16) + 0xFF000000;
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
    
    public static stringToColor(h: string): number {
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
 
    public static floodFill(sourceCtx: CanvasRenderingContext2D, mask: Uint8ClampedArray,  startPosition: Point) {
        const threshold = 0.5;
        const width = sourceCtx.canvas.width;
        const height = sourceCtx.canvas.height;
        
        const sourceData = sourceCtx.getImageData(0, 0, width, height);
        const sourcePixels = sourceData.data;

        startPosition = startPosition.round();
        const startIndex: number = Math.round(startPosition.x) + Math.round(startPosition.y) * width;
        
        const startR = sourcePixels[startIndex * 4];
        const startG = sourcePixels[startIndex * 4 + 1];
        const startB = sourcePixels[startIndex * 4 + 2];
        const startA = sourcePixels[startIndex * 4 + 3];
        
        // clear alpha channel:
        for (let i = 0; i < width * height; i++) {
            mask[i * 4 + 3] = 0;
        }

        let stack: Point[] = [];
        stack.push(startPosition);

        while (stack.length > 0)
        {
            let pos = stack.pop();

            if (isBorderPixel(pos.x, pos.y, false)){
                continue;
            }
            
            const minX = scanLeft(pos.x, pos.y);
            const maxX = scanRight(pos.x, pos.y);
            addToStack(minX, maxX, pos.y - 1);
            addToStack(minX, maxX, pos.y + 1);
        }

        function scanLeft(x: number, y: number): number
        {
            let minX = x;
            while (minX >= 0)
            {
                if (isBorderPixel(minX, y, true)){
                    break;
                }
                minX -= 1;
            }
            return minX + 1;
        }

        function scanRight(x: number, y: number): number
        {
            let maxX: number = x + 1;
            while (maxX < width)
            {
                if (isBorderPixel(maxX, y, true)){
                    break;
                }
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

            for (let x = minX; x <= maxX; x++)
            {
                if (isBorderPixel(x, y, false)){
                    continue;
                }
                stack.push(new Point(x, y));
            }
 
        }

        function isBorderPixel(x: number, y: number, setValue: boolean): boolean {
            let index = (x + y * width) * 4;
            let indexA = index + 3;
            if (mask[indexA]){
                return true;
            }

            let r = sourcePixels[index];
            let g = sourcePixels[index + 1];
            let b = sourcePixels[index + 2];
            let a = sourcePixels[index + 3];

            let difference = Math.max(
                Math.abs(r - startR),
                Math.abs(g - startG),
                Math.abs(b - startB),
                Math.abs(a - startA)
            ) / 255;
            
            if (difference < threshold){
                if (setValue){
                    mask[indexA] = 255;
                }
                return false;
            }

            if (setValue) {
                mask[indexA] = (1 - difference) * 255;
            }
            return true;
        }
    }
}