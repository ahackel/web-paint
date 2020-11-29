import {View} from "./View";
import {config} from "../config";
import Utils from "../utils/Utils";
import ImageStorage from "../storage/ImageStorage";

export default class DropboxAuthView extends View {

    constructor(id: string) {
        super(id);
        if (!ImageStorage.adapter.isAuthenticated){
            let button = <HTMLAnchorElement>document.getElementById("dropbox-button");
            button.href = ImageStorage.adapter.getAuthentificationLink();
        }
    }
}
