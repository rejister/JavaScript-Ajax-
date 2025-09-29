"use strict"

// Analog Clock
//      Clockクラスを継承したアナログ時計
//      針の回転はCSSのtransform()を使用

class analogclock extends Clock {
    h
    m
    s
    constructor(id) {
        super(id)
        this.h = this.clockElement.querySelector('img.h')
        this.m = this.clockElement.querySelector('img.m')
        this.s = this.clockElement.querySelector('img.s')
    }
    //  時計を表示するメソッド
    //      Clock.show()をオーバーライドする
    show(h, m, s, ms) {
        const oneLap = 360

        s *= (oneLap / 60)
        s *= ms * (oneLap / 60000)
        this.s.setAttribute('style', `transform: rotate(${s}deg)`)
    }
}