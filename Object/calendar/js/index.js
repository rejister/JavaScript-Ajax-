"use strict"

// カレンダークラスのインスタンスを生成する
//      引数はセレクターではなくID名
//  2025-10-06 変更 グリッド表記のカレンダーを丈夫に2つ表示する
//      今月の一覧形式のカレンダー
const cal_list = new Calendar("list-calendar")
//      前月のグリッド形式のカレンダー
const cal_prev = new Calendar("cal_prev",cal_list.year,cal_list.month-1)
//      次月のグリッド形式のカレンダー
const cal_next = new Calendar("cal_next",cal_list.year,cal_list.month+1)

// 使用するテンプレート
const template_name = "template.html"
const template_grid = "grid.html"
const template_list1 = "list1.html"
cal_list.padding = false // リスト表示に空白セルをつけない

// DOM直接
//  2025/09/29 onloadの式が間違っていた
// window.onload(e => {
//     // ページ内のファイルが全て読み込み終わった後に動作する
// })
//  onloadイベントに対してラムダ式を割り当てる
window.onload = e => {
    // ページ内のファイルが全て読み込み終わった後に動作する
    //  テンプレートを読み込む
    //  2025-10-06 変更 前月+次月：グリッド、今月：リスト
    // cal.loadTemplate(template_grid)
    //      前月と次月はグリッドテンプレート
    cal_prev.loadTemplate(template_grid)
    cal_next.loadTemplate(template_grid)
    //      今月はリストテンプレート
    cal_list.loadTemplate(template_list1)
    //  テンプレート読み込み完了時のイベントに
    //  カレンダーを構築するメソッドを割り当てる
    //  2025-10-06 変更 3つのインスタンスに対応する
    cal_prev.onload = () => {
        //  カレンダーを組み立てる
        cal_prev.build()
    }
    cal_next.onload = () => {
        //  カレンダーを組み立てる
        cal_next.build()
    }
    cal_list.onload = () => {
        cal_list.build()
    }

    //  2025-10-06 月移動機能追加
    //      次の月へ移動
    cal_next.element.onclick = e => {
        cal_list.next()
        cal_list.build()
        cal_prev.next()
        cal_prev.build()
        cal_next.next()
        cal_next.build()
    }
    //      次の月へ移動
    cal_prev.element.onclick = e => {
        cal_list.previous()
        cal_list.build()
        cal_prev.previous()
        cal_prev.build()
        cal_next.previous()
        cal_next.build()
    }
}

// // jQuery
// $(()=>{
//
// })
