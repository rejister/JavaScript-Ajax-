"use strict"

// http.js
const http = require("http")

const port = 8800

const server = http.createServer((request, response) =>{
    response.writeHead(200, {
        "content-type": "text/html"
    })

    const message = "<html><body><h1>hello,world</h1></body></html>"
    response.end(message)
    console.log("send response:" , message)
})

server.listen(port)