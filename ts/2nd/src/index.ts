// 

// <html><body>この部分を変数へ代入する</body></html>
// const body:HTMLBodyElement = document.body

// h1エレメントをdocumentオブジェクトから取り出す
//      getElementByIDはnullを返す場合があるので以下のようにnullも指定する
const h1:HTMLElement | null = document.getElementById('title')

// h1がnull以外の場合「タイトル」を割り当てる
if (h1) {
    h1.textContent = "タイトル"
}else{
    console.log("#title is not found")
}

// HTML内のsectionの個数とこの配列変数の個数が一致していることが前提と合っている
// → 本来はデータを基準として必要なぶんsectionを用意するような処理がよい
const description:Array<string> = [
    "主要",
    "経済",
    "エンタメ",
    "スポーツ",
]

// article 内の section 内 全てのh2エレメントを取り出す
const h2:NodeListOf<HTMLElement> | null = document.querySelectorAll("article h2")

if (h2){
    for(let i:number = 0 ; i < h2?.length ; i++){
        const no:HTMLElement | any = h2[i]?.querySelector(".no")
        const desc:HTMLElement | any = h2[i]?.querySelector(".description")

        if (no){
            no.textContent = (i+1).toString()
        }
        if (desc){
            desc.textContent = description[i]
        }
    }
}