import { Sprite, Graphics, TextStyle, Text } from "pixi.js";
import { BLUR_NOTE_PRESS, GAME_HEIGHT, GAME_WIDTH, LINE_WIDTH, NOTE_HEIGHT, NOTE_WIDTH, NUMBER_OF_NOTES, POSY_APPEAR_NOTE, TITLE_SIZE } from "../../constants";


export class NoteMng extends Sprite {
    constructor() {
        super();
    }

    createOneRow(notesInRow) {
        for (let i = 0; i < NUMBER_OF_NOTES; i++) {
            if (notesInRow[i] != 0) {
                this.note = new Graphics(); // sử dụng let thay cho this.note
                this.note.beginFill(0x000000);
                this.note.drawRect(LINE_WIDTH, 0, NOTE_WIDTH, NOTE_HEIGHT * notesInRow[i]);
                if (i + 1 === 1) this.note.x = 0;
                else this.note.x = GAME_WIDTH / 4 * i;
                this.note.y = -NOTE_HEIGHT * notesInRow[i] + POSY_APPEAR_NOTE;
                this.addChild(this.note);
            }
        }
    }

    createBeginNote(line) {
        this.noteBegin = new Graphics();
        this.noteBegin.beginFill(0x369fc6);
        this.noteBegin._x = LINE_WIDTH + GAME_WIDTH / 4 * line;
        this.noteBegin._y = GAME_HEIGHT * 2 / 3 - NOTE_HEIGHT;
        this.noteBegin.drawRect(this.noteBegin._x, this.noteBegin._y, NOTE_WIDTH, NOTE_HEIGHT)

        this.addChild(this.noteBegin);

        let style = new TextStyle({
            fontFamily: "Arial",
            fontSize: TITLE_SIZE,
            fill: "white",
            style: 'bold'
        })
        this.playTextStartGame = new Text("START", style);
        this.playTextStartGame.x = this.noteBegin._x + this.noteBegin.width / 2 - this.playTextStartGame.width / 2;
        this.playTextStartGame.y = this.noteBegin._y + this.noteBegin.height / 2 - this.playTextStartGame.height / 2;
        this.addChild(this.playTextStartGame);
    }

    isPressBeginNote(position) {
        // console.log(position);
        // console.log(this.noteBegin._x);
        // console.log(this.noteBegin._y);
        // console.log(this.noteBegin.width);
        // console.log(this.noteBegin.height);
        if (position['x'] > this.noteBegin._x && position['x'] < this.noteBegin._x + this.noteBegin.width
            && position['y'] > this.noteBegin._y && position['y'] < this.noteBegin._y + this.noteBegin.height) {
            return true;
        }
        return false;
    }

    isPressNoteInGame(position, noteArr) {
        for (let notePress of noteArr) {
            if (position['x'] > notePress.x && position['x'] < notePress.x + notePress.width &&
                position['y'] > notePress.y && position['y'] < notePress.y + notePress.height) {
                return notePress;
            }
        }
        return false;
    }

    destroyBeginNote() {
        this.removeChild(this.noteBegin);
        this.removeChild(this.playTextStartGame);
    }

    destroyNoteInGame(note) {
        note.alpha = BLUR_NOTE_PRESS;
        // this.removeChild(note);
    }


    update(delta, noteArr, speedGame) {
        noteArr.forEach(note => {
            note.y += speedGame;
        });
    }
}