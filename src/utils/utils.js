import { Sprite, utils } from "pixi.js";
import { LIST_MUSIC } from "../constants";

export function getSpriteFromCache(name) {
    return new Sprite(utils.TextureCache[`${name}`]);
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function changeNamToFullName(musicName) {
    let fullNameMusic = LIST_MUSIC.filter((music) => {
        return music.includes(musicName);
    });
    return fullNameMusic[0]
}

export function distance(y1, y2) {
    return y2 - y1;
}