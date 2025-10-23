"use strict"

/**
 *  Circle.js 
 * 
 *      Shapeクラスを継承したCircle(円形)クラス
 */

const Shape = require("./Shape.js")

class Circle extends Shape {
    constructor() {
        super() // スーパークラスのコンストラクタを呼ぶ
        this.caption = "円形"
        this.params.push({prompt:"半径",value:0})
    }
    calc(){
        this.area = this.params[0].value * this.params[0].value * Math.PI
        return this.area
    }
}

module.exports = Circle