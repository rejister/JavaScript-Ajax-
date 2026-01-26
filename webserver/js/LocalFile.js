"use strict"

// ローカルファイルにアクセスするための機能を読み込む
// FileSystemを操作するためのくらす
import fs from 'fs'
// パスを操作するためのくらす
import path from 'path'

/**
 *  URLを下にローカルファイルとのマッピングを行うためのクラス
 *  また、指定されたファイルの内容を読み出す
 *  ※HTTP関連の仕組みは組み込まない
 */

export class LocalFile {
    //  MINE形式一覧
    static mineType = {
        '.txt': 'text/plain',
        '.html': 'text/html',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',

    }
    // web上のルートディレクトリに対するローカルフォルダ
    // #はプライベートな属性
    #rootDir = './'
    get rootDir(){
        return this.#rootDir
    }
    // 不正なフォルダは無視する
    //      ・undefined
    //      ・存在しないフォルダ
    set rootDir(path){
        if (path != undefined) {
            this.#rootDir = path
        }
    }
    //  指定されたURIのファイルを開く
    getFile = (url, callback) => {
        // urlが「/」で終わっているかをチェックする
        if (url.substring(url.length -1) == '/') {
            url += 'index.html'
        }
        //  リクエスト対象となるローカルファイルパスを組み立てる
        const filePath = this.#rootDir + url
        //  拡張子を調べる → MINE形式を特定するため
        const extname = path.extname(filePath).toLowerCase()
        //  登録された一覧から対象を選択する
        //  害王するエントリ⁰がない場合、生データとして処理する
        const contentType = LocalFile.mineType[extname] || 'application/octet-stream'

        //  ファイルの読み込みを実行する
        fs.readFile(filePath, (error, content) => {
            callback(error, content, contentType)
        })
    }

    //  コンストラクタ
    constructor(){}
}