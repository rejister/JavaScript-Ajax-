"use strict"
/**
 * 1.Object フォルダを作成する
 * 2.Calender.js ファイルを作成する
 * 3.index.html ファイルを作成する
 * 
 */

// console.log('hello world');

/**
 * クラス宣言
 */
class Calender {
    /**
     * static そのクラスに所属する属性・フィールド、メソッドを宣言する
     */
    static msg = "static field"
    static showMsg(){
        console.log(Calender.msg)
    }
    /**
     * 属性・フィールド
     * 先頭に「#」をつけるとプライベート宣言となる
     */
    #today
    /**
     * プロパティ
     *  getで宣言したメソッドで値を取り出し、
     *  setで宣言したメソッドで値を割り当てる
     * 
     *  get プロパティ名()
     *  set プロパティ名(引数)
     */
    get today(){
        return this.#today
    }
    set today(arg){
        // arg が undefined ではない
        // arg が Dateクラスのインスタンスである
        if(arg != undefined && arg.constructor.name == 'Date'){
            // 上記2つの条件を満たした場合、値をセットする
            this.#today = arg
        }
    }
    /**
     * コンストラクター
     * ※ new のタイミングで動作するメソッド
     */
    constructor(){
        // console.log("constructor")
        // 確認用

        // 属性に現在の日時を割り当てる
        this.#today = new Date()
        // 新しい属性を追加する
        //      元旦の日付を割り当てる
        this.newYerarsDay = new Date(this.#today.getFullYear(),1,1)
    }
    /**
     * 現在の日時をUTC形式で記録するメソッド
     */
    print(){
        let d = new Date()
        console.log(d)
    }
    printToday(){
        console.log(this.#today)
    }
}


/**
 * Calenderクラスを継承したCalenderJPクラス
 * 日付を日本形式で表す
 */
class CalenderJP extends Calender {
    #jp
    constructor(){
        // 継承元のコンストラクターを呼び出す
        super()
        // 日付の書式を「ja-JP」とする
        this.#jp = Intl.DateTimeFormat('ja-JP-u-ca-japanese',{
            calender: 'japanese', // 和暦
            era: 'long',       
        })
    }
    // メソッドのオーバーライド
    print(){
        // 継承元クラスのメソッドを呼び出す
        // super.print()
    }
    // 本日の日付を日本形式で出力する
    printToday(){
        console.log(this.#jp.format(this.today))
    }
}