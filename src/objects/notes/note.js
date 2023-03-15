import { Sprite, Graphics } from "pixi.js";
import { GAME_WIDTH, LINE_WIDTH, NOTE_HEIGHT, NOTE_WIDTH } from "../../constants";


export class Note extends Sprite{
    constructor(){
        super();
    }

    create(heightOfNote, lineNumber){ 
        //hei là độ dài note
        //lineNumber là số line note đó xuất hiện
        this.note = new Graphics();
        this.note.beginFill(0x000000);
        this.note.drawRect(LINE_WIDTH, 0, NOTE_WIDTH, NOTE_HEIGHT * heightOfNote);
        if (lineNumber === 1) {
            this.note.x = 0;
        } else {
            this.note.x = GAME_WIDTH / 4 * (lineNumber - 1);
        }
        this.note.y = 0;
        this.addChild(this.note);
    }
}