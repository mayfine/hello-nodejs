## API 路由开发

上一步对整个路由的配置过程进行了简单的了解，这一步就来体验实际开发一个路由的过程。

先分两步进行：
- controller数据返回：完善逻辑，暂用假数据
- 数据模型状态处理：success，error

controller包含各模块的数据处理模型，这里暂用假数据。

#### 处理GET请求
`blog.js`
```javascript
const getBlogList = () => {
    // 返回假数据
    return [
        {
            id: 0,
            name: '内容1',
            create_time: 1555394232281,
            author: 'zhangsan'
        },
        {
            id: 1,
            name: '内容2',
            create_time: 1555394278624,
            author: 'lisi'
        }
    ]
}

module.exports = {
    getBlogList
}
```

`resModel.js`

```javascript
// 返回结果处理，设置返回数据格式
class BaseModel {
    constructor (data, message) {
        if (typeof(data) === 'string') {
            this.message = data

            return
        }

        this.data = data
        this.message = message
    }
}

// 正常数据返回
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.result = true
    }
}

// 错误数据返回
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.result = false
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
```

具体在返回数据时返回数据模型
```javascript
const { getBlogList } = require('../controller/blog')
const { SuccessModel } = require('../model/resModel')

const blogAPIHanle = (req, res) => {
    // 博客列表
    if (req.method === 'GET' && req.path === '/api/blog/list') {
        // 获取API数据
        const blogList = getBlogList()
        return new SuccessModel(blogList, '博客列表')
    }
}
```

#### 处理POST请求

这里针对post请求参数的获取逻辑写了个工具函数，因为这个过程涉及异步操作，所以直接写的话比较难看，而且比较重复，所以这里提取出来。

```javascript
const postDataHandle = req => {
    const postDataPromise = new Promise((resolve, reject) => {
        // 这里目前没考虑其他不符合要求的情况，若有直接在下面进行添加
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        // 确保请求参数是个对象体
        req.end('end', () => {
            resolve(postData || {})
        })
    })

    return postDataPromise
}

module.exports = postDataHandle
```

在app.js中添加处理逻辑

```javascript
// 针对POST请求做一层数据处理，添加body字段存储请求体的参数
if (req.method === 'POST') {
    postDataHandle(req).then(postData => {
        req.body = postData
    })
}
```
考虑到在各个API数据模型中的取值，直接在req请求对象里面添加body字段。
