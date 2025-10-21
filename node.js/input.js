"use strict"

// requier('readline'):readline拡張機能を読み込む
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('input number>', input => {
    console.log(input)
    readline.close()
})