import Tool from "./Tool";
import PainterUtils from "../PainterUtils";

export default class PaintBucketTool extends Tool{

    down() {
        let maskCtx = this.painter.getLayer(-1);
        let ctx0 = this.painter.getLayer(0);

        if (this.painter.overlay){
            maskCtx.drawImage(this.painter.overlay, 0, 0, this.painter.width, this.painter.height);
            PainterUtils.floodFill(maskCtx, maskCtx, this.mouse);
        }
        else
        {
            maskCtx.fillStyle = "white";
            maskCtx.fillRect(0, 0, this.painter.width, this.painter.height);
        }

        maskCtx.fillStyle = this.painter.strokeStyle;
        maskCtx.globalCompositeOperation = "source-atop";
        maskCtx.fillRect(0, 0, this.painter.width, this.painter.height);
        maskCtx.globalCompositeOperation = "source-over";
        this.painter.applyOverlay(maskCtx);
        ctx0.drawImage(maskCtx.canvas, 0, 0);
        maskCtx.clearRect(0, 0, this.painter.width, this.painter.height);
    }

    move() {
    }

    up() {
    }

}