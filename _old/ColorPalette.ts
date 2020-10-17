export default class ColorPalette {
    get selectedColor(): string {
        return this.colors[this._selectedIndex];
    }

    set selectedIndex(value: number) {
        this._swatches[this._selectedIndex].classList.remove("selected");
        this._selectedIndex = value;
        this._swatches[this._selectedIndex].classList.add("selected");
        if (this.selectionChanged){
            this.selectionChanged();
        }
    }

    public selectionChanged: Function | undefined;

    private _selectedIndex: number = 0;
    private container: HTMLElement;
    private _swatches: HTMLDivElement[];

    // http://alumni.media.mit.edu/~wad/color/palette.html
    private colors: string[] = [
        "#000000",
        "#575757",
        "#ad2323",
        "#2a4bd7",
        "#1d6914",
        "#814619",
        "#8126c0",
        "#a0a0a0",
        "#81c57a",
        "#9dafff",
        "#29d0d0",
        "#ff9233",
        "#ffee33",
        "#e9debb",
        "#ffcdf3",
        "#ffffff",
    ];

    constructor(id: string) {
        this.container = <HTMLElement>document.getElementById(id);
        this._swatches = [];

        for (let i = 0; i < this.colors.length; i++){
            let color = this.colors[i];
            let swatch = document.createElement("div");
            swatch.style.backgroundColor = color;
            swatch.addEventListener("click", () => {
                this.selectedIndex = i;
            });
            this.container.appendChild(swatch);
            this._swatches[i] = swatch;
        }

        this.selectedIndex = 0;
    }
}