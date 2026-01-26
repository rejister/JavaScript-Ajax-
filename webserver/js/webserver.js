" use strict"

/**
 * Webサーバとしてローカルファイルを返すアプリ
 */

// 必要な機能を組み込む
import { createServer, request } from 'node:http'
//  拡張子までつける
import { LocalFile } from './LocalFile.js'

const rootDir = './site'
const localFile = new LocalFile()
localFile.rootDir = rootDir
//  プロパティは属性のようにアクセスができる

//  ポート番号
const port = 8123

//  HTTPサーバインスタンスを生成する
//  リクエストに答えるにコールバック関数を引数に渡す
const server = createServer((request, Response)=> {
    //  リクエストに対する処理を記述する
    console.log('')

    // リクエストに答える
    // const body = 'this is contents.'
    // // HTTPヘッダー情報を創出する
    // Response.writeHead(200,{
    //     'Content-Type': 'text/plain',
    //     'Cyontent-Length' : body.length
    // })
    // // HTTPボディ情報を遮断
    // Response.end(body)

    //  ローカルファイルを開いて中身を取り出す
    localFile.getFile(request.url,(error ,content, contentType) => {
        //  ファイル読み込み時にエラーが発生したかどうかをチャックする
        if (error) {
            //  エラーだった
            //      今回はすべて404 File Not Foundを返す
            Response.writeHead(404, {'Content-Type':'text/plain'})
            Response.end('404 file not found')
        } else {
            //  正しく読み取れた
            //  正常処理の結果コードと、MINE形式を設定する
            Response.writeHead(200, { 'Content-Type':contentType })
            //  ファイルの内容を'utf-8'に変換し送出する
            Response.end(content, 'utf-8')

        }
    })
})
//  HTTPサーバの待受ポート番号を設定する
//  →そのままサーバとしてリクエストの待ち受けに入る
//  非同期処理
server.listen(port)

console.log(`server running at http://localhost:${port}/`)