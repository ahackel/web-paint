import spirit from "url:../img/overlays/spirit.png";
import image01_overlay from "url:../img/image1_overlay.png";

export const config = {
    Debug: false,
    width: 1024,
    height: 768,
    pages:[
        {
            id: "image01",
            overlay: spirit
        },
        {
            id: "image02",
            overlay: image01_overlay
        },
        {
            id: "image03",
            overlay: image01_overlay
        },
        {
            id: "image04",
            overlay: image01_overlay
        }
    ]
};