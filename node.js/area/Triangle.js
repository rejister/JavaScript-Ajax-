"use strict"

/**
 *  Triangle.js
 * 
 *      Diamondクラスを継承したTriangle(三角形)クラス
 *          ひし形と三角形ではパラメータの個数、計算式が同一なので
 *          故障のみを変更する事とする
 */

const Diamond = require("./Diamond.js")

class Triangle extends Diamond {
    constructor() {
        super()     // スーパークラス(Diamond)のコンストラクタを呼ぶ
        this.caption = "三角形"
        //  Diamondクラスで対角線が設定されていたのでそれを取り除く
        // this.params.splice(0)   // 全ての要素を削除する
        // this.params.push({ prompt: "底辺", value: 0 })
        // this.params.push({ prompt: "高さ", value: 0 })
        // this.paramsが２つある
        this.params[0].prompt = "底辺" 
        this.params[1].prompt = "高さ"
    }
}

module.exports = Triangle