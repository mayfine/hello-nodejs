const http = require('http')
const querystring = require('querystring')

// GET demo
// const server = http.createServer((req, res) => {
//     // 请求方法
//     console.log(req.method)
//     // 请求URL
//     const url = req.url
//     console.log(url)
//     // GET请求参数
//     const queryParams = querystring.parse(url.split('?')[1])
//     console.log(queryParams)
//     res.end('hello world')
// })

// POST demo
// const server = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         let postData = ''
//         req
//             // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
//             .on('data', chunk => {
//                 postData += chunk.toString()
//             })
//             // end事件触发后返回结果
//             .on('end', () => {
//                 console.log(postData)
//                 res.end('message ...')
//             })
//     }
// })

// 综合 demo
const server = http.createServer((req, res) => {
    // 请求方法
    const method = req.method
    // 请求url
    const url = req.url
    // url分解信息
    const urlSplit = url.split('?')
    // url路径
    const path = urlSplit[0]
    // 查询参数
    const query = urlSplit[1]
    // 默认返回结构体
    const resData = {
        method,
        path,
        url,
        query
    }

    // 设置返回的数据格式为JSON
    res.setHeader('Content-type', 'application/json')

    // GET 请求处理
    if (method === 'GET') {
        res.end(JSON.stringify(resData))
    }

    // POST 请求处理
    if (req.method === 'POST') {
        let postData = ''
        req
            // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            .on('data', chunk => {
                postData += chunk.toString()
            })
            // end事件触发后返回结果
            .on('end', () => {
                resData.postData = postData
                res.end(JSON.stringify(resData))
            })
    }
})

//测试： http: //localhost:3000/api/get?user=admin

server.listen(3000)

console.log('server started ...')
