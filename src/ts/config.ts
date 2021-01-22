const defaultShapes = [
    "img/stamps/star.png",
    "img/stamps/unicorn.png",
    "img/stamps/snowman.png",
    "img/stamps/dolphin.png",
    "img/stamps/snail.png"
]

interface IImageConfig{
    overlay: string;
}

interface  IAppConfig{
    debug: boolean;
    doubleTapDelay: number;
    longClickDelay: number;
    minScrollDistance: number;
    maxScrollDelay: number;
    maxShapeCount: number;
    fullScreenCanvas: boolean;
    pixelPerfect: boolean;
    imageSmoothing: boolean;
    useAutoMask: boolean;
    maxUndoSteps: number;
    saveInterval: number;
    width: number;
    height: number;
    defaultShapes: string[];
    imageCount: number;
    images: { [id: string]: IImageConfig };
}

export const config: IAppConfig = {
    debug: false,
    doubleTapDelay: 400,
    longClickDelay: 1000,
    minScrollDistance: 30,
    maxScrollDelay: 500,
    maxShapeCount: 64 - defaultShapes.length,
    fullScreenCanvas: true, // If true fills the whole screen with the canvas, if false makes sure the whole canvas fits on the screen
    pixelPerfect: false,   // Make sure to perform painting operations on rounded pixel positions
    imageSmoothing: true,  // Whether to use smooth pixel filtering or to draw hard pixel edges
    useAutoMask: false,
    maxUndoSteps: 10,
    saveInterval: 5000,
    width: 1024,
    height: 768,
    defaultShapes: defaultShapes,
    imageCount: 32,
    images: {
        "image01": {overlay: "./img/overlays/spirit.png"},
        "image02": {overlay: "./img/overlays/spirit2.png"},
        "image03": {overlay: "./img/overlays/spirit3.png"},
        "image04": {overlay: "./img/overlays/santa.png"}
    }
};