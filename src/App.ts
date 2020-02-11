import Painter from "./Painter";
import ColorPalette from "./ColorPalette";
import PenTool from "./Tools/PenTool";
import PaintBucketTool from "./Tools/PaintBucketTool";
import CrayonTool from "./Tools/CrayonTool";
import BookView from "./BookView";
import Toolbar from "./Toolbar";
import ImageStorage from "./ImageStorage";
import EraserTool from "./Tools/EraserTool";
import ImageMeta from "./ImageMeta";
import LibraryView from "./LibraryView";
import {IBook} from "./config";
import {View} from "./View";

class App {
    private activeView: View;
    private bookView: BookView;
    private libraryView: LibraryView;

    private painter: Painter;
    private toolbar: Toolbar;
    private colorPalette: ColorPalette;
    private penTool: PenTool;
    private crayonTool: CrayonTool;
    private paintBucketTool: PaintBucketTool;
    private eraserTool: EraserTool;

    constructor() {
        this.libraryView = new LibraryView("library");
        this.libraryView.onBookSelected = (book: IBook) => this.openBook(book);
        this.activeView = this.libraryView;

        this.bookView = new BookView("gallery");
        this.bookView.onImageSelected = (image: HTMLImageElement, event: MouseEvent) =>
            event.shiftKey ?
                this.createNewImage(image) :
                this.loadImage(image)
        this.bookView.onNewImage = () => this.createNewImage()
        this.bookView.onDeleteImage = (image: HTMLImageElement) => this.deleteImage(image)

        this.painter = new Painter(<HTMLElement>document.getElementById("layers"));
        this.painter.lineWidth = 10;
        this.painter.strokeFinished = () => this.saveImage()

        this.penTool = new PenTool(this.painter);
        this.crayonTool = new CrayonTool(this.painter);
        this.paintBucketTool = new PaintBucketTool(this.painter);
        this.eraserTool = new EraserTool(this.painter);

        this.painter.currentTool = this.penTool;

        this.toolbar = new Toolbar("toolbar");
        this.toolbar.addToolButton("✏️", () => this.painter.currentTool = this.penTool);
        this.toolbar.addToolButton("🖍", () => this.painter.currentTool = this.crayonTool);
        this.toolbar.addToolButton("🖌️", () => this.painter.currentTool = this.paintBucketTool);
        this.toolbar.addToolButton("🧽", () => this.painter.currentTool = this.eraserTool);
        this.toolbar.addActionButton("🧻", (event: MouseEvent) => {
            this.painter.clear(event.altKey);
            this.saveImage();
        });

        this.colorPalette = new ColorPalette("color-palette");
        this.colorPalette.selectionChanged = () => this.painter.strokeStyle = this.colorPalette.selectedColor
    }

    openView(view: View){
        this.activeView.hide();
        this.activeView = view;
        this.activeView.show();
    }

    saveImage(){
        this.painter.saveImage();
    }

    private loadImage(image: HTMLImageElement) {
        this.painter.loadOrCreateImage(image.id)
            .then(() => this.bookView.hide())
            .catch(() => console.error(`Could not load image '${image.id}'`))
    }

    private createNewImage(overlay?: HTMLImageElement) {
        let meta = new ImageMeta();
        meta.overlay = overlay ? overlay.id : "";
        this.bookView.hide();
        this.painter.newImage(meta);
    }

    private deleteImage(image: HTMLImageElement) {
        ImageStorage.deleteImage(image.id);
    }

    private openBook(book: IBook) {
        this.openView(this.bookView);
        this.bookView.loadBook(book);
    }
}

let app = new App();
// @ts-ignore
globalThis.app = app;
