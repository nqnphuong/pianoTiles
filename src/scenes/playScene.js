import { Container, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, LINE_WIDTH, LIST_MUSIC, POSY_APPEAR_NOTE } from "../constants";
import { BeginUI } from "../UIs/beginUI";
import { PlayUI } from "../UIs/playUIs";
import { EndUI } from "../UIs/endUI";
import { getSpriteFromCache } from "../utils/utils";
import { MEvent, Mouse } from "../inputs/mouse";
import { NoteMng } from "../objects/notes/noteMng";
import { processFileCSV } from "../utils/musics/processFileCSV";

export const GameState = Object.freeze({
    Play: 'play',
    Lose: 'lose',
    Begin: 'begin'
})

export class PlayScene extends Container {
    constructor() {
        super();
        this.state = GameState.Begin;
        this.create();
        this.getUI();
        this.processMusicData();
        this.i_update = 1;
    }

    create() {
        this.gameScene = new Container();
        this.addChild(this.gameScene);
        this.createBackground();
        this.createEventsInput();
    }

    processMusicData(){
        this.promissCSV = new processFileCSV(LIST_MUSIC[0]);
        this.promissCSV.then((data) => {
            this.dataArr = Object.entries(data);
            this.createNote();
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
    }

    createEventsInput() {
        Mouse.instance.once(MEvent.MDown, this.onPointDown, this);
        Mouse.instance.once(MEvent.MUp, this.onPointUp, this);
        Mouse.instance.once(MEvent.MMove, this.onPointMove, this);
    }

    onPointDown() {
        /* SU KIEN POINT DOWN
        nếu là màn hình begin thì point down chuyển thành màn hình play
        nếu là màn hình play thì bắt đầu chơi game 
        */
        if (this.state === GameState.Begin) {
            this.start = GameState.Play;
            this.startGame();
        }
    }

    onPointUp() { }

    onPointMove() { }

    getUI() {
        this.playUI = new PlayUI();
        this.addChild(this.playUI);

        this.beginUI = new BeginUI();
        this.addChild(this.beginUI);

        this.endUI = new EndUI();
        this.addChild(this.endUI);
        this.endUI.hide();
    }

    update(delta) {
        if (this.state === GameState.Play) {
            this.note.update(delta, this);
            console.log(this.note.note.y);
            if (this.note.note.y > POSY_APPEAR_NOTE) {
                // console.log(1);
                // this.note.createOneRow(this.dataArr[this.i_update][1]);
                // this.i_update += 1;
            }
            // this.playUI.update();
        }
    }

    // press to play
    startGame() {
        this.state = GameState.Play;
        this.beginUI.hide();
    }

    endGame() {
        this.state = GameState.Lose;
        this.endUI.show();
    }
}
