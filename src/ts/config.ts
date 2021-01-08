import spirit from "url:../img/overlays/spirit.png";
import spirit2 from "url:../img/overlays/spirit2.png";
import spirit3 from "url:../img/overlays/spirit3.png";
import santa from "url:../img/overlays/santa.png";

export const config = {
    debug: false,
    fullScreenCanvas: true, // If true fills the whole screen with the canvas, if false makes sure the whole canvas fits on the screen
    pixelPerfect: false,   // Make sure to perform painting operations on rounded pixel positions
    imageSmoothing: true,  // Whether to use smooth pixel filtering or to draw hard pixel edges
    width: 1024,
    height: 768,
    sheets:[
        {
            id: "image01",
            overlay: spirit
        },
        {
            id: "image02",
            overlay: spirit2
        },
        {
            id: "image03",
            overlay: spirit3
        },
        {
            id: "image04",
            overlay: santa
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