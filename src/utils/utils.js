import { Sprite, utils } from "pixi.js";

export function getSpriteFromCache(name){
    return new Sprite(utils.TextureCache[`${name}`]);
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}