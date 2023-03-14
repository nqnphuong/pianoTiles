import { utils } from "pixi.js";

export const TEvent = Object.freeze({
    TouchOn: "TEvent:touchend"
})

export class Touch extends utils.EventEmitter{

    static instance; 

    static init(){
        this.instance = new Touch();
    }

    constructor(){
        super();
        this.handle();
    }

    handle(){
        window.addEventListener("touchend", (e) => this.onTouchStart(e), false);
    }

    onTouchStart(e){
        this.emit(TEvent.TouchOn, e);
    }
    
}