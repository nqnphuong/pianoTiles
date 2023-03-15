import { Sprite, Graphics } from "pixi.js";
import { GAME_WIDTH, LINE_WIDTH, NOTE_HEIGHT, NOTE_WIDTH, NUMBER_OF_NOTES, POSY_APPEAR_NOTE } from "../../constants";


export class NoteMng extends Sprite {
    constructor() {
        super();
    }

    createOneNote(heightOfNote){ 
        //hei là độ dài note
        this.note = new Graphics();
        this.note.beginFill(0x000000);
        this.note.drawRect(LINE_WIDTH, 0, NOTE_WIDTH, NOTE_HEIGHT * heightOfNote);
        this.addChild(this.note);
    }

    createOneRow(notesInRow) {
        //param: array
        //tại thời điểm 1 note được tạo ra, thời điểm đó là lúc y += NOTE_HEIGHT
        //param là số note 1 hàng được tạo ra
        //tham số này có độ dài note
        //input = [1,0,1,0]
        this.noteOneRow = new Sprite();
        for (let i = 0; i < NUMBER_OF_NOTES; i++) {
            if (notesInRow[i] != 0) { // kiểm tra tồn tại
                this.createOneNote(notesInRow[i]);
                if (i + 1 === 1) this.note.x = 0;
                else this.note.x = GAME_WIDTH / 4 * i;
                this.note.y = - NOTE_HEIGHT * notesInRow[i] + POSY_APPEAR_NOTE;
                this.noteOneRow.addChild(this.note);
            }
        }
        this.addChild(this.noteOneRow);
    }

    update(delta) {
        this.noteOneRow.y += 3;
        // if (this.noteOneRow.y > POSY_APPEAR_NOTE ){
        //     this.createOneRow([0,0,1,0]);
        // }
    }
}