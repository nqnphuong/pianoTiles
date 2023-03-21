import { Container, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, LINE_WIDTH, LIST_MUSIC, POSY_APPEAR_NOTE } from "../constants";
import { BeginUI } from "../UIs/beginUI";
import { PlayUI } from "../UIs/playUIs";
import { EndUI } from "../UIs/endUI";
import { changeNameToFullName, getSpriteFromCache } from "../utils/utils";
import { NoteMng } from "../objects/notes/noteMng";
import { processFileCSV } from "../utils/musics/processFileCSV";
import { GameState } from "./sceneMng";


export class PlayScene extends Container {
    constructor(musicName) {
        super();
        this.musicName = musicName;
        this.noteArr = [];
        this.state = GameState.Begin;
        this.create();
        if (musicName) {
            this.speedNote = 16.23;
            // this.speedNote = 2;
            this.fullNameMusic = LIST_MUSIC.filter((music) => {
                return music.includes(musicName);
            });
            this.processMusicData();
        }
        this.getUI();
        this.i_update = 1;
    }

    create() {
        this.gameScene = new Container();
        this.addChild(this.gameScene);
        this.createBackground();
    }

    processMusicData() {
        this.promissCSV = new processFileCSV(this.fullNameMusic[0]);
        this.promissCSV.then((data) => {
            this.dataArr = Object.entries(data);
            console.log(this.dataArr);
            this.createNote();
            this.createBeginNote();
        });

    };


    createBackground() {
        this.background = getSpriteFromCache("background.png");
        this.background.width = GAME_WIDTH;
        this.background.height = GAME_HEIGHT;
        this.gameScene.addChild(this.background);

        let backgroundFilter = new Graphics();
        backgroundFilter.beginFill(0x000000, 0.1);
        backgroundFilter.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.gameScene.addChild(backgroundFilter);

        for (let i = 0; i < 5; i++) {
            let lineVertical = new Graphics();
            lineVertical.lineStyle(LINE_WIDTH, 0xCCE7FF);
            lineVertical.moveTo(GAME_WIDTH / 4 * i, 0);
            lineVertical.lineTo(GAME_WIDTH / 4 * i, GAME_HEIGHT);
            this.gameScene.addChild(lineVertical);
        }

    }

    createNote() {
        this.note = new NoteMng();
        this.note.createOneRow(this.dataArr[0][1]);
        this.note.note.y = GAME_HEIGHT * 2 / 3 - this.note.note.height;
        this.gameScene.addChild(this.note);
        this.noteArr.push(this.note.note);
    }

    createBeginNote() {
        for (let i = 0; i < this.dataArr[0][1].length; i++) {
            if (this.dataArr[0][1][i] !== 0) {
                this.note.createBeginNote(i);
                this.gameScene.addChild(this.note);
                break;
            }
        }
    }

    getUI() {
        this.playUI = new PlayUI();
        this.addChild(this.playUI);

        this.beginUI = new BeginUI(this.musicName);
        this.addChild(this.beginUI);

        this.endUI = new EndUI();
        this.addChild(this.endUI);
        this.endUI.hide();
    }

    update(delta) {
        if (this.state === GameState.Play) {
            this.note.update(delta, this.noteArr, this.speedNote);
            if (this.dataArr !== undefined && this.dataArr.length === this.i_update) {
                if (this.noteArr[this.noteArr.length - 1].y > GAME_HEIGHT) {
                    console.log("end game");
                    this.endGame();
                }
            } else {
                let posYofNote = this.noteArr[this.noteArr.length - 1].y;
                if (posYofNote > POSY_APPEAR_NOTE) {
                    this.note.createOneRow(this.dataArr[this.i_update][1]);
                    this.i_update += 1;
                    this.noteArr.push(this.note.note);
                }
            }
            this.noteArr.forEach(note => {
                if (note.y > GAME_HEIGHT) {
                    this.note.destroyNoteInGame(note);
                }
            });
        }


    }

    startGame() {
        this.state = GameState.Play;
        this.beginUI.hide();
    }

    endGame() {
        this.state = GameState.Lose;
        this.endUI.show();
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }
}
