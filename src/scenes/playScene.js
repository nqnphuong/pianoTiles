import { Container, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, LINE_WIDTH, NOTE_HEIGHT } from "../constants";
import { MusicNotes } from "../objects/musicNotes";
import { Crowns } from "../objects/prices/crowns";
import { Stars } from "../objects/prices/stars";
import { Score } from "../objects/score";
import { getSpriteFromCache } from "../utils/utils";

export class PlayScene extends Container {
    constructor() {
        super();
        this.playSceneContainer = new Container();
        this.create();
        this.playSceneContainer.addChild(this.backgroundContainer);
        this.playSceneContainer.addChild(this.musicNoteContainer);
        this.playSceneContainer.addChild(this.textContainer);
    }

    create() {
        this.backgroundContainer = new Container();
        this.musicNoteContainer = new Container();
        this.textContainer = new Container();
        this.createBackground();
        this.createMusicNotes();
        this.createScore();
        this.createStars();
        // this.createCrowns();
    }

    createBackground() {
        this.background = getSpriteFromCache("background.png");
        this.background.width = GAME_WIDTH;
        this.background.height = GAME_HEIGHT;
        this.backgroundContainer.addChild(this.background);

        let backgroundFilter = new Graphics();
        backgroundFilter.beginFill(0x000000, 0.1);
        backgroundFilter.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.backgroundContainer.addChild(backgroundFilter);

        for (let i = 0; i < 5; i++) {
            let lineVertical = new Graphics();
            lineVertical.lineStyle(LINE_WIDTH, 0xCCE7FF); //TODO: add constant
            lineVertical.moveTo(GAME_WIDTH / 4 * i, 0);
            lineVertical.lineTo(GAME_WIDTH / 4 * i, GAME_HEIGHT);
            this.backgroundContainer.addChild(lineVertical);
        }
    }

    createMusicNotes() {
        this.notes = new MusicNotes();
        // this.notes.creates([0, 1, 0, 1]);
        this.notes.creates([1, 0, 1, 0]);
        this.musicNoteContainer.addChild(this.notes);

        // test code
        // for (let i = 0; i < 4; i++) {
        //     this.test = new MusicNote();
        //     this.test.create(1);
        //     this.test.x = GAME_WIDTH / 4 * i;
        //     this.test.y = NOTE_HEIGHT * i;
        //     this.musicNoteContainer.addChild(this.test);
        // }

    }

    createScore(){
        this.score = new Score();
        this.score.create();
        this.textContainer.addChild(this.score);
    }

    createStars(){
        this.stars = new Stars();
        this.stars.creates(3);
        this.stars.x = GAME_WIDTH / 2 - this.stars.stars._width / 2;
        this.stars.y = 10;
        this.textContainer.addChild(this.stars);
    }

    createCrowns(){
        this.crowns = new Crowns();
        this.crowns.creates(3);
        this.crowns.x = GAME_WIDTH / 2 - this.crowns.crowns._width / 2;
        this.crowns.y = 10;
        this.textContainer.addChild(this.crowns);
    }
}