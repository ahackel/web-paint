import Tool from "./Tool";
import Utils from "../utils/Utils";

// Fills an area with the selected color 
export default class PaintBucketTool extends Tool{
    down() {
        let ctx = this.painter.ctx;
        Utils.floodFill(ctx, this.mouse, <string>this.painter.color);
    }
}