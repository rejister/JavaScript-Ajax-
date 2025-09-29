"use strict"

// カレンダークラスのインスタンスを生成
//     引数はセレクターではなくID名
const calendar = new Calendar("calendar")

// DOM直接
// 2025/09/29 onloadの式が間違っていた
//window.onload(e => {
//    // ページ内のファイルが全て読み込み終わった後に動作する
//})
// onloadイベントに対してラムダ式を割り当てる
window.onload = e => {
    // ページ内のファイルが全て読み込み終わった後に動作する
}