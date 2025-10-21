"use strict"

// keyin.js

process.stdin.setEncoding('utf8')
process.stdin.setRawMode(true)
process.stdin.resume()

const SIGINT = '\u0003' // Ctrl + C
const LF = "\u000a"    // Line Feed
const CR = "\u000d"    // Enter

process.stdin.on("data", key => {
    if (key === SIGINT) {
        process.exit()
    }
    process.stdout.write(key)
    if (key === CR) {
        process.stdout.write(LF)
    }
})
// process.on("SIGINT", () => {
//     process.exit()
// })
    