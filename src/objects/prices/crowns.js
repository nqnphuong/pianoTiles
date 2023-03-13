import { Sprite } from "pixi.js";
import { DISTANCE_PRICE, GAME_WIDTH } from "../../constants";
import { getSpriteFromCache } from "../../utils/utils";

export class Crown extends Sprite{
    constructor(){
        super();
    }

    create(){
        this.crown = getSpriteFromCache("crown.png");
        this.crown.scale.set(GAME_WIDTH/900);
        this.addChild(this.crown);
    }

}

export class Crowns extends Crown{
    constructor(){
        super();
    }

    creates(number){
        this.crowns = new Sprite();
        this.crowns._width = - DISTANCE_PRICE;
        for (let i = 0; i < number; i++) {
            this.crown = new Crown();
            this.crown.create();
            this.crown.x = i * DISTANCE_PRICE + this.crown.crown.width * i;
            // add star into stars
            this.crowns.addChild(this.crown);
            this.crowns._width += this.crown.crown.width + DISTANCE_PRICE;
        }
        console.log(this.crowns._width);
        this.addChild(this.crowns);
    }
}