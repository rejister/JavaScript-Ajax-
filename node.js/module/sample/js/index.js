"use strict"

// 1 ~ 100の中で素数を求めるプログラム
// その数以外で割ることがでいない自然数

const prime = require("./prime.js")

for (let n = 2; n <= 100; n++) {
    if (prime(n)) {
        console.log(n);
    }
}

// 結果
/*
2
3
5
7
11
・
・
 */