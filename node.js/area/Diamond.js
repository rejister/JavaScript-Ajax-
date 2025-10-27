"use strict"

/**
 * Rectangle.js 
 * 
 *      Shapeクラスを継承したDiamond(ひし形)クラス
 */

const Shape = require("./Shape.js")

class Diamond extends Shape {
    constructor() {
        super() // スーパークラスのコンストラクタを呼ぶ
        this.caption = "ひし形"
        this.params.push({prompt:"対角線 1",value:0})
        this.params.push({prompt:"対角線 2",value:0})
    }
    calc(){
        this.area = this.params[0].value * this.params[1].value / 2
        return this.area
    }
}

module.exports = Diamond