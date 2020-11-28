import {View} from "./views/View";
import BookView from "./views/BookView";
import PaintView from "./views/PaintView";

class App {
    private activeView: View;
    private bookView: BookView;
    private paintView: PaintView;

    constructor() {
        App.preventOverScroll();

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
        
        this.openView(this.bookView);
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
