"use strict"

class ImageClock extends Clock {
    //  画像データをプリロードする
    //      static → クラスに割り当てる属性 クラスロード時に初期化される
    static digits = []
    //  クラスロード時に処理されるメソッド
    static {
        for (let i = 0; i<10; i++) {
            const image = new Image()
            image.src = `image/${i}.png`
            ImageClock.digits.push(image)
        }
    }

    //  指定されたクラスに対して画像を割り当てる
    #setImage(selector ,part){
        //  時計を表示しているエレメント内の'hours'クラスを取り出す
        const ih = this.clockElement.querySelectorAll(selector)
        //      forEach(対象の値、インデックス番号、全体の配列)
        part.split('').forEach((e,i,a) => {
            // ih[i].src = `image/${e}.png`
            ih[i].src = ImageClock.digits[parseInt(e)].src
            ih[i].alt = e
        });
    }

    //  showメソッドをオーバーライド
    show(h, m, s) {
        //  時間の画像を入れ替える
        this.#setImage(".hours",h)
        this.#setImage(".minutes",m)
        this.#setImage(".seconds",s)
    }
}