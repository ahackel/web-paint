import {Palette} from "./Palette";
import {imageStorage} from "../storage/ImageStorage";

export default class ShapePalette extends Palette {

    private _shapeIds: { [id : string] : string };
    
    get stamp() { return this.selectedOption }
    
    constructor(id: string) {
        super(id, [], true);
        this._shapeIds = {};
        this.selectedIndex = 0;
        this.addShapes();

        imageStorage.addChangeListener((change: string, id: string) => {
            if (change == "save" && id.startsWith("user/shapes/")) {
                this.addShape(id);
            }
        });
    }

    private async addShapes() {
        const shapesPaths = await imageStorage.listFolder("user/shapes");
        for (let path of shapesPaths) {
            await this.addShape(path);
        }
    }

    private async addShape(path: string) {
        const url = await imageStorage.loadImageUrl(path);
        this._shapeIds[url] = path;
        this.addOption(url);
    }

    protected optionLongClicked(event: TouchEvent, option: any, index: number) {
        this.deleteShape(index);
    }

    updateOptionElement(element: HTMLDivElement, option: string) {
        element.style.backgroundImage = `url("${option}")`;
    }

    updateSelectedOptionElement(element: HTMLDivElement, option: any) {
        element.innerHTML = '<i class="fas fa-shapes"></i>';
    }

    private deleteShape(index: number) {
        let option = this._options[index];
        let stampId = this._shapeIds[option];
        if (!stampId){
            return;
        }
        imageStorage.deleteImage(stampId)
            .then(() => {
                delete this._shapeIds[option];
                this.removeOption(index);
                if (this.selectedIndex == index){
                    // select the following item that now has the same index
                    this.selectedIndex = index;
                }
            })
    }
}