import { Container } from "pixi.js";
import { GAME_WIDTH } from "../constants";
import { Crowns } from "../objects/prices/crowns";
import { Stars } from "../objects/prices/stars";
import { Score } from "../objects/score";

export class PlayUI extends Container {
    constructor() {
        super();
        this.create();
    }

    create() {
        this.createScore();
    }

    createScore() {
        this.score = new Score();
        this.score.create();
        this.addChild(this.score);
    }

    createStars(number) {
        this.stars = new Stars();
        this.stars.create(number);
        this.stars.x = (GAME_WIDTH - this.stars._width) / 2;
        this.stars.y = 10;
        this.addChild(this.stars);
    }

    createCrowns(number) {
        this.crowns = new Crowns();
        this.crowns.create(number);
        this.crowns.x = (GAME_WIDTH - this.crowns._width) / 2;
        this.crowns.y = 10;
        this.addChild(this.crowns);
    }

    update(heightNote){
        this.score.update(parseInt(heightNote));
        this.score.mess.x = GAME_WIDTH / 2 - this.score.mess.width / 2;
    }

    destroyPlayUI(){
        this.removeChild(this.score);
        this.removeChild(this.stars);
        this.removeChild(this.crowns);
    }

    hide(){
        this.visible = false;
    }

    show(){
        this.visible = true;
    }

    hidePrices(price){
        this.removeChild(price);
    }
}


