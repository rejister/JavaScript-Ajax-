"use strict"

// カレンダークラスのインスタンスを生成
//     引数はセレクターではなくID名
const cal = new Calendar("calendar")

// 使用するテンプレート
const template_name = "template.html"

// DOM直接
// 2025/09/29 onloadの式が間違っていた
//window.onload(e => {
//    // ページ内のファイルが全て読み込み終わった後に動作する
//})
// onloadイベントに対してラムダ式を割り当てる
window.onload = e => {
    // ページ内のファイルが全て読み込み終わった後に動作する
    // テンプレートを読み込む
    cal.loadTemplate(template_name)
    // テンプレート読み込み完了時のイベントにカレンダーを構築するメソッドを割り当てる
    cal.onload = () => {
        // カレンダーを組み立てる
        cal.build()
    }
    
}