// class này xử lý music khi chơi game

import { sound } from "@pixi/sound"

export class MusicPlay {
    create(nameOfSong) {
        sound.add("music", "../audios/mp3/" + nameOfSong + ".mp3");
    }

    play(speed) {
        let startTime = performance.now();
        sound.play("music", { speed: speed });
        let endTime = performance.now();
        return endTime - startTime;
    }

    resume() {
        sound.resume("music");
    }

    stop() {
        sound.stop("music");
    }
}