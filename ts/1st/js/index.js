"use strict";
// tscコマンドを実行すると"use strict"が自動で追加される
//  TypeScript自体型をチェックを厳密に行うので特に"use strict"を明示的に書く必要はない
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hello,world");
// 文字列変数を宣言する
let s;
// s = 100
// 文字列変数に対して数値を代入することはできない
s = 'hello TypeScript world';
console.log('文字列', s);
// 数値を文字列に変換して代入する
s = String(1000);
console.log('文字列', s);
// 変数nを数値型で宣言する
let n;
n = 1000;
// 型の異なる変数間で直接代入することはできない
// n = s
// s = n
// 論理型
let b;
b = true;
b = false;
// オブジェクト型
let o;
// 文字列の配列型
let a;
a = new Array();
// a.push(100) // 文字列の配列型を宣言しているので数値は入らない
a.push("abc");
// any型(全ての型にマッチ)の配列変数
let all;
all = [];
all.push("def");
all.push(123);
// null         意図的に値が存在しないことを示す
let nu;
// undefined    値が割り当てられていないことを示す
let u;
// u = 0
u = undefined;
let nnu;
nnu = 100;
nnu = null;
// 関数を宣言する
//     引数が文字列の関数
function s_write(s) {
    console.log(s);
}
s_write("abc");
// s_write(1000)
//      引数が文字列と数値の関数
function sn_write(sn) {
    console.log(sn);
}
sn_write("abc");
sn_write(1000);
function all_write(a) {
    let name;
    try {
        name = a.constructor.name;
    }
    catch (e) {
        name = 'not instance';
        // console.log(e)       
        // エクセプションが発生した時のスタックトレースを出力する
    }
    console.log(name, ":", a);
}
all_write("abc");
all_write(1000);
all_write(null);
all_write([1, 2, 3, 4]);
class Person {
    // 属性に対して型を指定する
    name;
    age;
    constructor() {
        // 属性の初期化が必要
        this.name = 'no name';
        this.age = 0;
    }
    // toStringメソッドをオーバーライド
    toString() {
        return `name: ${this.name}, age: ${this.age}`;
    }
}
let person;
person = new Person();
all_write(person);
person.name = "くまのプーさん";
person.age = 99;
all_write(person);
class Person2 {
    #name;
    #age;
    get name() {
        return this.#name;
    }
    set name(v) {
        this.#name = v;
    }
    get age() {
        return this.#age;
    }
    set age(v) {
        this.#age = v;
    }
    constructor() {
        this.#name = "no name";
        this.#age = 0;
    }
    toString() {
        return `name: ${this.#name}, age: ${this.#age}`;
    }
}
let person2;
person2 = new Person2();
person2.name = "スヌーピー";
person2.age = 75;
all_write(person2);
//# sourceMappingURL=index.js.map