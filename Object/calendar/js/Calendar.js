"use strict"


class Calendar {
    // テンプレートが読み込み完了後に発火するイベント
    onload
    //  テンプレートから読み込んだ属性
    #base
    #header
    #month
    #week
    #day
    //  テンプレートを読み込むメソッド
    //      filename = "./template.html"    ：引数が省略された時の既定値を割り当てる
    loadTemplate(filename = "./template.html") {
        fetch(filename)
            .then(response => response.text())  // → 読み込み完了時のイベント
            .then(html => {                     // → 上記の続き受け取った本文を処理する
                //  読み込んだテンプレート文字列をパースし、DOMに変換する
                const parser = new DOMParser()
                const template = parser.parseFromString(html, 'text/html')
                    .querySelector("div.calendar")

                //  各パーツを変数に割り当てる
                //      cloneNode(true)     子ノードも含めて複製する
                //      cloneNode(false)    指定されたノードのみ複製する
                this.#base = template.cloneNode(false)
                this.#header = template.querySelector("header").cloneNode(true)
                this.#month = template.querySelector("div.month").cloneNode(false)
                this.#week = template.querySelector("div.month .week").cloneNode(false)
                this.#day = template.querySelector("div.month div.day").cloneNode(true)

                // console.log(template)

                // コールバックメソッドが割り当てられているかをチェックし
                if (this.onload !== undefined) {
                    //  コールバックメソッドをコールする
                    this.onload()
                }
            })
            .catch(error => {                   // → 読み込みに失敗した
                console.log(filename, 'の読み込みに失敗しました', error)
            })
    }
    // 曜日を管理する属性
    weekInfo = [
        { class: "sun", caption: "日" },    // 0
        { class: "mon", caption: "月" },    // 0
        { class: "tue", caption: "火" },    // 0
        { class: "wed", caption: "水" },    // 0
        { class: "thu", caption: "木" },    // 0
        { class: "fri", caption: "金" },    // 0
        { class: "sat", caption: "土" },    // 0
    ]
    //  2025/10/16 複数のカレンダーを配置するとidが重複する問題に対応
    id          // カレンダーを展開するエレメントのid
    element     // カレンダーを展開するエレメント
    today       // 今日の日付を持つDateインスタンス
    year        // 表示年
    // 2025-10-06 変更 monthプロパティを getter、setterに置き換える
    #month_val      // 表示月
    get month() {
        return this.#month_val
    }
    set month(m) {
        //  y/m/1の日付を構築する
        const w = new Date(this.year, m, 1)
        //  構築した日付の年と月を属性に割り当てる
        this.year = w.getFullYear();
        this.#month_val = w.getMonth();
    }
    padding = true  // (グリッド表示の際)先頭と末尾に空白を付ける
    /**
     *  引数
     *      id      :カレンダーを展開するエレメントのid
     *      year    :表示年
     *      month   :表示月 0～11まで、1月は0月とカウントする
     *  ※表示年と表示月はセットで指定すること
     */
    constructor(id, year, month) {
        if (id === undefined) {
            console.log("idが指定されていません")
            return
        }
        //  2025/10/16 idを属性にセットする
        this.id = id
        // 今日日付のインスタンスを属性にセットする
        const d = new Date()            // 時分秒までの値を持っている
        // 「今日 00:00:00」のインスタンスを生成し属性に割り当てる
        //  → 2つの日付を比較する際に時間を前もって00:00:00としておく
        this.today =
            new Date(d.getFullYear(), d.getMonth(), d.getDate())

        if (year === undefined || month === undefined) {
            if (year === undefined && month === undefined) {
                year = d.getFullYear()
                month = d.getMonth();
            } else {
                console.log("年と月はセットで指定して下さい")
                return
            }
        }

        if ((this.element = document.getElementById(id)) == null) {
            console.log("指定されたidのエレメントが見つかりません", id)
            return
        }

        // console.log(this.element)

        // 表示年月を属性に割り当てる
        this.year = year
        this.month = month

        console.log(id, year, month)

        // コンストラクターでは初期設定のみを行う
    }

    //  指定された日付を "YYYY-MM-DD"形式の文字列に変換する
    //      → これを日付セルのIDとして使う
    toDateString(date) {
        const y = String(date.getFullYear()).padStart(4, "0")
        const m = String(date.getMonth()).padStart(2, "0")
        const d = String(date.getDate()).padStart(2, "0")

        return `${y}-${m}-${d}`
    }

    //  指定されたエレメント内にカレンダーを構築する
    //      callback:カレンダーが出来上がった後に呼ばれる処理
    build(callback) {
        // this.year年 this.month月の月初を求める
        const startDate = new Date(this.year, this.month, 1)
        // this.year年 this.month月の末日を求める。(翌月の0日目)
        const endDate = new Date(this.year, this.month + 1, 0)

        // これは省略不可
        const base = this.#base.cloneNode(false)

        // 省略可能
        const header = this.#header.cloneNode(true)
        if (header) {
            header.querySelector(".year").innerText = this.year
            header.querySelector(".month").innerText = this.month + 1

            //  baseの子要素にheaderを追加する
            base.appendChild(header)
        }
        //  1ヶ月の処理を行う
        const month = this.#month.cloneNode(false)
        //  baseの子要素にmonthを追加する
        base.appendChild(month)
        //  1週間を表すweek変数をletで宣言する
        //      const 名前  → 定数を宣言する … 再代入は出来ない
        //      let 名前    → 変数を宣言する … 何度でも代入が可能
        let week = this.#week.cloneNode(false)
        month.appendChild(week)

        // 月初の空白セルを追加する
        //      ・this.padding がtrueである
        //      ・startDate.getDay()が0より大きい
        if (this.padding && startDate.getDay() > 0) {
            for (let i = 0; i < startDate.getDay(); i++) {
                const day = this.#day.cloneNode(true)
                week.appendChild(day)
            }
        }
        // 1ヶ月分の繰り返し処理を行う
        while (startDate <= endDate) {
            const day = this.#day.cloneNode(true)
            // 処理日付をセルのIDとして設定する
            //  2025/10/16 日セルidに展開するidで修飾する
            day.setAttribute("id", this.id + '-' + this.toDateString(startDate))
            // 処理日が本日かどうかを判断する
            if (startDate.getTime() == this.today.getTime()) {
                day.classList.add("today")
            }
            // .capエレメントの文字列に処理日を割り当てる
            day.querySelector(".cap").innerText = startDate.getDate()
            //  年、月をセットするエレメント
            const y_cap = day.querySelector(".y-cap")
            if (y_cap) {
                y_cap.innerText = this.year
            }
            const m_cap = day.querySelector(".m-cap")
            if (m_cap) {
                m_cap.innerText = this.#month
            }

            const wday = startDate.getDay()
            const w_cap = day.querySelector(".w-cap")
            // 曜日をセットする
            if (w_cap) {
                w_cap.innerText = this.weekInfo[wday].caption
            }
            day.classList.add(this.weekInfo[wday].class)

            week.appendChild(day)

            // 処理日が土曜日だった → 新しい週を用意する
            if (startDate.getDay() == 6) {
                week = this.#week.cloneNode(false)
                month.appendChild(week)
            }

            // 次の日へ進める
            startDate.setDate(startDate.getDate() + 1)
        }
        // startDateは表示月の翌月1日を示している

        // 月末の空白セルを追加する
        //      ・this.padding がtrueである
        //      ・startDate.getDay()が0より大きい
        if (this.padding && startDate.getDay() > 0) {
            // 指定日から週末まで繰り返す
            for (let i = startDate.getDay(); i < 7; i++) {
                const day = this.#day.cloneNode(true)
                week.appendChild(day)
            }
        }

        //  現在の内容を空にする(以前のカレンダーを削除する)
        this.element.innerHTML = ''
        //  新しく組み上がったカレンダーを割り当てる
        this.element.appendChild(base)

        // 2025/10/16 カレンダーが組み上がった後にコールバック処理を行うように修正
        if (callback !== undefined) {
            callback(this)
        }

        return

        //  constは書き換えが出来ない定数
        //  → 2個以上の月は処理しないので定数とする
        // const month = document.createElement("div")
        // month.classList.add("month")    // クラスに「month」を追加する
        //  letは何度でも書き換えが可能な変数
        //  → 複数の週を処理するためインスタンスを変更する
        // let week = document.createElement("div")
        // week.classList.add("week")

        // 月に週を追加する
        month.appendChild(week)
        // 1ヶ月の繰り返し処理
        while (startDate <= endDate) {
            // console.log(startDate.toISOString())
            // document.createElement(エレメント名)
            const day = document.createElement("div")
            day.classList.add("day")
            day.innerText = startDate.getDate()
            week.appendChild(day)
            // getDay() 曜日を0～6の値で返す
            if (startDate.getDay() == 6) {
                week = document.createElement("div")
                week.classList.add("week")

                month.appendChild(week)
            }

            // 翌日へ進む
            startDate.setDate(startDate.getDate() + 1)
        }

        // 1ヶ月分組み上がったので追加する
        this.element.appendChild(month)
    }
    //  次の月へ
    next() {
        this.month += 1
    }
    //  前の月へ
    previous() {
        this.month -= 1
    }
}