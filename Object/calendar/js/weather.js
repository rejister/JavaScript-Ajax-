"use strict"

/**
 *  天気予報APIを使い天気情報を読み出す関数
 *  fetchを簡素化した関数
 *
 *  引数
 *      url:取り込みたいデータのURL
 *      callback:取り込み完了時に処理する機能を割り当てる
 *      errorCallback:エラー発生時のコールバック
 */
const getFotcast = (callback, errorCallback) => {
    const url = "https://weather.tsukumijima.net/api/forecast/city/370000"

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (callback) {
                callback(data)
            }
        })
        .catch(error => {
            if (errorCallback) {
                errorCallback(url, error)
            } else {
                console.log("fetchエラー", url, error)
            }
        })
}

//  天気予報データ
let forecast = false
//  天気予報データを読み込む
getFotcast(data => {forecast = data})

// /**
//  *  天気予報APIのオブジェクトをページ内に展開するコールバック関数
//  *  引数
//  *      data:天気予報APIのオブジェクト
//  */
// const buildPage = data => {
//     //  タイトル
//     document.getElementById("title").innerText = data.title
//     //  概況
//     document.getElementById("description").innerText =
//         data.description.text
//     //  日付
//     document.getElementById("date").innerText =
//         data.forecasts[0].date
//     //  天気アイコン
//     const img = document.querySelector("#today > img")
//     img.src = data.forecasts[0].image.url
//     img.alt = data.forecasts[0].image.title
// }

// // ページ読み込み後処理
// window.onload = e => {
//     const url = "https://weather.tsukumijima.net/api/forecast/city/370000"
//     get(url, buildPage)
// }