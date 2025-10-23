"use strict"

/**
 * Shapeクラス
 *      形に応じた面積を計算する基底クラス
 */
class Shape {
    constructor() {
        // コンストラクタ内で属性を定義する
        this.area = 0
        this.caption = "形"
        this.params = []
    }
    // 以下のメソッド内容は形によって違いがあるがこのクラスでは共通部を記述する
    input(prompt){
        console.log(`${this.caption}の面積を計算します`)
        for(let i  = 0 ; i < this.params.length ; i++){
            this.params[i].value = parseFloat(prompt(`${this.params[i].prompt}: `)) 
        }
    }
    calc(){
        this.area = 0
        return this.area
    }
    print(){
        console.log(`面積は${this.area}です`)
    }
}

module.exports = Shape