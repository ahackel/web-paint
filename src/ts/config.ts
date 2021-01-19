const defaultShapes = [
    "img/stamps/star.png",
    "img/stamps/unicorn.png",
    "img/stamps/snowman.png",
    "img/stamps/dolphin.png",
    "img/stamps/snail.png"
]

export const config = {
    debug: false,
    doubleTapDelay: 400,
    longClickDelay: 1200,
    maxShapeCount: 64 - defaultShapes.length,
    fullScreenCanvas: true, // If true fills the whole screen with the canvas, if false makes sure the whole canvas fits on the screen
    pixelPerfect: false,   // Make sure to perform painting operations on rounded pixel positions
    imageSmoothing: true,  // Whether to use smooth pixel filtering or to draw hard pixel edges
    width: 1024,
    height: 768,
    defaultShapes: defaultShapes,
    sheets:[
        {
            id: "image01",
            overlay: "./img/overlays/spirit.png"
        },
        {
            id: "image02",
            overlay: "./img/overlays/spirit2.png"
        },
        {
            id: "image03",
            overlay: "./img/overlays/spirit3.png"
        },
        {
            id: "image04",
            overlay: "./img/overlays/santa.png"
        },
        {
            id: "image05"
        },
        {
            id: "image06"
        },
        {
            id: "image07"
        },
        {
            id: "image08"
        },
        {
            id: "image09"
        },
        {
            id: "image10"
        },
        {
            id: "image11"
        },
        {
            id: "image12"
        },
        {
            id: "image13"
        },
        {
            id: "image14"
        },
        {
            id: "image15"
        },
        {
            id: "image16"
        }
    ]
};