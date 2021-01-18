import {View} from "./View";
import Utils from "../utils/Utils";
import PeerToPeer from "../PeerToPeer";


export default class SettingsView extends View {
    private _peerList: HTMLTextAreaElement;
    
    constructor(id: string, onBackClicked: Function) {
        super(id);
        let backButton = <HTMLDivElement>this._element.getElementsByClassName("button back")[0];
        Utils.addFastClick(backButton, () => onBackClicked());
        
        this._peerList = <HTMLTextAreaElement>document.getElementById("peer-list");
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
