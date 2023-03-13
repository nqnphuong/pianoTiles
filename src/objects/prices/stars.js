import { Sprite } from "pixi.js";
import { DISTANCE_PRICE, GAME_WIDTH } from "../../constants";
import { getSpriteFromCache } from "../../utils/utils";

export class Star extends Sprite{
    constructor(){
        super();
    }

    create(){
        this.star = getSpriteFromCache("star.png");
        this.star.scale.set(GAME_WIDTH/900);
        this.addChild(this.star);
    }

}

export class Stars extends Star{
    constructor(){
        super();
    }

    creates(number){
        this.stars = new Sprite();
        this.stars._width = - DISTANCE_PRICE;
        for (let i = 0; i < number; i++) {
            this.star = new Star();
            this.star.create();
            this.star.x = i * DISTANCE_PRICE + this.star.star.width * i;
            this.stars.addChild(this.star);
            this.stars._width += this.star.star.width + DISTANCE_PRICE;
        }
        this.addChild(this.stars);
    }
}