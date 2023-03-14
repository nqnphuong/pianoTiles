import { Application, Assets } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH} from "./constants";
import { PlayScene } from "./scenes/playScene";
import { Keyboard } from "./inputs/keyboard";
import { Mouse } from "./inputs/mouse";
import { Touch } from "./inputs/touch";
import { BeginUI } from "./UIs/beginUI";
import { EndUI } from "./UIs/endUI";

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
        Keyboard.init();
        Mouse.init();
        Touch.init();
    }

    async loadAssets() {
        await Assets.load("./images/pianoTiles.json");
        this.setup();
    }

    setup(){
        this.playScene = new PlayScene();
        this.app.stage.addChild(this.playScene.playSceneContainer);
        this.playScene.playSceneContainer.skipChildrenUpdate = true;

        this.beginUI = new BeginUI();
        this.app.stage.addChild(this.beginUI.beginUIContainer);
        this.beginUI.beginUIContainer.visible = false;

        this.endUI = new EndUI();
        this.app.stage.addChild(this.endUI.endUIContainer);
        this.endUI.endUIContainer.visible = false;

        this.state = this.play; //TODO: fix 
        this.app.ticker.add((delta) => this.gameLoop(delta));
    }

    gameLoop(delta){ //TODO: nfix
        this.state(delta);
    }

    play(){
        // this.playScene.notes.updates();
        // this.playScene.notes.listenInputs();
    }

    end(){
        
    }
}