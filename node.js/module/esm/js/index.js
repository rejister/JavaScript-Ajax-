"use strict";
import readline from "node:readline";
import { kuku } from "./kuku.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("表示したい段数を入力してください（例：8）: ", (answer) => {
    const n = parseInt(answer);
    if (isNaN(n) || n < 1) {
        console.log("正しい数値を入力してください。");
    } else {
        kuku(n);
    }
    rl.close();
});
