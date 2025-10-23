"use strict"

/**
 * Rectangle.js 
 * 
 *      Shapeクラスを継承したRectangle(長方形)クラス
 */

const Shape = require("./Shape.js")

class Rectangle extends Shape {
    constructor() {
        super() // スーパークラスのコンストラクタを呼ぶ
        this.caption = "長方形"
        this.params.push({prompt:"横",value:0})
        this.params.push({prompt:"縦",value:0})
    }
    calc(){
        this.area = this.params[0].value * this.params[1].value
        return this.area
    }
}

module.exports = Rectangle