import 'babel-polyfill';
import {View} from "./views/View";
import BookView from "./views/BookView";
import PaintView from "./views/PaintView";
import DropboxAuthView from "./views/DropboxAuthView";
import {config} from "./config";
import PeerToPeer from "./PeerToPeer";
import SettingsView from "./views/SettingsView";

class App {
    private _activeView: View;
    private _bookView: BookView;
    private _paintView: PaintView;
    private _settingsView: SettingsView;
    private dropboxAuthView: DropboxAuthView;
    private _sheet: HTMLElement;

    constructor() {
        App.preventOverScroll();
        
        //PeerToPeer.createInstance();
        
        this._sheet = document.getElementById("sheet")
        window.addEventListener('resize', event => {
            this.OnResize();
        });
        this.OnResize();
        
        this._bookView = new BookView("book", () => {
            this.openView(this._settingsView);
        });
        this._bookView.onImageSelected = (id: string) => {
            this._paintView.loadImage(id)
                .then(() => {
                    this.openView(this._paintView);
                });
        }

        this._paintView = new PaintView("paint",() => {
            this.openView(this._bookView);
        });

        this._settingsView = new SettingsView("settings",() => {
            this.openView(this._bookView);
        });

        // Dropbox integration is not working yet:
        // this.dropboxAuthView = new DropboxAuthView("dropbox-auth");
        // this.openView(ImageStorage.adapter.isAuthenticated ? this.bookView : this.dropboxAuthView);

        this.openView(this._bookView);
    }

    private OnResize() {
        const docWidth = document.documentElement.clientWidth;
        const docHeight = document.documentElement.clientHeight;
        
        const portrait = docWidth < docHeight;
        const isLargeScreen = docWidth > 1024;
        
        const viewWidth = Math.max(docWidth, docHeight);
        const viewHeight = Math.min(docWidth, docHeight);
        
        const horizontalPixelSize = viewWidth / config.width;
        const verticalPixelSize = viewHeight / config.height;
        
        const virtualPixelSize = config.fullScreenCanvas && !isLargeScreen ?
            Math.max(horizontalPixelSize, verticalPixelSize) :
            Math.min(horizontalPixelSize, verticalPixelSize);

        this._sheet.style.fontSize = `${virtualPixelSize}px`;
        this._sheet.style.left = `${portrait ? 0.5 * (docWidth - virtualPixelSize * config.width) : 0}px`;
    }

    private static preventOverScroll() {
        document.ontouchmove = event => { event.preventDefault();}
    }

    openView(view: View){
        if (this._activeView){
            this._activeView.hide();
        }
        this._activeView = view;
        this._activeView.show();
    }
}

// @ts-ignore
window.app = new App();
