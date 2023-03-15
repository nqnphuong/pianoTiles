import { Container, Graphics, TextStyle, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, TITLE_SIZE } from "../constants";
import { Crowns } from "../objects/prices/crowns";
import { Stars } from "../objects/prices/stars";
import { getSpriteFromCache } from "../utils/utils";

export class EndUI extends Container {
    constructor() {
        super();
    }

    create(score, priceNumber, priceType) {
        this.createBackground();
        this.createTextScore(score);
        this.createPrices(priceNumber, priceType);
        this.createButton();
    }

    createBackground() {
        let background = new Graphics();
        background.beginFill(0xFFFFFF);
        let width = GAME_WIDTH * 3/4;
        let height = GAME_HEIGHT / 2;
        let x = (GAME_WIDTH - width) / 2;
        let y = (GAME_HEIGHT - height) / 2;
        background.drawRoundedRect(x, y, width, height, 30);
        this.addChild(background);
    }

    createTextScore(score){
        let style = new TextStyle({
            fontFamily: "Arial",
            fontSize: TITLE_SIZE,
            fill: "black",
            style: 'bold'
        })
        this.textScore = new Text("SCORE: " + score, style);
        this.textScore.x = GAME_WIDTH / 2 - this.textScore.width / 2;
        this.textScore.y = GAME_HEIGHT / 2 - this.textScore.height / 2 - 50;

        this.addChild(this.textScore)
    }

    createPrices(priceNumber, priceType){
        if (priceType === 'STAR'){
            this.stars = new Stars();
            console.log(priceNumber);
            this.stars.creates(priceNumber);
            this.stars.x = GAME_WIDTH / 2 - this.stars.stars._width / 2;
            this.stars.y = GAME_HEIGHT / 2 - this.stars.height / 2 - 10;
            this.addChild(this.stars);
        } else if (priceType === 'CROWN') {
            this.crowns = new Crowns();
            this.crowns.creates(priceNumber);
            this.crowns.x = GAME_WIDTH / 2 - this.crowns.crowns._width / 2;
            this.crowns.y = GAME_HEIGHT / 2 - this.crowns.height / 2 - 10;
            this.endUIContainer.addChild(this.crowns);
            this.addChild(this.crowns)
        }
    }

    createButton(){
        this.playbtn = getSpriteFromCache('play.png');
        this.playbtn.scale.set(0.5);
        this.playbtn.x = GAME_WIDTH / 2 - this.playbtn.width / 2;
        this.playbtn.y = GAME_HEIGHT / 2 - this.playbtn.height / 2 + 120;
        this.addChild(this.play);
    }

    hide(){
        this.visible = false;
    }

    show(){
        this.visible = true;
    }

}