import Peer from "peerjs";
import localforage from "localforage";

export default class PeerToPeer {

    public onDataReceived: Function | undefined;
    public get peerList(): string[] { return this._peerList; }
    public set peerList(value: string[]) {
        this._peerList = value;
        localforage.setItem('peer-list', value);
        if (this._peer){
            this.logout();
            this.login();
        }
    }
    public get loggedIn(): boolean { return this._peer != null; }
    
    public static instance: PeerToPeer;
    
    private _peer: Peer;
    private _peerList: string[];

    static createInstance(){
        if (!PeerToPeer.instance){
            PeerToPeer.instance = new PeerToPeer();
        }
    }
    
    private constructor() {
        localforage.getItem('peer-list')
            .then((peerList: string[]) => {
                this._peerList = peerList || [];
                this.login();
            })
    }
    
    private getId(peerName: string): string{
        return peerName + "-web-paint-user";
    }

    private login() {
        if (!this._peerList || this._peerList.length < 1){
            return;
        }
        
        // local server
        // this._peer = new Peer(id + idSuffix, {host: "192.168.178.20", port: 9000});
        let id = this.getId(this._peerList[0]);
        this._peer = new Peer(id, {debug: 3});

        this._peer.on('open', function (id) {
            console.log('Logged in as: ' + id);
        });

        this._peer.on('error', function (err) {
            console.log('peerjs error: ' + err);
        });

        this._peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                if (this.onDataReceived) {
                    this.onDataReceived(data);
                }
            });
        });
    }
    
    private logout(){
        this._peer.destroy();
    }

    sendData(peerName: string, data: any){
        const connection = this._peer.connect(this.getId(peerName));
        connection.on('open', () => {
            connection.send(data);
            //connection.close();
        });
    }
}