"use strict"

//element //カレンダーを展開するエレメント
//today //今日の日付を持つDateインスタンス
//year //表示年
//month //表示付き 
//1月は0月 月は0から数える

class Calendar {
    //テンプレートから読み込んだ属性
    #base
    #header
    #month
    #week
    #day
    //テンプレート読み込みメソッド
    //引数が省略された際の既定値を割り当てる
    loadTemplate(filename = "./template.html"){
        fetch(filename)
            .then(response => response.text()) //読み込み完了時のイベント
            .then(html => { //受け取った本文の処理
                //読み込んだテンプレート文字列をパース、DOMに変換
                const parser = new DOMParser()
                const template = parser.parseFromString(html, 'text/html').querySelector("div.calendar")

                //各パーツを変数に割り当てる
                //cloneNode(true) 子ノードも含めて複製
                //cloneNode(false) 指定されたノードのみ複製
                this.#base = template.cloneNode(false)
                this.#header = template.querySelector("header").cloneNode(true)
                this.#month = template.querySelector("div.month").cloneNode(false)
                this.#week = template.querySelector("div.month .week").cloneNode(false)
                this.#day = template.querySelector("div.month div.day").cloneNode(true)

                // console.log(template)
            })
            .catch( error => { //例外 読み込みに失敗
                console.log(filename, 'の読み込みに失敗しました', error)
            })
    }

    //引数　id(カレンダー展開),year,month
    constructor(id, year, month){
        if(id === undefined){
            console.log("idが指定されていません")
            return
        }
        //今日の日付のインスタンスを属性にセットする
        const d = new Date()
        //今日の　00：00：00　のインスタンスを生成し属性に割り当てる
        //2つの日付を比較する際に時間を前もって　00：00：00　としておく
            this.today =
                new Date(d.getFullYear(),d.getMonth(),d.getDate())

        if(year === undefined || month === undefined){
            if(year === undefined || month === undefined){
                year = d.getFullYear()
                month = d.getMonth();
            // console.log("id is not")
            }else{
                console.log("年と月はセットで指定してください")
                return
            }
        }
        if(this.element = document.getElementById(id) == null){
            console.log("指定されたidのエレメントが見つかりません", id)
            return
        }

        this.year = year
        this.month = month

        this.element = document.getElementById(id)
        console.log(this.element)

        console.log(id, year, month)
        //コンストラクタでは初期設定のみ
    }
    //指定されたエレメント内にカレンダーを構築する
    build(){
        //this.year年 this.month月の月初を求める
        const startDate = new Date(this.year,this.month, 1)
        //this.year年 this.month 月の末日を求める 翌月の0日目
        const endDate = new Date(this.year, this.month + 1, 0)

        const base = this.#base.cloneNode(false)

        const header = this.#header.cloneNode(true)
        header.querySelector(".year").innerText = this.year
        header.querySelector(".month").innerText = this.month + 1

        //baseの子要素にheaderを追加
        base.appendChild(header)

        //現在の内容を空にする
        this.element.innerHTML = ''
        this.element.appendChild(base)

        return

        //2個以上の月は処理しないで定数
        const month = document.createElement("div")
        month.month = document.createElement("div")
        //複数の週を処理するためインスタンスを変更する
        let week = document.createElement("div")
        week.classList.add("week")

        //1ヶ月の繰り返し処理
        while(startDate <= endDate){
            // console.log(startDate.toISOString())
            const day = document.createElement("div")
            day.classList.add("day")
            day.innerText = startDate.getDate()
            week.appendChild(day)
            //getDay()　曜日を0～6の間の値で返す
            if(startDate.getDay() == 6){
                let week = document.createElement("div")
                week.classList.add("week")
            }

            //翌日へ進む
            startDate.setDate(startDate.getDate() +1)
        }

        //1ヶ月分組み上がったので追加
        this.element.appendChild(month)
    }
}