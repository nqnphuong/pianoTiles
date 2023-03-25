// class này xử lý music khi chơi game

import { sound } from "@pixi/sound"

export class MusicPlay {
    create(nameOfSong) {
        sound.add("music", "../audios/mp3/" + nameOfSong + ".mp3");
    }

    play(time_a, time_b) {
        let startTime = performance.now();
        sound.play("music", { start: time_a, end: time_b });
        // sound.play("music", { speed: speed });
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