import {View} from "./View";
import {config} from "../config";
import * as Utils from "../utils/Utils";
import {imageStorage} from "../storage/ImageStorage";

export default class DropboxAuthView extends View {

    constructor(id: string) {
        super(id);
        // if (!imageStorage.adapter.isAuthenticated){
        //     let button = <HTMLAnchorElement>document.getElementById("dropbox-button");
        //     button.href = imageStorage.adapter.getAuthentificationLink();
        // }
    }
}
