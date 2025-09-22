"use strict"

/**
 *  ・時計を表現するクラス
 *      例)
 *          const clock = new Clock("clock")
 *          clock.start()
 */
class Clock {
    //  展開先エレメント
    //      プロパティ
    //          getを実装、setは省略
    #clock_element
    get clockElement() {
        return this.#clock_element
    }
    //  現在動作中のインターバルID
    //      未動作時は「0」
    #interval_id

    //  コンストラクター
    //      時計を展開するエレメントIDを引数とする
    constructor(eid) {
        this.#interval_id = 0
        this.#clock_element = document.getElementById(eid)

    }

    //  時計を開始する
    start() {
        if (this.#interval_id == 0) {
            // 第1引数：コールバックメソッド
            // 第2引数：インターバル間隔
            // 第3引数：インスタンス
            this.#interval_id = setInterval(this.#update, 100, this)
        }
    }

    //  時計を停止する
    stop() {
        if (this.#interval_id != 0) {
            clearInterval(this.#interval_id)
            this.#interval_id = 0
        }
    }

    //  インターバルでコールパックするメソッド
    #update(me) {
        // JavaScriptは thisがシーンによって変化する
        //  ※ Javaでは必ず自インスタンスを示す
        let now = new Date()
        // 時分秒を2桁で0パディングする
        const h = now.getHours().toString().padStart(2, "0")
        const m = now.getMinutes().toString().padStart(2, "0")
        const s = now.getSeconds().toString().padStart(2, "0")

        // 時分秒をパラメータとして表示メソッドを呼び出す
        me.show(h, m, s)
    }

    //  時計を表示するメソッド
    show(h, m, s) {
        this.#clock_element.innerText = `${h}:${m}:${s}`
    }
}
