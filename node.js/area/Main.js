"use strict"

//  同期入力関数
const prompt = require("./prompt.js")

//  面積を計算するクラス
//      長方形
const Rectangle = require("./Rectangle.js")
//      円形
const Circle = require("./Circle.js")
//      ひし形
const Diamond = require("./Diamond.js")
//      三角形
const Triangle = require("./Triangle.js")
//      台形
const Trapezoid = require("./Trapezoid.js")

//  面積を計算する図形をまとめた配列変数
const shapes = [
    new Rectangle(),
    new Circle(),
    new Diamond(),
    new Triangle(),
    new Trapezoid()
]

//  menu 関数を読み込む
const menu = require("./menu.js")

//  計算する図形を選択する
const shape = menu(shapes, prompt)

shape.input(prompt)
shape.calc()
shape.print()
