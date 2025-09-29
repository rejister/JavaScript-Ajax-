"use strict"


class Calendar {
    onload
    // テンプレートから読み込んだ属性
    #base
    #header
    #month
    #week
    #day
    // テンプレートを読み込むメソッド
    //      filename = "./template.html"      :引数が省略された時の値
    loadTemplate(filename = "./template.html"){
        fetch(filename)
            .then(response => response.text())  // → 読み込み完了時のイベント
            .then(html => {                     // → 上記の続き受け取った本文を処理
                // 読み込んだテンプレート文字列をパースし、DOMに変換する
                const parser = new DOMParser()
                const template = parser.parseFromString(html, 'text/html').querySelector("div.calendar")

                this.#base = template.cloneNode(false)
                this.#header = template.querySelector("header").cloneNode(true)
                this.#month = template.querySelector("div.month").cloneNode(false)
                this.#week = template.querySelector("div.month .week").cloneNode(false)
                this.#day = template.querySelector("div.month div.day").cloneNode(true)

                // console.log(template)
                // コールバックメソッドが割り当てられてるか確認する
                if (this.onload !== undefined) {
                    // コールバックメソッドをコールする
                    this.onload()
                }
            })
            .catch(error => {                   // → 読み込みに失敗
                console.log(filename, 'の読み込みに失敗しました', error)
            })
    }
    // element  // カレンダーを展開するエレメント
    // today    // 今日の日付を持つ
    // year     // 表示年
    // month    // 表示月 0～11まで、1月は0月とカウントする
    /**
     * 引数
     *     id      : カレンダーを展開するエレメントのid
     *     year    : 表示年
     *     month   : 表示月 0～11まで、1月は0月とカウントする
     * ※表示年と表示月はセットで指定すること
     */
    constructor(id, year, month) {
        if (id === undefined) {
            console.log("idが指定されていません")
            return
        }
        const d = new Date()        // 時分秒までの値を持っている
        //「今日 00:00:00」のインスタンスを生成し属性に割り当てる
            this.today = 
                new Date(d.getFullYear(), d.getMonth(), d.getDate())

        if (year === undefined || month === undefined) {
            if (year === undefined && month === undefined) {
                year = d.getFullYear()
                month = d.getMonth()
            }else {
                console.log("年と月はセットで指定してください")
                return
            }
        }

        if((this.element = document.getElementById(id)) == null) {
            console.log("指定されたidのエレメントが見つかりません", id)
            return
        }

        // console.log(this.element)

        // 表示年月を属性に割り当てる
        this.year = year
        this.month = month

        this.element = document.getElementById(id)
        console.log(this.element)

        console.log(id, year, month)

        // コンストラクターでは初期設定のみ行う
    }

    // 指定された日付を "YYYY-MM-DD" 形式の文字列に変換する
    //     → これを日付セルのIDとして使う
    toDateString(date) {
        const y = String(date.getFullYear()).padStart(4, "0")
        const m = String(date.getMonth()).padStart(2, "0")
        const d = String(date.getDate()).padStart(2, "0")

        return `${y}-${m}-${d}`
    }


    // 指定されたエレメント内にカレンダーを構築する
    build() {
        // this.year年 this.month月の月初を求める
        const startDate = new Date(this.year, this.month, 1)
        // this.year年 this.month月の末日を求める。(翌月の0日目)
        const endDate = new Date(this.year, this.month + 1, 0)

        const base = this.#base.cloneNode(false)

        const header = this.#header.cloneNode(true)
        header.querySelector(".year").innerText = this.year
        header.querySelector(".month").innerText = this.month + 1

        // baseの子要素にheaderを追加する
        base.appendChild(header)

        // 1ヶ月の処理を行う
        const month = this.#month.cloneNode(false)
        // baseの子要素にmonthを追加する
        base.appendChild(month)
        // 1週間を表すweek変数をletで宣言する
        //     const 名前 → 定数を宣言する … 再代入はできない
        //     let 名前   → 変数を宣言する … 段戸でも代入が可能
        let week = this.#week.cloneNode(false)
        month.appendChild(week)

        // 1ヶ月分の繰り返し処理を行う
        while(startDate <= endDate){
            const day = this.#day.cloneNode(true)
            // 処理日付をセルのIDとして設定する
            day.setAttribute("id", this.toDateString(startDate))
            // .capエレメントの文字列に処理日を割り当てる
            day.querySelector(".cap").innerText = startDate.getDate()
            week.appendChild(day)

            // 処理日が土曜日だった → 新しい週を用意する
            if (startDate.getDay() == 6) {
                week = this.#week.cloneNode(false)
                month.appendChild(week)
            }

            // 次の日へ進める
            startDate.setDate(startDate.getDate() + 1)
        }

        // 現在の内容を空にする
        this.element.innerText = ''
        this.element.appendChild(base)

        return


        // constは書き換えができない定数
        // 2個以上の月は処理しないので定数とする
        // const month = document.createElement("div")
        // month.month = document.createElement("div")    // クラスに「month」を追加する
        // letは何度でも書き換えが可能な変数
        // → 複数の週を処理するためインスタンスを変更する
        // let week = document.createElement("div")
        // week.classList.add("week")      // クラスに「week」を追加する

        // // 月に週を追加する
        // month.appendChild(week)
        // 1ヶ月の繰り返し処理
        while (startDate <= endDate) {
            // console.log(startDate)
            // document.createElement(エレメント名)
            const day = document.createElement("div")
            day.classList.add("day")    // クラスに「day」を追加する
            day.innerText = startDate.getDate()
            week.appendChild(day)
            if (startDate.getDay() == 6) {
                week = document.createElement("div")
                week.classList.add("week")
                // month.appendChild(week)
            }
            // 翌日へ進む
            startDate.setDate(startDate.getDate() + 1)
        }

        // 1ヶ月分組み上がったので追加する
        this.element.appendChild(month)
    }
}