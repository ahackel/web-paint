import {View} from "./views/View";
import BookView from "./views/BookView";
import PaintView from "./views/PaintView";
import ImageStorage from "./storage/ImageStorage";
import DropboxAuthView from "./views/DropboxAuthView";
import {config} from "./config";

class App {
    private activeView: View;
    private bookView: BookView;
    private paintView: PaintView;
    private dropboxAuthView: DropboxAuthView;
    private _sheet: HTMLElement;

    constructor() {
        App.preventOverScroll();
        
        this._sheet = document.getElementById("sheet")
        window.addEventListener('resize', event => {
            this.OnResize();
        });
        this.OnResize();
        
        this.bookView = new BookView("book");
        this.bookView.onImageSelected = (id: string) => {
            this.paintView.loadImage(id)
                .then(() => {
                    this.openView(this.paintView);
                });
        }

        this.paintView = new PaintView("paint",() => {
            this.openView(this.bookView);
        });


        // Dropbox integration is not working yet:
        // this.dropboxAuthView = new DropboxAuthView("dropbox-auth");
        // this.openView(ImageStorage.adapter.isAuthenticated ? this.bookView : this.dropboxAuthView);

        this.openView(this.bookView);
    }

    private OnResize() {
        let portrait = window.innerWidth < window.innerHeight;
        let windowWidth = Math.max(window.innerWidth, window.innerHeight);
        let windowHeight = Math.min(window.innerWidth, window.innerHeight);
        let virtualPixelSize = Math.min(windowWidth / config.width, windowHeight / config.height);
        this._sheet.style.fontSize = `${virtualPixelSize}px`;
        this._sheet.style.left = `${portrait ? 0.5 * (window.innerWidth - virtualPixelSize * config.width) : 0}px`;
    }

    private static preventOverScroll() {
        document.ontouchmove = event => { event.preventDefault();}
    }

    openView(view: View){
        if (this.activeView){
            this.activeView.hide();
        }
        this.activeView = view;
        this.activeView.show();
    }
}

let app = new App();
