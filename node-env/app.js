// 获取环境变量设置
const env = process.env.NODE_ENV

// 博客路由信息
const blogRouterHandle = require('./router/blog')
// 用户信息路由信息
const userRouterHandle = require('./router/user')
// 处理post请求的Form Data
const postDataHandle = require('./utils/postDataHandle')

// session数据
const SESSION_DATA = {}

const serverHandle = (req, res) => {
    // 业务API相关处理逻辑

    req.path = req.url.split('?')[0]

    // 设置返回头部类型信息
    res.setHeader('Content-type', 'application/json')

    // 获取Cookie
    const reqCookie = req.headers.cookie

    // res.writeHead(200, {
    //     'Set-Cookie': 'name=zhangsan;path=/api/list'
    // })

    /**
     * session操作逻辑
     *  1. 获取cookie中存储session的字段key
     *  2. 根据key在SESSION_DATA中查找对应数据
     *  3. 查找结果逻辑处理：若存在... 若不存在...
     * 
     * 备注 一般用于用户登录验证，cookie存储有大小限制，session可以解决这些问题，且相对安全，不用暴露用户信息
     */


    // 获取当前时间
    const date = new Date()

    // 设置cookie7天后过期
    const expireDays = 7
    date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000)

    //将userId和userName两个Cookie设置为10天后过期
    res.writeHead(200, {
        'Set-Cookie': 'name=zhangsan; expires=' + date + '; Secure;'
    })
    

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