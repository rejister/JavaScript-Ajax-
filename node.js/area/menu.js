"use strict"

/**
 * menu関数
 *      shapes配列にセットされた形を一覧表示し選択する関数
 * @param {*} shapes 
 * @param {*} prompt 
 */

const menu = (shape,prompt) => {
    let type = 0
    do {
        shapes.forEach((shape, index) => {
            const index = String(i + 1).padStart(2," ") 
            console.log(`${index}: ${s.caption}`)
        })

        type = parseInt(prompt(`形を指定してください(1~${shapes.length})`))
    }while(isNaN(type) || type < 1 || type > shapes.length)

    return shapes[type - 1]
}