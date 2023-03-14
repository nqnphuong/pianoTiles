import { Graphics, Sprite } from "pixi.js";
import { GAME_WIDTH, LINE_WIDTH, NOTE_HEIGHT, NOTE_WIDTH, NUMBER_OF_NOTES } from "../constants";
import { KBEvent, Keyboard } from "../inputs/keyboard";
import { MEvent, Mouse } from "../inputs/mouse";
import { TEvent, Touch } from "../inputs/touch";

export class MusicNote extends Sprite{
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
        this.note.y = - NOTE_HEIGHT - NOTE_HEIGHT * (heightOfNote - 1);
        this.addChild(this.note);
    }
}

export class MusicNotes extends MusicNote{
    constructor(){
        super();
    }

    creates(notesInRow){ 
        //param: array
        //tại thời điểm 1 note được tạo ra, thời điểm đó là lúc y += NOTE_HEIGHT
        //param là số note 1 hàng được tạo ra
        //tham số này có độ dài note
        //input = [1,0,1,0]

        this.notes = new Sprite();
        let maxLength = Math.max(...notesInRow);
        for (let i = 0; i < NUMBER_OF_NOTES; i++){
            if(notesInRow[i] != 0){ // kiểm tra tồn tại
                this.note = new MusicNote();
                this.note.create(notesInRow[i], i+1);
                this.notes.addChild(this.note);
            }  
        }
        this.addChild(this.notes);
    }

    updates(){
        this.notes.y += 3;
    }

    listenInputs(){
        let noteStatus;
        // Keyboard.instance.once(KBEvent.KeyDown, e => {
        //     console.log(e);
        //     if (e.code === 'KeyA'){

        //     } else if (e.code === 'KeyS'){

        //     } else if (e.code === 'KeyD'){

        //     } else if (e.code === 'KeyF'){

        //     }
        // })

        Mouse.instance.once(MEvent.MClick, e => {
            console.log(e);
            
        })

        // Touch.instance.once(TEvent.TouchOn, e => {
        //     console.log(e);
        // })
    }
}

