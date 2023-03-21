import { NOTE_HEIGHT } from "../constants";
import { InputAnimation } from "../inputs/inputAnimation";
import { MEvent, Mouse } from "../inputs/mouse";
import { MusicPlay } from "../utils/musics/musicPlay";
import { changeNamToFullName } from "../utils/utils";
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
        this.musicPlay = new MusicPlay();
    }

    mngScene() {
        if (this.sceneRun === Scene.ChooseMusic) {
            this.chooseMusicScene.show();
        } else if (this.sceneRun === Scene.PlayGame) {
            this.playScene = new PlayScene(this.musicName);
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
            if (this.playScene.note.isPressBeginNote(Mouse.position) && this.playScene.state === GameState.Begin) {
                let time = this.musicPlay.play(1);
                console.log(time);
                setTimeout(() => {
                    this.playScene.note.destroyBeginNote();
                    this.playScene.startGame();
                }, time*1000);
            } else if (this.playScene.state === GameState.Play) {
                let noteInfor = this.playScene.note.isPressNoteInGame(Mouse.position, this.playScene.noteArr);
                if (noteInfor) {
                    this.playScene.note.destroyNoteInGame(noteInfor);
                    this.playScene.playUI.update(noteInfor.height / NOTE_HEIGHT);
                }
                // this.inputAnimation = new InputAnimation();
                // this.inputAnimation.createCirlce(Mouse.position);
                // this.playScene.addChild(this.inputAnimation);
            }
        }

    }

    onPointUp() {
        if (this.inputAnimation) {
            this.inputAnimation.destroy();
        }
    }

    onPointMove() { }
}