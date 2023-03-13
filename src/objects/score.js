import { Sprite, Text, TextStyle } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, SCORE_SIZE } from "../constants";

export class Score extends Sprite{
    constructor(){
        super();
        this.score = 0; 
    }

    create(){
        let style = new TextStyle({
            fontFamily: "Arial",
            fontSize: SCORE_SIZE,
            fill: "red",
            style: 'bold'
        })
        this.mess = new Text(this.score, style);
        this.mess.x = GAME_WIDTH / 2 - this.mess.width / 2;
        this.mess.y = GAME_HEIGHT/ 14;
        this.addChild(this.mess);
    }

    update(score){
        this.score += score;
        this.mess.text = this.score;
    }
}