import Tool from "./Tool";
import PainterUtils from "../PainterUtils";

export default class PaintBucketTool extends Tool{

    down() {
        let ctx = this.painter.ctx;
        PainterUtils.floodFill(ctx, this.mouse, <string>this.painter.strokeStyle);
    }

    move() {
    }

    up() {
    }

}