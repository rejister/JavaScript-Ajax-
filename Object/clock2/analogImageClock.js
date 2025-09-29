"use strict"
// 自作アナログ時計用クラス
class jisakuAnalogclock {

    #hourHand  
    #minuteHand 
    #secondHand 

    //  現在動作中のインターバルID
    //      未動作時は「0」
    #interval_id

    #clock_element

    get clockElement() {
        return this.#clock_element
    }
    
    // コンストラクタ―
    constructor(eid) {
    this.#interval_id = 0
    this.#clock_element = document.getElementById(eid)
    this.#hourHand = document.getElementById("hour")
    this.#minuteHand = document.getElementById("minute")
    this.#secondHand = document.getElementById("second")
}
start() {
        if (this.#interval_id == 0) {
            // 第1引数：コールバックメソッド
            // 第2引数：インターバル間隔
            // 第3引数：インスタンス
            this.#interval_id = setInterval(()=> this.update(), 100)
        }
    }

    //  時計を停止する
    stop() {
        if (this.#interval_id != 0) {
            clearInterval(this.#interval_id)
            this.#interval_id = 0
        }
    }

    update() {
        const time = new Date()
        const hDeg = time.getHours()*30+time.getMinutes()*0.5
        const mDeg = time.getMinutes()*6
        const sDeg= time.getSeconds()*6
        this.#hourHand.style.transform = `rotate(${hDeg}deg)`
        this.#minuteHand.style.transform = `rotate(${mDeg}deg)`
        this.#secondHand.style.transform = `rotate(${sDeg}deg)`
    }
}
