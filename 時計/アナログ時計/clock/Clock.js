"use strict"

class Clock {
    #clock_element;
    #interval_id = 0;
    constructor(selector) {
        this.#clock_element = document.querySelector(selector);
    }

    start() {
        if (this.#interval_id) return; // すでに動作中なら何もしない
        this.#update(); // すぐに1回表示
        this.#interval_id = setInterval(() => this.#update(), 1000);
    }

    stop() {
        if (this.#interval_id) {
            clearInterval(this.#interval_id);
            this.#interval_id = 0;
        }
    }

    #update() {
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        this.show(h, m, s);
    }

    show(h, m, s) {
        if (this.#clock_element) {
            const hh = String(h).padStart(2, '0');
            const mm = String(m).padStart(2, '0');
            const ss = String(s).padStart(2, '0');
            // 各桁のimg要素を取得
            const ids = ['h1', 'h2', 'm1', 'm2', 's1', 's2'];
            const nums = [hh[0], hh[1], mm[0], mm[1], ss[0], ss[1]];
            ids.forEach((id, i) => {
                const img = document.getElementById(id);
                if (img) {
                    // 8だけ小文字pngなので例外処理
                    let num = nums[i];
                    let ext = (num === '8') ? 'png' : 'PNG';
                    img.src = `../dezital/${num}.${ext}`;
                    img.alt = num;
                }
            });
        }
    }
}

/**
 * #clock_element 時計を表示するエレメント
 * #interval_id 現在動作中うのインターバルID、未動作時は「0」
 * 
 * start() インターバルタイマーを開始する
 * 
 * stop() インターバルタイマーを停止する
 * 
 * #update() インターバルタイマーコールバック関数（メソッド）
 *           →showメソッドに現在の時刻を渡す
 * 
 * show(h,m,s) ページ内に指定された時間を表示するメソッド
 * 
 */