import { utils } from "pixi.js";


export const MEvent = Object.freeze({
    MClick: "MEvent:click"
})

export class Mouse extends utils.EventEmitter {

    static instance;

    static init() {
        this.instance = new Mouse();
    }

    constructor(){
        super();
        this.handle();
    }

    handle() {
        window.addEventListener("click", (e) => this.clickListener(e), false);
    }

    clickListener(e) {
        this.emit(MEvent.MClick, e)
    }
 
    unsubscribe() {
        window.removeEventListener("click", this.clickListener);
    }
}