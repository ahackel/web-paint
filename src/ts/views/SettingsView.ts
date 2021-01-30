import {View} from "./View";
import Utils from "../utils/Utils";
import ImageStorage from "../storage/ImageStorage";
const version = require('/package').version;

export default class SettingsView extends View {
    
    constructor(id: string, onBackClicked: Function) {
        super(id);
        let backButton = <HTMLDivElement>this._element.getElementsByClassName("button back")[0];
        Utils.addClick(backButton, () => onBackClicked());

        let exportButton = <HTMLDivElement>this._element.getElementsByClassName("button export")[0];
        Utils.addClick(exportButton, async () => Utils.download(await ImageStorage.generateBackupArchive()));

        let importButton = <HTMLDivElement>this._element.getElementsByClassName("button import")[0];
        Utils.addClick(importButton, async () => {
            ImageStorage.importBackupArchive(await Utils.upload(".zip"));
            this.updateInfo();
        });

        let clearButton = <HTMLDivElement>this._element.getElementsByClassName("button clear")[0];
        Utils.addClick(clearButton, () => {
            if (confirm("Really clear all iamges?")){
                ImageStorage.clear();
                location.reload();
            }
        });
    }
    
    show(){
        super.show();
        this.updateInfo();
    }

    private updateInfo() {
        const info = <HTMLParagraphElement>document.getElementById("info");
        info.innerText = `Version: ${version}`;
        ImageStorage.getStorageUsed().then(amount => {
            info.innerText += `\nStorage used: ${Utils.formatBytes(amount, 1)}`;
        });
    }
}
