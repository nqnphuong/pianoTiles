import { Container, Graphics, TextStyle, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, TITLE_SIZE } from "../constants";
import { getSpriteFromCache } from "../utils/utils";

export class BeginUI extends Container {
    constructor() {
        super();
        this.beginUIContainer = new Container();
        this.create();
    }

    create() {
        this.createBackground();
        this.createMusicTitle();
        this.createMusicTiles();
    }

    createBackground() {
        let background = new Graphics();
        background.beginFill(0xFFFFFF);
        background.drawRect(0, GAME_HEIGHT - GAME_HEIGHT / 4, GAME_WIDTH, GAME_HEIGHT / 4);
        this.beginUIContainer.addChild(background);
    }

    createMusicTitle() {
        this.musicIcon = getSpriteFromCache('music-disc.png');
        this.musicIcon.scale.set(0.5);
        this.musicIcon.x = 20;
        this.musicIcon.y = GAME_HEIGHT - this.musicIcon.height - 20;
        this.beginUIContainer.addChild(this.musicIcon);
    }

    createMusicTiles(){
        let style = new TextStyle({
            fontFamily: "Arial",
            fontSize: TITLE_SIZE,
            fill: "black",
            style: 'bold'
        })
        this.musicTitle = new Text("DAY LA TEN BAI HAT", style);
        this.musicTitle.x = this.musicIcon.x + this.musicIcon.width + 15;
        this.musicTitle.y = this.musicIcon.y + this.musicIcon.height / 2 - this.musicTitle.height / 2 ;
        this.beginUIContainer.addChild(this.musicTitle);
    }
}