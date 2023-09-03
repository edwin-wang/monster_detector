let elapsed_seconds = 0
let elapsed_time = 0
let start_time = 0
let timer_started = false
let music_played = false
//  检测时间，单位：分钟
let detect_time = 1
//  显示开机画面
basic.showIcon(IconNames.Heart)
basic.pause(800)
basic.showString("GO!")
music.setVolume(0)
music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.LoopingInBackground)
basic.forever(function on_forever() {
    
    if (input.pinIsPressed(TouchPin.P2)) {
        //  按钮被按下亮绿灯，并且重置变量和设置喇叭静音
        on_green(true)
        music_played = false
        timer_started = false
        music.setVolume(0)
        start_time = 0
        elapsed_time = 0
    } else {
        //  按钮释放亮红灯
        on_green(false)
        //  若计时器没有开始计时，获取计时器开始计时的时间并且置位计时器变量
        if (!timer_started) {
            start_time = input.runningTime()
            timer_started = true
        } else {
            //  计算从开始计时至今的逝去时间，单位为毫秒
            elapsed_time = input.runningTime() - start_time
            //  当逝去时间超过检测时间，开始报警
            if (elapsed_time >= detect_time * 20 * 1000) {
                if (!music_played) {
                    music_played = true
                    music.setVolume(255)
                }
                
            }
            
        }
        
    }
    
})
//  时间显示
basic.forever(function on_forever2() {
    if (timer_started == true) {
        basic.showString(show_time(elapsed_time), 80)
    }
    
})
//  处理分钟和秒数的时间显示格式
function show_time(sec: number): string {
    let min_str: any;
    let sec_str: any;
    let elapsed_seconds2 = Math.idiv(sec, 1000)
    let min_time = Math.idiv(elapsed_seconds2, 60)
    let sec_time = elapsed_seconds2 % 60
    if (min_time < 10) {
        min_str = "0" + ("" + ("" + min_time))
    } else {
        min_str = "" + ("" + ("" + min_time))
    }
    
    if (sec_time < 10) {
        sec_str = "0" + ("" + ("" + sec_time))
    } else {
        sec_str = "" + ("" + ("" + sec_time))
    }
    
    return "" + min_str + ":" + ("" + sec_str)
}

function on_green(yes: boolean) {
    if (yes) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        pins.digitalWritePin(DigitalPin.P12, 0)
    } else {
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 1)
    }
    
}

