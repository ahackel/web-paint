import ShapeToolBase from "./ShapeToolBase";

// Fills an area with the selected color 
export default class RectangleTool extends ShapeToolBase{
    
    drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number){
        ctx.beginPath();
        ctx.rect(x, y, width, height);    
        ctx.stroke();
    }
}