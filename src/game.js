import { Application, Assets } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH} from "./constants";
import { Mouse } from "./inputs/mouse";
import { PlayScene } from "./scenes/playScene";

export default class Game {
    constructor() {
        this.app = new Application({
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            autoResize: true,
            antialias: true,
            transparent: false
        });
        globalThis.__PIXI_APP__ = this.app;
        document.body.appendChild(this.app.view);
        Mouse.init();
    }

    async loadAssets() {
        await Assets.load("./images/pianoTiles.json");
        //TODO: load nhạc và load cvs ở đây
        this.setup();
    }

    setup(){
        this.playScene = new PlayScene();
        this.app.stage.addChild(this.playScene);

        this.app.ticker.add(this.gameLoop, this);
    }

    gameLoop(delta){
        this.playScene.update(delta);
    }
}