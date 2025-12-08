// tscコマンドを実行すると"use strict"が自動で追加される
//  TypeScript自体型をチェックを厳密に行うので特に"use strict"を明示的に書く必要はない

console.log("hello,world")

// 文字列変数を宣言する
let s : string

// s = 100
// 文字列変数に対して数値を代入することはできない

s = 'hello TypeScript world'
console.log('文字列',s)
// 数値を文字列に変換して代入する
s = String(1000)
console.log('文字列',s)

// 変数nを数値型で宣言する
let n : number
n = 1000

// 型の異なる変数間で直接代入することはできない
// n = s
// s = n

// 論理型
let b : boolean
b = true
b = false

// オブジェクト型
let o : object

// 文字列の配列型
let a : Array<string>
a = new Array()
// a.push(100) // 文字列の配列型を宣言しているので数値は入らない
a.push("abc")

// any型(全ての型にマッチ)の配列変数
let all : Array<any>

all = []
all.push("def")
all.push(123)

// null         意図的に値が存在しないことを示す
let nu : null
// undefined    値が割り当てられていないことを示す
let u : undefined
// u = 0
u = undefined

let nnu : number | null
nnu = 100
nnu = null

// 関数を宣言する
//     引数が文字列の関数
function s_write(s : string) {
    console.log(s)
}

s_write("abc")
// s_write(1000)

//      引数が文字列と数値の関数
function sn_write(sn : string | number) {
    console.log(sn)
}

sn_write("abc")
sn_write(1000)

function all_write(a: any) {
    let name: string
    try {
        name = a.constructor.name
    }catch(e){
        name = 'not instance'
        // console.log(e)       
        // エクセプションが発生した時のスタックトレースを出力する
    }
    console.log(name, ":", a)
}

all_write("abc")
all_write(1000)
all_write(null)
all_write([1,2,3,4])

class Person {
    // 属性に対して型を指定する
    name: string
    age: number
    constructor() {
        // 属性の初期化が必要
        this.name = 'no name'
        this.age = 0
    }
    // toStringメソッドをオーバーライド
    toString() {
        return `name: ${this.name}, age: ${this.age}`
    }
}

let person : Person
person = new Person()
all_write(person)
person.name = "くまのプーさん"
person.age = 99
all_write(person)

class Person2 {
    #name: string
    #age: number
    get name() :string {
        return this.#name
    }
    set name(v: string) {
        this.#name = v
    }
    get age() : number {
        return this.#age
    }
    set age(v : number) {
        this.#age = v
    }

    constructor() {
        this.#name = "no name"
        this.#age = 0
    }
    toString() {
        return`name: ${this.#name}, age: ${this.#age}`
    }
}

let person2 : Person2
person2 = new Person2()
person2.name = "スヌーピー"
person2.age = 75
all_write(person2)