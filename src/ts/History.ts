import {config} from "./config";

export class History {
    
    private _states: ImageData[] = [];
    private _position: number = -1; 
    
    get canUndo() { return this._position > 0 }
    get canRedo() { return this._position < this._states.length - 1 }
    
    recordState(data: ImageData){
        if (this._position == config.maxUndoSteps - 1){
            this._states.shift();
            this._position--;
        }

        // remove all future steps
        this._states.splice(this._position + 1, this._states.length - this._position + 1);

        this._position++;
        this._states[this._position] = data;
    }

    undo(): ImageData{
        if (!this.canUndo){
            return null;
        }

        this._position--;
        return this._states[this._position];
    }

    redo(): ImageData{
        if (!this.canRedo){
            return null;
        }

        this._position++;
        return this._states[this._position];
    }
    
    getCurrentState(): ImageData{
        return this._position > -1 && this._position < this._states.length ? this._states[this._position] : null;
    }

    clear(){
        this._states = [];
        this._position = -1;
    }
}