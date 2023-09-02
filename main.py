elapsed_seconds = 0
elapsed_time = 0
start_time = 0
music_played = False
timer_started = False
min_time = 0
sec_time = 0
min_str = ""
sec_str = ""
show_time = ""
# 检测时间，单位：分钟
detect_time = 1
# 显示开机画面
basic.show_icon(IconNames.HAPPY)
basic.show_icon(IconNames.SURPRISED)
basic.show_icon(IconNames.GIRAFFE)
basic.show_icon(IconNames.HEART)
basic.show_string("Let's GO!")

def on_forever():
    global timer_started, music_played, start_time, elapsed_time
    if input.pin_is_pressed(TouchPin.P2):
        # 按钮被按下亮绿灯，并且重置变量和设置喇叭静音
        pins.digital_write_pin(DigitalPin.P8, 1)
        pins.digital_write_pin(DigitalPin.P12, 0)
        music.stop_all_sounds()
        timer_started = False
        music_played = False
        start_time = 0
        elapsed_time = 0
    else:
        # 按钮释放亮红灯
        pins.digital_write_pin(DigitalPin.P8, 0)
        pins.digital_write_pin(DigitalPin.P12, 1)
        # 若计时器没有开始计时，获取计时器开始计时的时间并且置位计时器变量
        if not (timer_started):
            start_time = input.running_time()
            timer_started = True
        else:
            # 计算从开始计时至今的逝去时间，单位为微妙
            elapsed_time = input.running_time() - start_time
            # 当逝去时间超过检测时间，开始报警
            if elapsed_time >= detect_time * 1000 * 1000:
                if music_played == False:
                    music_played = True
                    music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
                        music.PlaybackMode.LOOPING_IN_BACKGROUND)
basic.forever(on_forever)

# 时间显示

def on_forever2():
    global elapsed_seconds
    if timer_started == True:
        # 处理分钟和秒数的时间显示格式
        elapsed_seconds = Math.idiv(elapsed_time, 1000)
        min_time2 = Math.idiv(elapsed_seconds, 60)
        sec_time2 = elapsed_seconds % 60
        if min_time2 < 10:
            min_str2 = "0" + ("" + str(min_time2))
        else:
            min_str2 = "" + str(min_time2)
        if sec_time2 < 10:
            sec_str2 = "0" + ("" + str(sec_time2))
        else:
            sec_str2 = "" + str(sec_time2)
        show_time2 = "" + str(min_str2) + ":" + ("" + str(sec_str2))
        basic.show_string(show_time2)
basic.forever(on_forever2)
