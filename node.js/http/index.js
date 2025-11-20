"use strict";
// Node.jsでHTTPサーバアプリを作成する

// httpクラスを読み込む
const http = require("http");

// httpサーバインスタンスを生成する
//      request: クライアントからの要求インスタンス
//      response: サーバからクライアントへ結果を返却するためのインスタンス
const server = http.createServer((request,response) => {
    // クライアントからのリクエスト内容をコンソールに出力する
    console.log("request url:",request.url)

    switch(request.url){
        case "/":
            // wirteHead(レスポンスコード（整数値）,レスポンスヘッダー（ディクショナリ))
            response.writeHead(200,{
                "Content-Type":"text/plain"     // HTMLを返す場合 text/html を指定する
            })

            response.end(`abc`)
            break;
        default:
            response.writeHead(404, {
                "Content-Type":"text/html"
            });
            response.end(`<p>禁止されています</p>`)
    }
})

// サーバは10080ポートで待ち受ける
//    0〜1023 まではwindows以外root権限が必要
server.listen(10081);
