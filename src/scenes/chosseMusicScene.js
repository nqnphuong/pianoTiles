import { Container, Graphics, Sprite, Texture, TextStyle, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, LIST_MUSIC, TITLE_SIZE } from "../constants";
import { getSpriteFromCache } from "../utils/utils";
import { Scrollbox } from 'pixi-scrollbox'

export class ChooseMusicScene extends Container {
    constructor() {
        super();
        this.create();
    }

    create() {
        this.createBackground();
        this.createListMusic();
        // this.createScrollBox();
    }

    // tao background
    createBackground() {
        this.backgroundCM = getSpriteFromCache("backgroundCM.jpg");
        this.backgroundCM.width = GAME_WIDTH;
        this.backgroundCM.height = GAME_HEIGHT;
        this.addChild(this.backgroundCM);
    }

    createScrollBox() {
        this.scrollbox = new Scrollbox({ boxWidth: 200, boxHeight: 200 })

        // add a sprite to the scrollbox's content
        this.sprite = this.scrollbox.content.addChild(new Sprite(Texture.WHITE))
        this.sprite.width = this.sprite.height = 500
        this.sprite.tint = 0xff0000
        this.sprite.eventMode = "auto";

        this.scrollbox.update()
        this.addChild(this.sprite);
    }

    // tao list music
    createListMusic() {
        this.listMusicArr = [];
        // console.log(LIST_MUSIC.length);
        for (let i = 0; i < LIST_MUSIC.length; i++) {
            this.oneMusicSprite = new Sprite();
            this.backgroundMusic = new Graphics();
            this.backgroundMusic.beginFill(0xFFFFFF);
            let width = GAME_WIDTH * 5 / 6;
            let height = GAME_HEIGHT / 7;
            let x = (GAME_WIDTH - width) / 2;
            let y = 30 * (i + 1) + (i * height);
            this.backgroundMusic.drawRoundedRect(x, y, width, height, 10);
            this.oneMusicSprite.addChild(this.backgroundMusic);

            this.musicIcon = getSpriteFromCache('music-disc.png');
            this.musicIcon.scale.set(0.4);
            this.musicIcon.x = x + 20;
            // create music icon with i value
            this.musicIcon.y = 30 * (i + 1) + (i * height) + 15;
            this.oneMusicSprite.addChild(this.musicIcon);
            let style = new TextStyle({
                fontFamily: "Arial",
                fontSize: TITLE_SIZE,
                fill: "black",
                style: 'bold'
            })
            let name = LIST_MUSIC[i].slice(0, LIST_MUSIC[i].indexOf('_'));
            this.musicTitle = new Text(name, style);
            this.musicTitle.x = this.musicIcon.x + this.musicIcon.width + 15;
            this.musicTitle.y = this.musicIcon.y + (this.musicIcon.height - this.musicTitle.height) / 2;
            this.oneMusicSprite.addChild(this.musicTitle);

            this.createPlayButton(i);
            this.oneMusicSprite.addChild(this.playButton);
            this.oneMusicSprite.addChild(this.playText);

            this.addChild(this.oneMusicSprite);
            this.listMusicArr.push(this.oneMusicSprite);
        }
    }

    createPlayButton(i) {
        this.playButton = new Graphics();
        this.playButton.beginFill(0x816ecb);
        let width = GAME_WIDTH / 4;
        let height = GAME_HEIGHT / 20;
        let x = GAME_WIDTH - width - 50;
        let y = (i * height) + 110 * (i + 1) - 20;
        this.playButton.drawRoundedRect(x, y, width, height, 15);
        this.playButton._x = x;
        this.playButton._y = y;
        
        let style = new TextStyle({
            fontFamily: "Arial",
            fontSize: TITLE_SIZE*3/4,
            fill: "white",
            style: 'bold'
        })
        this.playText = new Text("Play", style);
        this.playText.x = x + (width - this.playText.width) / 2;
        this.playText.y = y + (height - this.playText.height) / 2;
    }

    isPressed(position) {
        for (let i = 0; i < this.listMusicArr.length; i++) {
            let musicSprite = this.listMusicArr[i];
            let buttonPlay = musicSprite.children[3];
            
            if (buttonPlay._x <= position['x'] && position['x'] <= buttonPlay._x+buttonPlay.width
                && buttonPlay._y <= position['y'] && position['y'] <= buttonPlay._y+buttonPlay.height) {
                return this.listMusicArr[i].children[2].text;
            }
        }
        return -1;
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }
}