// 获取环境变量设置
const env = process.env.NODE_ENV

// 博客路由信息
const blogRouterHandle = require('./router/blog')
// 用户信息路由信息
const userRouterHandle = require('./router/user')
// 处理post请求的Form Data
const postDataHandle = require('./utils/postDataHandle')

const serverHandle = (req, res) => {
    // 业务API相关处理逻辑

    req.path = req.url.split('?')[0]

    // 设置返回头部类型信息
    res.setHeader('Content-type', 'application/json')

    // 针对POST请求做一层数据处理，添加body字段存储请求体的参数
    if (req.method === 'POST') {
        postDataHandle(req).then(postData => {
            req.body = postData
        })
    }

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