import Point from "./Point";
import {config} from "../config";
import Rect from "./Rect";
const Pressure = require('pressure');

let _times: number[] = [];
let _fps: number = 60;
let _fpsDisplay: HTMLElement;
let _fpsCounterEnabled = true;

export default class Utils {
    
    static imageToBlob(image: HTMLImageElement){
        const canvas = document.createElement("canvas");
        canvas.id = "imageToCanvas";
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = <CanvasRenderingContext2D>canvas.getContext("2d", {alpha: true});
        ctx.drawImage(image, 0 ,0);
        return new Promise(resolve => {
            canvas.toBlob(blob => resolve(blob));
        })
    }
    
    static pointerEventsSupported(): boolean {
        return window.PointerEvent != null;
    }

    static getImageOverlayUrl(id: string) {
        return config.images[id]?.overlay;
    }
    
    public static log(message?: any, ...optionalParams: any[]){
        if (!config.debug){
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
        _fps = Math.min(60, this.lerp(_fps, _times.length, 0.1));
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

    public static addClick(element: HTMLElement, callback: (this: HTMLElement, event: any) => any,
                           supportScrolling: boolean = false){
        
        let scrollStartX: number;
        let scrollStartY: number;
        let touchId: number;
        let isTracking: boolean;
        let startTimeStamp: number;
        let scrolled: boolean;
        
        element.addEventListener("touchstart", touchStart);
        element.addEventListener("mouseup", mouseUp);
        
        function mouseUp(event: Event){
            event.preventDefault();
            event.stopPropagation();
            callback.call(event.target, event);
        }
        
        function touchStart(event: TouchEvent){
            if (!supportScrolling){
                event.preventDefault();
            }
            
            if (isTracking || event.touches.length > 1){
                return;
            }
            const touch = event.changedTouches[0];

            isTracking = true;
            touchId = touch.identifier;
            scrolled = false;
            scrollStartX = touch.pageX;
            scrollStartY = touch.pageY;
            startTimeStamp = event.timeStamp;
            element.classList.add("down");

            element.addEventListener("touchmove", touchMove);
            element.addEventListener("touchend", touchEnd);
        }

        function touchMove(event: TouchEvent){
            if (!supportScrolling){
                event.preventDefault();
            }

            if (!isTracking){
                return;
            }
            const touch = event.changedTouches[0];
            
            // user dragged out of the element:
            if (document.elementFromPoint(touch.pageX,touch.pageY) != event.target){
                isTracking = false;
                element.classList.remove("down");
            }

            if (scrolled || event.timeStamp < startTimeStamp + config.maxScrollDelay){
                if (supportScrolling &&
                    (Math.abs(touch.pageX - scrollStartX) > config.minScrollDistance ||
                        Math.abs(touch.pageY - scrollStartY) > config.minScrollDistance)){
                    isTracking = false;
                    element.classList.remove("down");
                }
            }

            // After tapping and holding for a while the element does not start scrolling any more.
            // In that case we don't want perform the scroll check above any more:
            if (event.timeStamp < startTimeStamp + config.maxScrollDelay){
                if (Math.abs(touch.pageX - scrollStartX) > 2 ||
                    Math.abs(touch.pageY - scrollStartY) > 2){
                    scrolled = true;
                }
            }
        }

        function touchEnd(event: TouchEvent){
            event.preventDefault();
            element.removeEventListener("touchmove", touchMove);
            element.removeEventListener("touchend", touchEnd);
            element.classList.remove("down");
            
            if (!isTracking){
                return;
            }
            isTracking = false;
            touchId = null;

            callback.call(event.target, event);
        }
    }

    public static addLongClick(element: HTMLElement, callback: (this: HTMLElement, event: any) => any){
        let timer: any;
        let caller = this;
        let called: boolean = false;

        element.addEventListener("touchstart", down);
        element.addEventListener("touchend", up);
        element.addEventListener("mousedown", down);
        element.addEventListener("mouseup", up);

        function down(event: Event) {
            called = false;
            timer = setTimeout(() => {
                callback.call(caller, event);
                called = true;
            }, config.longClickDelay);
        }

        function up(event: Event) {
            if (called) {
                event.stopImmediatePropagation();
                called = false;
            } else {
                clearTimeout(timer);
            }
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
 
    public static floodFill(sourceCtx: CanvasRenderingContext2D, mask: Uint8ClampedArray,  startPosition: Point, color: string) {
        const threshold = 0.5;
        const width = sourceCtx.canvas.width;
        const height = sourceCtx.canvas.height;
        
        const sourceData = sourceCtx.getImageData(0, 0, width, height);
        const sourcePixels = sourceData.data;

        startPosition = startPosition.copy().round();
        const startIndex: number = startPosition.x + startPosition.y * width;
        
        // const startR = sourcePixels[startIndex * 4];
        // const startG = sourcePixels[startIndex * 4 + 1];
        // const startB = sourcePixels[startIndex * 4 + 2];
        // const startA = sourcePixels[startIndex * 4 + 3];

        const startR = parseInt(color[1] + color[2], 16);
        const startG = parseInt(color[3] + color[4], 16);
        const startB = parseInt(color[5] + color[6], 16);

        // take into account that transparent pixels appear white (due to white bg) but their rgb value is 0:
        // const startBrightness = startA < 5 ? 255 : 0.333 * (startR + startG + startB);
        const startBrightness = 0.333 * (startR + startG + startB);
        
        // clear alpha channel:
        for (let i = 0; i < width * height; i++) {
            mask[i * 4 + 3] = 0;
        }

        // start at multiple positions around start position:
        let stack: Point[] = [];
        stack.push(startPosition);
        if (startPosition.x > 1){
            stack.push(new Point(startPosition.x - 2, startPosition.y));
        }
        if (startPosition.x < width - 2){
            stack.push(new Point(startPosition.x + 2, startPosition.y));
        }
        if (startPosition.y > 1){
            stack.push(new Point(startPosition.x, startPosition.y - 2));
        }
        if (startPosition.y < height - 2){
            stack.push(new Point(startPosition.x, startPosition.y + 2));
        }

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
            const index = (x + y * width) * 4;
            const indexA = index + 3;
            if (mask[indexA]){
                return true;
            }

            const r = sourcePixels[index];
            const g = sourcePixels[index + 1];
            const b = sourcePixels[index + 2];
            const a = sourcePixels[index + 3];
            //
            // let difference = Math.max(
            //     Math.abs(r - startR),
            //     Math.abs(g - startG),
            //     Math.abs(b - startB),
            //     Math.abs(a - startA)
            // ) / 255;
            const brightness = 0.333 * (r + g + b);
            
            if (a < 250 || brightness >= startBrightness){
                if (setValue){
                    mask[indexA] = 255;
                }
                return false;               
            }
            
            // if (difference < threshold){
            //     if (setValue){
            //         mask[indexA] = 255;
            //     }
            //     return false;
            // }

            // if (setValue) {
            //     mask[indexA] = (1 - difference) * 255;
            // }
            return true;
        }
    }

    public static getVisiblePixelFrame(ctx: CanvasRenderingContext2D, rect: Rect): Rect {
        let {x, y, width, height} = rect;

        if (width <= 0 || height <= 0){
            return Rect.Empty();
        }
        
        const data = ctx.getImageData(x, y, width, height);
        const pixels = data.data;
        
        let minX = width;
        let maxX = 0;
        let minY = height;
        let maxY = 0;

        for (let cy = 0; cy < height; cy++) {
            for (let cx = 0; cx < width; cx++) {
                if (pixels[(cx + cy * width) * 4 + 3]){
                    minX = cx < minX ? cx : minX;
                    maxX = cx > maxX ? cx : maxX;
                    minY = cy < minY ? cy : minY;
                    maxY = cy > maxY ? cy : maxY;
                }
            }
        }
        
        x += minX;
        y += minY;
        width = Math.max(0, maxX - minX + 1);
        height = Math.max(0, maxY - minY + 1);
        return new Rect(x, y, width, height); 
    }
    
    public static dilateMask(pixels: Uint8ClampedArray, width: number, height: number) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width - 1; x++) {
                const i = (x + y * width) * 4 + 3;
                if (pixels[i + 4]){
                    pixels[i] = 255;
                }
            }
            for (let x = width - 1; x > 0; x--) {
                const i = (x + y * width) * 4 + 3;
                if (pixels[i - 4]){
                    pixels[i] = 255;
                }
            }
        }
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height - 1; y++) {
                const i = (x + y * width) * 4 + 3;
                if (pixels[i + 4 * width]){
                    pixels[i] = 255;
                }
            }
            for (let y = height - 1; y > 0; y--) {
                const i = (x + y * width) * 4 + 3;
                if (pixels[i - 4 * width]){
                    pixels[i] = 255;
                }
            }
        }
    }
}