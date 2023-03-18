import { Application, Assets } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH} from "./constants";
import { Mouse } from "./inputs/mouse";
import { PlayScene } from "./scenes/playScene";
import { Scene, SceneMng } from "./scenes/sceneMng";

export default class Game {
    constructor() {
        this.app = new Application({
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            autoResize: true,
            antialias: true,
            transparent: false
        });
        globalThis.__PIXI_APP__ = this.app; // dòng này để bật pixi devtool (xoá khi test xong)
        document.body.appendChild(this.app.view);
        Mouse.init(this.app.view);
    }

    async loadAssets() {
        await Assets.load("./images/pianoTiles.json");
        //TODO: load nhạc và load cvs ở đây
        this.setup();
    }

    setup(){
        this.sceneMng = new SceneMng();
        this.app.stage.addChild(this.sceneMng.chooseMusicScene);

        this.app.ticker.add(this.gameLoop, this);
    }

    gameLoop(delta){
        if (this.sceneMng.sceneRun === Scene.PlayGame) {
            if (!this.app.stage.children.includes(this.sceneMng.playScene)) {
                this.app.stage.addChild(this.sceneMng.playScene);
            }
            this.sceneMng.playScene.update(delta);
        }
    }
}

/*
TODO: ý tưởng tạo note chạy xuống:
- kiểm tra mỗi khi note cũ gần xuống dưới màn hình (-10) thì tạo note mới tại vị trí đó (y = -10)
=> ý tưởng bị fail: vì khi tạo note mới, note cũ ko chạy được nữa do các thuộc tính đều chuyển sang note mới :(
*/