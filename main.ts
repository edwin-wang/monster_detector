let elapsed_seconds = 0
let elapsed_time = 0
let start_time = 0
let timer_started = false
let music_played = false
let min_time = 0
let sec_time = 0
let min_str = ""
let sec_str = ""
let show_time = ""
//  检测时间，单位：分钟
let detect_time = 1
//  显示开机画面
basic.showIcon(IconNames.Happy)
basic.showString("Let's GO!")
music.setVolume(0)
music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.LoopingInBackground)
basic.forever(function on_forever() {
    
    if (input.pinIsPressed(TouchPin.P2)) {
        //  按钮被按下亮绿灯，并且重置变量和设置喇叭静音
        pins.digitalWritePin(DigitalPin.P8, 1)
        pins.digitalWritePin(DigitalPin.P12, 0)
        music_played = false
        timer_started = false
        music.setVolume(0)
        start_time = 0
        elapsed_time = 0
    } else {
        //  按钮释放亮红灯
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 1)
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
    let min_time2: number;
    let sec_time2: any;
    let min_str2: any;
    let sec_str2: any;
    let show_time2: string;
    
    if (timer_started == true) {
        //  处理分钟和秒数的时间显示格式
        elapsed_seconds = Math.idiv(elapsed_time, 1000)
        min_time2 = Math.idiv(elapsed_seconds, 60)
        sec_time2 = elapsed_seconds % 60
        if (min_time2 < 10) {
            min_str2 = "0" + ("" + ("" + min_time2))
        } else {
            min_str2 = "" + ("" + min_time2)
        }
        
        if (sec_time2 < 10) {
            sec_str2 = "0" + ("" + ("" + sec_time2))
        } else {
            sec_str2 = "" + ("" + sec_time2)
        }
        
        show_time2 = "" + ("" + min_str2) + ":" + ("" + ("" + sec_str2))
        basic.showString(show_time2)
    }
    
})
