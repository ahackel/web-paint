import Tool from "./Tool";
import Utils from "../Utils";

export default class PaintBucketTool extends Tool{

    down() {
        let ctx = this.painter.ctx;
        Utils.floodFill(ctx, this.mouse, <string>this.painter.strokeStyle);
    }

    move() {
    }

    up() {
    }

}