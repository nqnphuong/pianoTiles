import { Graphics, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, LINE_WIDTH, NOTE_HEIGHT, NOTE_WIDTH, RADIUS_CIRCL } from "../constants";

export class InputAnimation extends Sprite{
    createCirlce(position) {
        this.circle = new Graphics();
        this.circle.beginFill(0x369fc6);
        console.log(position['x']);
        this.circle._x = position['x'];
        this.circle._y = position['y'];
        this.circle.drawCircle(this.circle._x, this.circle._y, RADIUS_CIRCL);
        this.circle.alpha = 0.7;
        this.addChild(this.circle);
        console.log("da tao cirlce");
    }

    destroyCircle() {
        this.removeChild(this.circle);
    }
}