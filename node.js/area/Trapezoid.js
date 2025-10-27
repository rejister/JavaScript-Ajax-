"use strict"

/**
 *  Trapezoid.js 
 * 
 *      Shapeクラスを継承したTrapezoid(台形)クラス
 */

const Shape = require("./Shape.js")

class Trapezoid extends Shape {
    constructor() {
        super() // スーパークラスのコンストラクタを呼ぶ
        this.caption = "台形"
        this.params.push({prompt:"上底",value:0})
        this.params.push({prompt:"下底",value:0})
        this.params.push({prompt:"高さ",value:0})
    }
    calc(){
        this.area = (this.params[0].value + this.params[1].value) * this.params[2].value / 2
        return this.area
    }
}

module.exports = Trapezoid