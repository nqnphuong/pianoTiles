import { Sprite } from "pixi.js";
import { NUMBER_OF_NOTES } from "../../constants";
import { Note } from "./note";


export class NoteMng extends Note{
    constructor(){
        super();
    }

    createOneRow(notesInRow){ 
        console.log("hello");
        //param: array
        //tại thời điểm 1 note được tạo ra, thời điểm đó là lúc y += NOTE_HEIGHT
        //param là số note 1 hàng được tạo ra
        //tham số này có độ dài note
        //input = [1,0,1,0]
        this.noteOneRow = new Sprite();
        for (let i = 0; i < NUMBER_OF_NOTES; i++){
            if(notesInRow[i] != 0){ // kiểm tra tồn tại
                this.note = new Note();
                this.note.create(notesInRow[i], i+1);
                this.noteOneRow.addChild(this.note);
            }  
        }
        this.addChild(this.noteOneRow);
    }

    update(){
        this.noteOneRow += 3;
    }
}