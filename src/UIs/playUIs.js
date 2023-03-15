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
        // this.createStars();
        // this.createCrowns();
    }

    createScore() {
        this.score = new Score();
        this.score.create();
        this.addChild(this.score);
    }

    createStars() {
        this.stars = new Stars();
        this.stars.create(3);
        this.stars.x = (GAME_WIDTH - this.stars._width) / 2;
        this.stars.y = 10;
        this.addChild(this.stars);
    }

    createCrowns() {
        this.crowns = new Crowns();
        this.crowns.create(3);
        this.crowns.x = (GAME_WIDTH - this.crowns._width) / 2;
        this.crowns.y = 10;
        this.addChild(this.crowns);
    }

    update(heightNote){
        /* 
        trong này update phần điểm, phần stars, phần crowns
        */
        this.score.update(heightNote);
        //TODO: star va crown se duoc bo sung sau
    }

    hide(){
        this.visible = false;
    }

    show(){
        this.visible = true;
    }
}


