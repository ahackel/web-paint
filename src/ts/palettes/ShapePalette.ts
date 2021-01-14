import {Palette} from "./Palette";
import ImageStorage from "../storage/ImageStorage";

export default class ShapePalette extends Palette {

    private _shapeIds: { [id : string] : string };
    
    get stamp() { return this.selectedOption }
    
    constructor(id: string) {
        let shapeUrls: string[] = [
            "img/stamps/star.png",
            "img/stamps/unicorn.png",
            "img/stamps/snowman.png",
            "img/stamps/dolphin.png",
            "img/stamps/snail.png"
        ];

        super(id, shapeUrls, true);
        this._shapeIds = {};
        this.selectedIndex = 0;

        ImageStorage.keys()
            .then((keys: string[]) => {
                const shapesIds = keys.filter(x => x.startsWith("Shape"));
                for (let shapeId of shapesIds) {
                    this.addShapeFromImageId(shapeId);
                }
            });

        this._element.addEventListener("imagesaved", (event: CustomEvent) => {
            const id = <string>event.detail;
            if (id.startsWith("Shape")) {
                this.addShapeFromImageId(id);
            }
        });
    }

    private addShapeFromImageId(stampId: string) {
        ImageStorage.loadBlob(stampId)
            .then(blob => {
                const url = URL.createObjectURL(blob);
                this._shapeIds[url] = stampId;
                this.addOption(url);
            })
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
        ImageStorage.deleteImage(stampId)
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