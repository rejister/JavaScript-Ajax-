"use strict"

// cahange.js
// キーボードから入力された数値を効果の組み合わせを計算する
// 入力値は1円以上〜1000円未満
// ※効果の種類は以下の通り
// 500円、100円、50円、10円、5円、1円

// 金額を入力してください: 576
// 硬貨の組み合わせは以下の通りです
// 500円: 1枚
// 100円: 0枚
// 50円: 1枚
// 10円: 2枚
// 5円: 1枚
// 1円: 1枚

"use strict";

// Node.js の readline モジュールを使ってキーボード入力を受け取る
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question("金額を入力してください (1〜999): ", (input) => {
    const amount = parseInt(input, 10);

  // 入力チェック
    if (isNaN(amount) || amount < 1 || amount >= 1000) {
        console.log("1円以上1000円未満の数値を入力してください。");
        readline.close();
        return;
    }

    console.log("硬貨の組み合わせは以下の通りです：");

  // 各硬貨の種類（大きい順）
    const coins = [500, 100, 50, 10, 5, 1];
    let remaining = amount;

    for (const coin of coins) {
        const count = Math.floor(remaining / coin);
        remaining %= coin;
        // 0枚のときは出力しない
        if (count > 0) {
            console.log(`${coin}円: ${count}枚`);
        }   
    }

    readline.close();
});