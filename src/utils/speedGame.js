import { NOTE_HEIGHT } from "../constants"

export function speedGame() {
    let distance_between_notes = 0.1153845;
    let delta = distance_between_notes * 8;
    return ((8 * NOTE_HEIGHT * 3) / (1.8 * 0.923076) - (NOTE_HEIGHT / (delta * distance_between_notes))) / delta
}