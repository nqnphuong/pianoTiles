import { Application, Assets } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH} from "./constants";
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
        document.body.appendChild(this.app.view);
    }

    async loadAssets() {
        await Assets.load("./images/pianoTiles.json");
        this.setup();
    }

    setup(){
        this.playScene = new PlayScene();
        this.app.stage.addChild(this.playScene.playSceneContainer);
        this.state = this.play;
        this.app.ticker.add((delta) => this.gameLoop(delta));
    }

    gameLoop(delta){ //TODO: nhớ fix đừng quên đó
        this.state(delta);
    }

    play(){
        this.playScene.notes.updates();
    }

    end(){
        
    }
}