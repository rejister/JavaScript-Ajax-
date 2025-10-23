"use strict"

/**
 *  prompt：同期入力を行うための関数
 */

//  fs機能を読み込む
const fs = require('fs')

//  入力バッファを1024バイト分用意する
const buffer = Buffer.alloc(1024)
/**
 *  プロンプト付き動機入力関数
 *  
 *      question:プロンプト文字列
 */
const prompt = question => {
    // プロンプトを表示する
    process.stdout.write(question)
    // 同期入力処理
    //      fs.readSync(ファイルディスクリプタ, バッファの場所, バッファ内読み込み開始位置, 読み込みバイト数, ファイル位置)
    const bytes = fs.readSync(0, buffer, 0, buffer.length, null)
    // バッファのデータを文字列に変換して返却する
    return buffer.toString("utf8", 0, bytes).trim()
}
// prompt
module.exports = prompt