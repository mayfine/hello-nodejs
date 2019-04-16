## API 路由设置

>顾名思义，API路由设置就是根据不同模块的API请求做不同的处理，返回不同的结果。

还是在之前的基础环境上进行完善补充。

假如现在我们有一个用户信息模块和博客信息模块，按照之前的做法我们现在直接新建`router`文件夹，里面防止各模块路由的处理文件，在当前实例即：`blog.js` 和 `user.js`

- blog.js

```javascript
const blogAPIHanle = (req, res) => {
    // 博客列表
    if (req.method === 'GET' && req.path === '/api/blog/list') {
        return {
            message: '这是博客列表接口'
        }
    }

    // 博客详情
    if (req.method === 'GET' && req.path === '/api/blog/detail') {
        return {
            message: '这是博客详情接口'
        }
    }

    // 博客添加
    if (req.method === 'POST' && req.path === '/api/blog/new') {
        return {
            message: '这是新增博客接口'
        }
    }

    // 博客删除
    if (req.method === 'POST' && req.path === '/api/blog/delete') {
        return {
            message: '这是删除博客接口'
        }
    }
}

module.exports = blogAPIHanle

```

- user.js

```javascript
const userAPIHanle = (req, res) => {
    // 用户信息
    if (req.method === 'GET' && req.path === '/api/user/info') {
        return {
            message: '这是用户信息接口'
        }
    }

    // 博客登录
    if (req.method === 'POST' && req.path === '/api/blog/login') {
        return {
            message: '这是用户登录接口'
        }
    }
}

module.exports = userAPIHanle

```

- app.js

```javascript
// 获取环境变量设置
const env = process.env.NODE_ENV

// 博客路由信息
const blogRouterHandle = require('./router/blog')
// 用户信息路由信息
const userRouterHandle = require('./router/user')

const serverHandle = (req, res) => {
    // 业务API相关处理逻辑

    req.path = req.url.split('?')[0]

    // 设置返回头部类型信息
    res.setHeader('Content-type', 'application/json')

    // 匹配博客路由
    const blogRouterData = blogRouterHandle(req, res)
    if (blogRouterData) {
        res.end(JSON.stringify(blogRouterData))
        return
    }

    // 匹配用户信息路由
    const userRouterData = userRouterHandle(req, res)
    if (userRouterData) {
        res.end(JSON.stringify(userRouterData))
        return
    }

    // 没匹配到任何路由信息，则返回404
    res.writeHead(404, {
        'Content-type': 'text-plain'
    })
    res.write('404 Not Found')
    res.end()

    // res.end('app code...')
}

module.exports = serverHandle
```

这里只是从原生Nodejs层面去学习我们API请求过程的路由实现原理，代码简单演示过程，当然实际框架中的实现中做了更好的封装。

至此，简单的路由实现了，可以跑起来试试，具体代码设置在`node-env`目录下。
