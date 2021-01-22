import {View} from "./View";
import Utils from "../utils/Utils";
import PeerToPeer from "../PeerToPeer";
const version = require('/package').version;

export default class SettingsView extends View {
    private _peerList: HTMLTextAreaElement;
    
    constructor(id: string, onBackClicked: Function) {
        super(id);
        let backButton = <HTMLDivElement>this._element.getElementsByClassName("button back")[0];
        Utils.addClick(backButton, () => onBackClicked());

        this._peerList = <HTMLTextAreaElement>document.getElementById("peer-list");
        const info = <HTMLParagraphElement>document.getElementById("info");
        info.innerText =
            // @ts-ignore
`PeerJS browser: ${peerjs.util.browser}
Version: ${version}
`;
    }
    
    
    show(){
        super.show();
        this._peerList.value = PeerToPeer.instance.peerList.join("\n");
    }
    
    hide(){
        if (this._peerList){
            PeerToPeer.instance.peerList = this._peerList.value.split("\n");
        }
        super.hide();
    }
}
