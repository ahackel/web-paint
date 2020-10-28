// import Painter from "./_old/Painter";
// import ColorPalette from "./_old/ColorPalette";
// import PenTool from "./_old/Tools/PenTool";
// import PaintBucketTool from "./_old/Tools/PaintBucketTool";
// import CrayonTool from "./_old/Tools/CrayonTool";
import BookView from "./ts/BookView";
import PaintView from "./ts/PaintView";
// import Toolbar from "./_old/Toolbar";
// import ImageStorage from "./_old/ImageStorage";
// import EraserTool from "./_old/Tools/EraserTool";
// import ImageMeta from "./_old/ImageMeta";
// import LibraryView from "./_old/LibraryView";
// import {IBook} from "./_old/config";
import {View} from "./ts/View";

class App {
    private activeView: View;
    private bookView: BookView;
    private paintView: PaintView;
    // private libraryView: LibraryView;
    //
    // private painter: Painter;
    // private toolbar: Toolbar;
    // private colorPalette: ColorPalette;
    // private penTool: PenTool;
    // private crayonTool: CrayonTool;
    // private paintBucketTool: PaintBucketTool;
    // private eraserTool: EraserTool;

    constructor() {
        // this.libraryView = new LibraryView("library");
        // this.libraryView.onBookSelected = (book: IBook) => this.openBook(book);
        // this.activeView = this.libraryView;
        //
        this.preventOverScroll();

        this.bookView = new BookView("book");
        this.bookView.onImageSelected = (id: string) => {
            this.paintView.loadImage(id)
                .then(() => {
                    this.openView(this.paintView);
                });
        }
        
        // this.bookView.onDeleteImage = (image: HTMLImageElement) => this.deleteImage(image)

        this.paintView = new PaintView("paint",() => {
            this.openView(this.bookView);
        });

        //
        // this.painter = new Painter(<HTMLElement>document.getElementById("layers"));
        // this.painter.lineWidth = 10;
        // this.painter.strokeFinished = () => this.saveImage()
        //
        // this.penTool = new PenTool(this.painter);
        // this.crayonTool = new CrayonTool(this.painter);
        // this.paintBucketTool = new PaintBucketTool(this.painter);
        // this.eraserTool = new EraserTool(this.painter);
        //
        // this.painter.currentTool = this.penTool;
        //
        // this.toolbar = new Toolbar("toolbar");
        // this.toolbar.addToolButton("✏️", () => this.painter.currentTool = this.penTool);
        // this.toolbar.addToolButton("🖍", () => this.painter.currentTool = this.crayonTool);
        // this.toolbar.addToolButton("🖌️", () => this.painter.currentTool = this.paintBucketTool);
        // this.toolbar.addToolButton("🧽", () => this.painter.currentTool = this.eraserTool);
        // this.toolbar.addActionButton("🧻", (event: MouseEvent) => {
        //     this.painter.clear(event.altKey);
        //     this.saveImage();
        // });
        //
        // this.colorPalette = new ColorPalette("color-palette");
        // this.colorPalette.selectionChanged = () => this.painter.strokeStyle = this.colorPalette.selectedColor
        this.openView(this.bookView);
    }

    private preventOverScroll() {
        document.ontouchmove = event => { event.preventDefault();}
    }

    openView(view: View){
        if (this.activeView){
            this.activeView.hide();
        }
        this.activeView = view;
        this.activeView.show();
    }
    //
    // saveImage(){
    //     this.painter.saveImage();
    // }
    //
    // private loadImage(image: HTMLImageElement) {
    //     this.painter.loadOrCreateImage(image.id)
    //         .then(() => this.bookView.hide())
    //         .catch(() => console.error(`Could not load image '${image.id}'`))
    // }
    //

    private createNewImage() {
        // this.openView(this.paintView)
        // this.painter.newImage(meta);
    }

    //
    // private deleteImage(image: HTMLImageElement) {
    //     ImageStorage.deleteImage(image.id);
    // }
    //
    // private openBook(book: IBook) {
    //     this.openView(this.bookView);
    //     this.bookView.loadBook(book);
    // }
}

let app = new App();
