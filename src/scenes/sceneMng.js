import { MAX_NOTE_BLUR, NOTE_HEIGHT, NUMBER_BLUR } from "../constants";
import { MEvent, Mouse } from "../inputs/mouse";
import { changeNamToFullName, distance } from "../utils/utils";
import { ChooseMusicScene } from "./chosseMusicScene";
import { PlayScene } from "./playScene";

export const Scene = Object.freeze({
    ChooseMusic: 'chooseMusic',
    PlayGame: 'playgame'
});

export const GameState = Object.freeze({
    Play: 'play',
    Lose: 'lose',
    Begin: 'begin'
})

export class SceneMng {
    constructor() {
        this.chooseMusicScene = new ChooseMusicScene();
        this.sceneRun = Scene.ChooseMusic;
        this.musicName = "";
        this.mngScene();
        this.createEventsInput();
    }

    mngScene() {
        if (this.sceneRun === Scene.ChooseMusic) {
            this.chooseMusicScene.show();
        } else if (this.sceneRun === Scene.PlayGame) {
            this.playScene = new PlayScene(this.musicName);
            this.musicPlay = this.playScene.musicPlay;
            this.chooseMusicScene.hide();
            this.sceneRun = Scene.PlayGame;
            this.playScene.show();
        }
    }


    // control mouse
    createEventsInput() {
        Mouse.instance.on(MEvent.MDown, this.onPointDown, this);
        Mouse.instance.on(MEvent.MUp, this.onPointUp, this);
        Mouse.instance.on(MEvent.MMove, this.onPointMove, this);
    }

    onPointDown() {
        /* SU KIEN POINT DOWN
        nếu là màn hình begin thì point down chuyển thành màn hình play
        nếu là màn hình play thì bắt đầu chơi game 
        */

        if (this.sceneRun === Scene.ChooseMusic) { // màn hình chọn bài hát
            let musicName = this.chooseMusicScene.isPressed(Mouse.position);
            if (musicName != -1) {
                this.sceneRun = Scene.PlayGame;
                this.musicName = musicName;
                this.mngScene();
                this.musicPlay.create(changeNamToFullName(musicName));
            }
        }
        else if (this.sceneRun === Scene.PlayGame) { // màn hình chơi game

            if (this.playScene.state === GameState.Begin || this.playScene.state === GameState.Play) {

                if (this.playScene.note.isPressBeginNote(Mouse.position)) {
                    // let time = this.playScene.musicPlay.play(0, 0);
                    // this.playScene.musicPlay.stop();
                    this.playScene.note.destroyBeginNote();
                    // setTimeout(() => {
                    this.playScene.startGame();
                    // }, time * 500);

                }

                this.noteInfor = this.playScene.note.isPressNoteInGame(Mouse.position, this.playScene.noteArr);
                if (this.noteInfor) {
                    this.playScene.musicPlay.play(this.playScene.note.note.time_a, this.playScene.note.note.time_b)
                    if (this.noteInfor.height > NOTE_HEIGHT) {
                        this.longPress = true;
                        this.numberBlur = 1;
                        this.x_down = Mouse.position['x'];
                        this.y_down = Mouse.position['y'];
                    } else {
                        this.playScene.note.blurNoteInGame(this.noteInfor, MAX_NOTE_BLUR);
                    }
                    this.playScene.playUI.update(this.noteInfor.height / NOTE_HEIGHT);
                }

            } else if (this.playScene.state === GameState.Lose) {
                if (this.playScene.endUI.isPressButtonPlay(Mouse.position)) {
                    this.playScene.endUI.hide();
                    this.playScene.noteArr.forEach(note => {
                        this.playScene.note.destroyNoteInGame(note);
                    });
                    this.playScene.playUI.destroyPlayUI();

                    this.playScene.state = GameState.Begin;
                    this.playScene.create();
                }
            }
        }
    }

    onPointUp() {
        Mouse.isPointerDown = false;
        this.numberBlur = 1;
        this.x_up = Mouse.position['x'];
        this.y_up = Mouse.position['y'];
        // if (Mouse.isPointerDown && this.playScene.state === GameState.Play) {
        //     console.log("hi");
        //     if (this.longPress) {
        //         console.log("long press");
        //         let distanceMouse = distance(this.y_down, this.y_up);
        //         this.playScene.playUI.update(Math.round(distanceMouse / NOTE_HEIGHT));
        //     } else {
        //         this.playScene.playUI.update(1);
        //     }
        // }
        this.longPress = false;
    }

    onPointMove() {
        if (Mouse.isPointerDown && this.longPress) {
            console.log("hi");
            this.numberBlur -= NUMBER_BLUR;
            this.playScene.note.blurNoteInGame(this.noteInfor, this.numberBlur);
        }
    }
}