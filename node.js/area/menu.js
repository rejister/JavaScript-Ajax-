"use strict"

/**
 *  menu関数
 *      shapes配列にセットされた形を一覧表示し選択する関数
 * 
 * @param {*} shapes ：面積を計算するオブジェクトをまとめた配列変数
 * @param {*} prompt ：プロンプト付きキーボード入力オブジェクト
 * 
 *  返し値 ：選択した形のオブジェクト
 */

const menu = (shapes, prompt) => {
    let type = 0
    do {
        shapes.forEach((s,i) => {
            const index = String(i+1).padStart(2," ")
            console.log(`${index}:${s.caption}`)
        })

        type = parseInt(prompt(`形をしてして下さい(1～${shapes.length}) `))
    }while( isNaN(type) || type < 1 || type > shapes.length)

    return shapes[type -1]
}

module.exports = menu