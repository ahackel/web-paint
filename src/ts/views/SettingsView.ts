import {View} from "./View";
import * as Utils from "../utils/Utils";
import {imageStorage} from "../storage/ImageStorage";
const version = "1.0.0" //require('/package').version;
var ConsoleLogHTML = require('console-log-html');
import { saveAs } from 'file-saver';
import localforage from "localforage";
import {server} from "../storage/Server";

export default class SettingsView extends View {
    
    private _hostElement: HTMLInputElement;
    private _userIdElement: HTMLInputElement;
    
    constructor(id: string, onBackClicked: Function) {
        super(id);
        let backButton = this._element.querySelector<HTMLDivElement>(".button.back");
        Utils.addClick(backButton, () => onBackClicked());

        this._hostElement = this._element.querySelector<HTMLInputElement>("#server-url");
        this._hostElement.onblur = () => server.host = this._hostElement.value;
        
        this._userIdElement = this._element.querySelector<HTMLInputElement>("#user-id");
        this._userIdElement.onblur = () => server.userId = this._userIdElement.value;
        
        let syncButton = this._element.querySelector<HTMLDivElement>(".button.sync");
        Utils.addClick(syncButton, async () => server.sync());

        let exportButton = this._element.querySelector<HTMLDivElement>(".button.export");
        Utils.addClick(exportButton, async () => {
            const zipBlob = await imageStorage.generateBackupArchive();
            saveAs(zipBlob, "web-paint-backup.zip");
        });

        let importButton = this._element.querySelector<HTMLDivElement>(".button.import");
        Utils.addClick(importButton, async () => {
            imageStorage.importBackupArchive(await Utils.upload(".zip"));
            this.updateInfo();
        });

        let clearButton = this._element.querySelector<HTMLDivElement>(".button.clear");
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

        this._hostElement.value = server.host;
        this._userIdElement.value = server.userId;
    }
}
