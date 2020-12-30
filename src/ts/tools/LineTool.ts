import ShapeToolBase from "./ShapeToolBase";

// Fills an area with the selected color 
export default class LineTool extends ShapeToolBase{
    
    drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number){
        ctx.beginPath();
        ctx.moveTo(this._startPosition.x, this._startPosition.y);  
        ctx.lineTo(this.mouse.x, this.mouse.y);  
        ctx.stroke();
    }
}