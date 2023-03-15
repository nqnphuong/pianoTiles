import { utils } from "pixi.js";


export const MEvent = Object.freeze({
    MDown: "MEvent:mousedown",
    MUp: "MEvent:mouseup",
    MMove: "MEvent:mousemove"
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
        window.addEventListener("mousedown", (e) => this.mouseDownListener(e), false);
        window.addEventListener("mouseup", (e) => this.mouseUpListener(e), false);
        window.addEventListener("mousemove", (e) => this.mouseMoveListener(e), false);
    }

    mouseDownListener(e) {
        this.emit(MEvent.MDown, e)
    }

    mouseUpListener(e) {
        this.emit(MEvent.MUp, e)
    }

    mouseMoveListener(e) {
        this.emit(MEvent.MMove, e)
    }
}