import Tool from "./Tool";
import * as Utils from "../utils/Utils";

// Fills an area with the selected color 
export default class PaintBucketTool extends Tool{
    down() {
        // let overlayCtx = this._painter.overlayCtx;
        // let ctx = this._painter.baseLayer.ctx;
        // let buffer = this.getBufferCtx();
        // buffer.fillStyle = this._painter.color;
        // buffer.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
        // let imageData = buffer.getImageData(0, 0, buffer.canvas.width, buffer.canvas.height);
        // Utils.floodFill(overlayCtx, imageData.data, this.mouse);
        // Utils.dilateMask(imageData.data, buffer.canvas.width, buffer.canvas.height);
        // buffer.putImageData(imageData, 0, 0);
        // ctx.globalCompositeOperation = "source-over";
        // ctx.drawImage(buffer.canvas, 0, 0);       
    }
}