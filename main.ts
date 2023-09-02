let elapsed_seconds = 0
let elapsed_time = 0
let start_time = 0
let music_played = false
let timer_started = false
basic.showIcon(IconNames.Happy)
basic.showIcon(IconNames.Surprised)
basic.showIcon(IconNames.Giraffe)
basic.showIcon(IconNames.Heart)
basic.showString("Let's GO!")
let min_time = 0
let sec_time = 0
let min_str = ""
let sec_str = ""
let show_time = ""
basic.forever(function () {
    if (input.pinIsPressed(TouchPin.P2)) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        pins.digitalWritePin(DigitalPin.P12, 0)
        music.stopAllSounds()
        timer_started = false
        music_played = false
        start_time = 0
        elapsed_time = 0
    } else {
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 1)
        if (!(timer_started)) {
            start_time = input.runningTime()
            timer_started = true
        } else {
            elapsed_time = input.runningTime() - start_time
            if (elapsed_time >= 1 * 1000 * 1000) {
                if (music_played == false) {
                    music_played = true
                    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.LoopingInBackground)
                }
            }
        }
    }
})
basic.forever(function () {
    let min_time2: number;
let sec_time2: any;
let min_str2: any;
let sec_str2: any;
let show_time2: string;
if (timer_started == true) {
        elapsed_seconds = Math.idiv(elapsed_time, 1000)
        min_time2 = Math.idiv(elapsed_seconds, 60)
        sec_time2 = elapsed_seconds % 60
        if (min_time2 < 10) {
            min_str2 = "0" + ("" + min_time2)
        } else {
            min_str2 = "" + min_time2
        }
        if (sec_time2 < 10) {
            sec_str2 = "0" + ("" + sec_time2)
        } else {
            sec_str2 = "" + sec_time2
        }
        show_time2 = "" + min_str2 + ":" + sec_str2
        basic.showString(show_time2)
    }
})
