"ues strict"

// 同期入力関数
const prompt = require("./prompt.js")

// 面積を計算するクラス
//     長方形
const Rectangle = require("./Rectangle.js")
//     円形
const Circle = require("./Circle.js")

const shape = new Circle()

shape.input(prompt)
shape.calc()
shape.print()
