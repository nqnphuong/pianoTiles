import { Container, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_SPEED, GAME_WIDTH, LINE_WIDTH, LIST_MUSIC, NOTE_HEIGHT, NOTE_WIDTH, POSY_APPEAR_NOTE } from "../constants";
import { BeginUI } from "../UIs/beginUI";
import { PlayUI } from "../UIs/playUIs";
import { EndUI } from "../UIs/endUI";
import { changeNameToFullName, getSpriteFromCache } from "../utils/utils";
import { NoteMng } from "../objects/notes/noteMng";
import { processFileCSV } from "../utils/musics/processFileCSV";
import { GameState } from "./sceneMng";
import { MusicPlay } from "../utils/musics/musicPlay";


export class PlayScene extends Container {
    constructor(musicName) {
        super();
        this.musicName = musicName;
        this.create();
    }

    create() {
        this.musicPlay = new MusicPlay();
        this.noteArr = [];
        this.state = GameState.Begin;
        this.gameScene = new Container();
        this.addChild(this.gameScene);
        this.createBackground();
        if (this.musicName) {
            this.speedNote = GAME_SPEED;
            this.fullNameMusic = LIST_MUSIC.filter((music) => {
                return music.includes(this.musicName);
            });
            this.processMusicData();
        }
        this.getUI();
        this.turn = 0; // lượt chơi
        this.part = 1;
        this.i_update = 1;
    }

    processMusicData() {
        this.promissCSV = new processFileCSV(this.fullNameMusic[0]);
        this.promissCSV.then((data) => {
            this.dataArr = Object.entries(data);
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
        this.note.createOneRow(this.dataArr[0][1][0]);
        this.note.note.y = GAME_HEIGHT * 2 / 3 - this.note.note.height;
        // this.note.circle.y =  this.note.note.y + this.note.note.height - 30;
        this.gameScene.addChild(this.note);
        this.noteArr.push(this.note.note);
        this.note.note.time_a = this.dataArr[0][1][1];
        this.note.note.time_b = this.dataArr[0][1][2];
    }

    createBeginNote() {
        for (let i = 0; i < this.dataArr[0][1][0].length; i++) {
            if (this.dataArr[0][1][0][i] !== 0) {
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

        // TODO: chua kiem tra

        if (this.state === GameState.Play) {

            this.noteArr.forEach(note => {
                if (note.alpha === 1 && note.y + note.height > GAME_HEIGHT) {
                    this.endGame();
                }
            })

            this.note.update(delta, this.noteArr, this.speedNote);
            // console.log("turn " + this.turn);
            // console.log("part " + this.part);
            if (this.turn === 0) {
                if (this.i_update + 1 === parseInt(this.dataArr.length * this.part / 3)) {
                    // console.log(this.part);
                    this.playUI.hidePrices(this.playUI.stars);
                    this.playUI.createStars(this.part);
                    this.part += 1;
                } else if (this.part > 3) {
                    this.turn = 1;
                    this.part = 1;
                    this.i_update = 0;
                    // đoạn này nhạc lặp lại 1 lần nữa : CHƯA TEST
                    // this.musicPlay.play();
                }
            } else if (this.turn === 1) {
                if (this.i_update + 1 === parseInt(this.dataArr.length * this.part / 3)) {
                    this.playUI.hidePrices(this.playUI.stars);
                    this.playUI.hidePrices(this.playUI.crowns);
                    this.playUI.createCrowns(this.part);
                    this.part += 1;
                }
            }

            if (this.dataArr !== undefined && this.dataArr.length === this.i_update) {
                if (this.noteArr[this.noteArr.length - 1].y > GAME_HEIGHT) {
                    this.endGame();
                }
            } else {
                let posYofNote = this.noteArr[this.noteArr.length - 1].y;
                if (posYofNote > POSY_APPEAR_NOTE) {
                    this.note.createOneRow(this.dataArr[this.i_update][1][0]);
                    this.note.note.time_a = this.dataArr[this.i_update][1][1];
                    this.note.note.time_b = this.dataArr[this.i_update][1][2];
                    this.i_update += 1;
                    this.noteArr.push(this.note.note);
                }
                this.noteArr.forEach(note => {
                    if (note.y > GAME_HEIGHT) {
                        this.note.destroyNoteInGame(note);
                    }
                });
            }
        }
    }

    startGame() {
        this.state = GameState.Play;
        this.beginUI.hide();
    }

    endGame() {
        this.state = GameState.Lose;
        this.endUI.show();
        if (this.turn === 0) {
            if (this.part === 1) {
                this.endUI.create(this.playUI.score.score, 0, 'STAR')
            } else {
                this.endUI.create(this.playUI.score.score, this.part - 1, 'STAR');
            }
        } else if (this.turn === 1 && this.part === 1) {
            this.endUI.create(this.playUI.score.score, 3, 'STAR');
        } else if (this.turn === 1 && this.part > 1) {
            this.endUI.create(this.playUI.score.score, this.part, 'CROWN');
        }
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }
}
