let elapsed_seconds = 0
let elapsed_time = 0
let start_time = 0
let timer_started = false
let music_played = false
let detect_time = 0
let min_time = 0
let sec_time = 0
let min_str = ""
let sec_str = ""
let show_time = ""
//  检测时间，单位：分钟
detect_time = 1
//  显示开机画面
basic.showIcon(IconNames.Happy)
basic.showIcon(IconNames.Heart)
basic.clearScreen()
pause(500)
basic.showString("GO!")
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
        led.enable(false)
        pause(3200)
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
            led.enable(true)
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
    let min_time: number;
    let sec_time: number;
    let min_str: string;
    let sec_str: string;
    let show_time: string;
    
    if (timer_started == true) {
        //  处理分钟和秒数的时间显示格式
        elapsed_seconds = Math.idiv(elapsed_time, 1000)
        min_time = Math.idiv(elapsed_seconds, 60)
        sec_time = elapsed_seconds % 60
        if (min_time < 10) {
            min_str = "0" + ("" + ("" + min_time))
        } else {
            min_str = "" + ("" + min_time)
        }
        
        if (sec_time < 10) {
            sec_str = "0" + ("" + ("" + sec_time))
        } else {
            sec_str = "" + ("" + sec_time)
        }
        
        show_time = "" + min_str + ":" + ("" + sec_str)
        basic.showString(show_time, 90)
    }
    
})
