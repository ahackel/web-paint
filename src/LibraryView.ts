import {config, IBook} from "./config";
import {View} from "./View";

export default class LibraryView extends View {

    public onBookSelected: Function | undefined;

    constructor(id: string) {
        super(id);
        this._element = <HTMLElement>document.getElementById(id);
        this.addBooks();
    }

    private addBooks() {
        for (let book of config.books) {
            this.addBook(book);
        }
    }

    private addBook(book: IBook) {
        const div = document.createElement("div");
        div.classList.add("book");
        div.innerText = book.name;
        div.addEventListener("click", event => {
            if (this.onBookSelected)
                this.onBookSelected(book);
        });
        this._element.appendChild(div);
    }
}