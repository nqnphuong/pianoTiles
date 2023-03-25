import { Sprite } from "pixi.js";
import { DISTANCE_PRICE, GAME_WIDTH } from "../../constants";
import { getSpriteFromCache } from "../../utils/utils";

export class Crowns extends Sprite{
    constructor(){
        super();
        this._width = - DISTANCE_PRICE;
    }

    create(number){
        for (let i = 0; i < number; i++) {
            this.crown = getSpriteFromCache('crown.png');
            this.crown.scale.set(GAME_WIDTH/900);
            this.crown.x = i * DISTANCE_PRICE + this.crown.width * i;
            // add star into stars
            this.addChild(this.crown);
            this._width += this.crown.width + DISTANCE_PRICE; 
        }
    }

    destroyCrowns(){
        this.removeChild(this.crown);
    }
}