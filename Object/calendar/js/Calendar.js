"use strict"

class Calender {
    element  // カレンダーを展開するエレメント
    today    // 今日の日付を持つ
    year     // 表示年
    month    // 表示月 0～11まで、1月は0月とカウントする
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
            return null
        }
        const d = new Date()        // 時分秒までの値を持っている
        //「今日 00:00:00」のインスタンスを生成し属性に割り当てる
        this.today = 
            new Date(d.getFullYear(), d.getMonth(), d.getDate())

        if (year === undefined || month === undefined) {
            if (year === undefined && month !== undefined) {
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

        console.log(id, year, month)

        // コンストラクターでは初期設定のみ行う
    }

    // 指定されたエレメント内にカレンダーを構築する
    build() {
        // this.year年 this.month月の月初を求める
        const startDate = new Date(this.year, this.month, 1)
        // this.year年 this.month月の末日を求める。(翌月の0日目)
        const endDate = new Date(this.year, this.month + 1, 0)

        // constは書き換えができない定数
        // 2個以上の月は処理しないので定数とする
        const month = document.createElement("div")
        month.classList.add("month")    // クラスに「month」を追加する
        // letは何度でも書き換えが可能な変数
        // → 複数の週を処理するためインスタンスを変更する
        let week = document.createElement("div")
        week.classList.add("week")      // クラスに「week」を追加する

        // 月に秋を追加する
        month.appendChild(week)
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
                month.appendChild(week)
            }
            // 翌日へ進む
            startDate.setDate(startDate.getDate() + 1)
        }

        // 1ヶ月分組み上がったので追加する
        this.element.appendChild(month)
    }
}