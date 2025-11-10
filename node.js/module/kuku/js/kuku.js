"use strict";

const kuku = (n) => {
    // ヘッダー行
    let header = "  ";
    for (let i = 1; i <= n; i++) {
        header += `│ ${i.toString().padStart(2, ' ')} `;
    }
    console.log(header + "│");

    // バッセン風の区切り線
    let line = "──┼" + "────┼".repeat(n - 1) + "────";
    console.log(line);

    // 各行
    for (let i = 1; i <= n; i++) {
        let row = `${i.toString().padStart(2, ' ')}│`;
        for (let j = 1; j <= n; j++) {
            row += ` ${(i * j).toString().padStart(2, ' ')} │`;
        }
        console.log(row);
        console.log(line);
    }
};

export { kuku };