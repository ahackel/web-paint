interface IImageConfig{
    overlay: string;
}

interface IAppConfig{
    debug: boolean;
    doubleTapDelay: number;
    longClickDelay: number;
    minScrollDistance: number;
    maxScrollDelay: number;
    maxShapeCount: number;
    usePointerEvents: boolean;
    fullScreenCanvas: boolean;
    pixelPerfect: boolean;
    imageSmoothing: boolean;
    useAutoMask: boolean;
    maxUndoSteps: number;
    saveInterval: number;
    width: number;
    height: number;
    imageCount: number;
    useHtmlLog: boolean;
}

export const config: IAppConfig = {
    debug: true,
    doubleTapDelay: 400,
    longClickDelay: 1000,
    minScrollDistance: 30,
    maxScrollDelay: 500,
    maxShapeCount: 64,
    usePointerEvents: true,
    fullScreenCanvas: true, // If true fills the whole screen with the canvas, if false makes sure the whole canvas fits on the screen
    pixelPerfect: false,   // Make sure to perform painting operations on rounded pixel positions
    imageSmoothing: true,  // Whether to use smooth pixel filtering or to draw hard pixel edges
    useAutoMask: false,
    maxUndoSteps: 10,
    saveInterval: 5000,
    width: 1024,
    height: 768,
    imageCount: 32,
    useHtmlLog: true
};