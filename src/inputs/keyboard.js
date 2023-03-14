import { utils } from "pixi.js";


export const KBEvent = Object.freeze({
    KeyDown: "KBEvent:keydown",
    KeyUp: "KBEvent:keyup",
})

export class Keyboard extends utils.EventEmitter {

    static instance;

    static init() {
        this.instance = new Keyboard();
    }

    constructor(){
        super();
        this.handle();
    }

    handle() {
        window.addEventListener("keydown", (e) => this.downListener(e), false);
        window.addEventListener("keyup", (e) => this.upListener(e), false);
    }

    downListener(e) {
        this.emit(KBEvent.KeyDown, e)
    }

    upListener(e) {
        this.emit(KBEvent.KeyUp, e)
    }
 
    unsubscribe() {
        window.removeEventListener("keydown", this.downListener);
        window.removeEventListener("keyup", this.upListener);
    }
}