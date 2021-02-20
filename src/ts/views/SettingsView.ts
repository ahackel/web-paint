import {View} from "./View";
import * as Utils from "../utils/Utils";
import {imageStorage} from "../storage/ImageStorage";
const version = "1.0.0" //require('/package').version;
var ConsoleLogHTML = require('console-log-html');
import { saveAs } from 'file-saver';
import {server} from "../storage/Server";
import {dropboxStorage} from "../storage/DropboxStorage";
import {config} from "../config";

export default class SettingsView extends View {
    
    private _hostElement: HTMLInputElement;
    private _userIdElement: HTMLInputElement;
    private _connectButton: HTMLDivElement;
    private _disconnectButton: HTMLDivElement;
    private _syncButton: HTMLDivElement;
    
    constructor(id: string, onBackClicked: Function) {
        super(id);
        let backButton = this._element.querySelector<HTMLDivElement>(".button.back");
        Utils.addClick(backButton, () => onBackClicked());

        this._hostElement = this._element.querySelector<HTMLInputElement>("#server-url");
        this._hostElement.onblur = () => server.host = this._hostElement.value;
        
        this._userIdElement = this._element.querySelector<HTMLInputElement>("#user-id");
        this._userIdElement.onblur = () => dropboxStorage.userId = this._userIdElement.value;

        this._connectButton = this._element.querySelector<HTMLDivElement>(".button.connect");
        Utils.addClick(this._connectButton, () => {
            location.href = dropboxStorage.getAuthenticationUrl();
        });

        this._disconnectButton = this._element.querySelector<HTMLDivElement>(".button.disconnect");
        Utils.addClick(this._disconnectButton, () => {
            dropboxStorage.unauthorize();
            this.updateButtons();
        });

        this._syncButton = this._element.querySelector<HTMLDivElement>(".button.sync");
        Utils.addClick(this._syncButton, async () => {
            dropboxStorage.toggleSync();
            this.updateButtons();
        });

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
            if (confirm("Really clear all images?")){
                imageStorage.clear();
                location.reload();
            }
        });

        if (config.useHtmlLog){
            ConsoleLogHTML.connect(document.getElementById("log"), {}, true, true, true);
        }
    }

    private updateButtons() {
        this._connectButton.classList.toggle('hidden', dropboxStorage.isAuthorized);
        this._disconnectButton.classList.toggle('hidden', !dropboxStorage.isAuthorized);
        this._syncButton.classList.toggle("disabled", !dropboxStorage.isAuthorized);
        this._syncButton.innerHTML = '<i class="fas fa-sync fa-fw"></i> ' + (dropboxStorage.isSyncing ? "Stop Sync" : "Start Sync");
    }

    show(){
        super.show();
        this.updateInfo();
        this.updateButtons();
    }

    private updateInfo() {
        const info = <HTMLParagraphElement>document.getElementById("info");
        info.innerText = `Version: ${version}`;
        imageStorage.getStorageUsed().then(amount => {
            info.innerText += `\rStorage used: ${Utils.formatBytes(amount, 1)}`;
        });

        this._hostElement.value = server.host;
        this._userIdElement.value = dropboxStorage.userId;
    }
}
