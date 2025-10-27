#!/usr/bin/env node

"use strict"

console.log("hello world")

// (1 + 2) * 3

const stack = []

// スタックに「１」と「２」を置く
stack.push(1)
stack.push(2)
// スタックから値を取り出す
let v2 = stack.pop()
let v1 = stack.pop()

// 計算した結果をスタックに置く
stack.push(v1 + v2)

// スタックに「３」を置く
stack.push(3)

// スタックから値を取り出す
v2 = stack.pop()
v1 = stack.pop()

// 計算した結果をスタックに置く
stack.push(v1 * v2)

console.log("計算結果は",stack[0])