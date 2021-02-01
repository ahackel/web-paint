import {View} from "./View";
import * as Utils from "../utils/Utils";
import {imageStorage} from "../storage/imageStorage";
const version = require('/package').version;
var ConsoleLogHTML = require('console-log-html');
import { saveAs } from 'file-saver';

export default class SettingsView extends View {
    
    constructor(id: string, onBackClicked: Function) {
        super(id);
        let backButton = <HTMLDivElement>this._element.getElementsByClassName("button back")[0];
        Utils.addClick(backButton, () => onBackClicked());

        let exportButton = <HTMLDivElement>this._element.getElementsByClassName("button export")[0];
        Utils.addClick(exportButton, async () => {
            const zipBlob = await imageStorage.generateBackupArchive();
            saveAs(zipBlob, "web-paint-backup.zip");
        });

        let importButton = <HTMLDivElement>this._element.getElementsByClassName("button import")[0];
        Utils.addClick(importButton, async () => {
            imageStorage.importBackupArchive(await Utils.upload(".zip"));
            this.updateInfo();
        });

        let clearButton = <HTMLDivElement>this._element.getElementsByClassName("button clear")[0];
        Utils.addClick(clearButton, () => {
            if (confirm("Really clear all iamges?")){
                imageStorage.clear();
                location.reload();
            }
        });

        ConsoleLogHTML.connect(document.getElementById("log"), {}, true, true, true);
    }
    
    show(){
        super.show();
        this.updateInfo();
    }

    private updateInfo() {
        const info = <HTMLParagraphElement>document.getElementById("info");
        info.innerText = `Version: ${version}`;
        imageStorage.getStorageUsed().then(amount => {
            info.innerText += `\rStorage used: ${Utils.formatBytes(amount, 1)}`;
        });
    }
}
