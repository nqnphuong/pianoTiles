import { Sprite } from "pixi.js";
import { DISTANCE_PRICE, GAME_WIDTH } from "../../constants";
import { getSpriteFromCache } from "../../utils/utils";

export class Stars extends Sprite{
    constructor(){
        super();
        this._width = - DISTANCE_PRICE;
    }

    create(number){
        for (let i = 0; i < number; i++) {
            this.star = getSpriteFromCache('star.png');
            this.star.scale.set(GAME_WIDTH/900);
            this.star.x = i * DISTANCE_PRICE + this.star.width * i;
            // add star into stars
            this.addChild(this.star);
            this._width += this.star.width + DISTANCE_PRICE; 
        }
    }

    destroyStars(){
        this.removeChild(this.star);
    }
}