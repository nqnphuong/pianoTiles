// class này xử lý music khi chơi game

import { sound } from "@pixi/sound"

export class MusicPlay {
    create(nameOfSong){
        sound.add("music", "../audios/mp3/" + nameOfSong.trim() + ".mp3");
    }

    play(){
        sound.play("music");
    }

    resume(){
        sound.resume("music");
    }

    stop(){
        sound.stop("music");
    }
}