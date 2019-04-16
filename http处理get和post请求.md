## HTTP处理get请求

`http.createServer`

该方法回调里面有两个参数，一个请求进来时的信息对象(IncomingMessage类)，一个是服务端返回对象(ServerResponse类)

- [IncomingMessage参数](http://nodejs.cn/api/http.html#http_class_http_incomingmessage)
- [IncomingMessage参数](http://nodejs.cn/api/http.html#http_class_http_serverresponse)


下面分别用简称 `req` 和 `res`

#### 处理`GET`请求
```javascript
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    // 请求方法
    console.log(req.method)
    // 请求URL
    const url = req.url
    console.log(url)
    // GET请求参数
    const queryParams = querystring.parse(url.split('?')[1])
    console.log(queryParams)
    res.end('hello world')
})

server.listen(3000)

console.log('server started ...')

```

服务启动后，在浏览器中输入测试链接：http: //localhost:3000/api/get?user=admin 即可在编辑器控制台查看输出

```
server started...
GET
/api/get?user=admin
{ user: 'admin' }
```


#### 处理`POST`请求
```javascript
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let postData = ''
        req
            // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            .on('data', chunk => {
                postData += chunk.toString()
            })
            // end事件触发后返回结果
            .on('end', () => {
                console.log(postData)
                res.end('return message ...')
            })
    }
})

server.listen(3000)

console.log('server started ...')

```

#### 综合示例
```javascript
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
```
