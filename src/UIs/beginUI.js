import { Container, Graphics, TextStyle, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, TITLE_SIZE } from "../constants";
import { getSpriteFromCache } from "../utils/utils";

export class BeginUI extends Container {
    constructor() {
        super();
        this.create();
    }

    create() {
        this.createBackground();
        this.createMusicTitle();
    }

    createBackground() {
        this.background = new Graphics();
        this.background.beginFill(0xFFFFFF);
        this.background.drawRect(0, GAME_HEIGHT * 2 / 3, GAME_WIDTH, 150);
        console.log("background begin ui " + GAME_HEIGHT * 2 / 3);
        this.addChild(this.background);
    }

    createMusicTitle(musicName) { // biến này là nhập tên bài hát - tên bài hát được chọn từ ban đầu
        this.musicIcon = getSpriteFromCache('music-disc.png');
        this.musicIcon.scale.set(0.5);
        this.musicIcon.x = 30;
        this.musicIcon.y = GAME_HEIGHT * 2 / 3  + (this.background.height - this.musicIcon.height) / 2;
        this.addChild(this.musicIcon);

        let style = new TextStyle({
            fontFamily: "Arial",
            fontSize: TITLE_SIZE,
            fill: "black",
            style: 'bold'
        })
        this.musicTitle = new Text("DAY LA TEN BAI HAT", style);
        this.musicTitle.x = this.musicIcon.x + this.musicIcon.width + 15;
        this.musicTitle.y = GAME_HEIGHT * 2 / 3  + (this.background.height - this.musicTitle.height) / 2;
        this.addChild(this.musicTitle);
    }

    hide(){
        this.visible = false;
    }

    show(){
        this.visible = true;
    }
}