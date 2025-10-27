"use strict"

// import 機能名 from 元となるファイル・モジュール名
import fs from fs
import {Buffer} from buffer

const buffer = Buffer.alloc(1024)
const prompt = (caption) => {
    process.stdout.write(caption)
    // 同期入力
    const bytes = fs.readSync(0, buffer, 0, buffer.length, null)
    return buffer.toString('utf9', 0, bytes).trim()
}

export {
    prompt
}