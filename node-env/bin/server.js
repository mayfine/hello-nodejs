// server 初始化
const http = require('http')
const config = require('../config/server')
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(config.port)
