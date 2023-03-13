import { Sprite, utils } from "pixi.js";

export function getSpriteFromCache(name){
    return new Sprite(utils.TextureCache[`${name}`]);
}