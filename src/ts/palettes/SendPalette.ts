import {Palette} from "./Palette";
import {imageStorage} from "../storage/ImageStorage";
import localforage from "localforage";

export default class SendPalette extends Palette {

    constructor(id: string) {
        super(id, [], true);
        this.selectedIndex = 0;
        this.addRecipients();
    }

    private async addRecipients() {
        const userId = await localforage.getItem<string>("user-id") ?? "";
        const receipients = ["Andreas", "Juri", "Jutta", "Lila"].filter(x => x != userId);

        for (let receipient of receipients) {
            this.addOption(receipient);
        }
    }

    async updateOptionElement(element: HTMLDivElement, receipient: string) {
        element.innerText = receipient;
    }

    updateSelectedOptionElement(element: HTMLDivElement, option: any) {
        element.innerHTML = '<i class="fas fa-paper-plane"></i>';
        element.classList.toggle('hidden', this._options.length == 0);
    }
}