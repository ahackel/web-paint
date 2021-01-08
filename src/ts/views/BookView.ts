import {View} from "./View";
import {config} from "../config";
import Thumbnail from "./Thumbnail";


export default class BookView extends View {

    public onImageSelected: Function | undefined;
    private _thumbnails: Thumbnail[]; 

    show(): void {
        super.show();
        this.createImages();
    }

    private createImages() {
        if (this._thumbnails){
            return;
        }
        
        this._thumbnails = [];
        
        for (let sheet of config.sheets) {
            let thumbnail = new Thumbnail(this._element, sheet.id, (id: string) => this.onImageSelected(id))
            this._thumbnails.push(thumbnail);
        }
    }
}
