export interface IPage {
    overlay: string;
    id: string;
    underlay: string;
}

export interface IBook {
    name: string
    pages: IPage[];
}

export const config = {
    books: [
        {
            name: "Book1",
            pages: [
                {
                    id: "b001-p001",
                    overlay: "img/lines.png",
                    underlay: ""
                },
                {
                    id: "b001-p002",
                    overlay: "",
                    underlay: ""
                }
            ]
        }
    ]
};