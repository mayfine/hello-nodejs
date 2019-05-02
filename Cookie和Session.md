### Cookie

Cookie基本介绍
>
    1. 浏览器本地的数据存储
    2. 用于纪录客户端的用户信息
    3. 最大存储：5kb

Cookie基本操作
- 前端操作 [Javascript Cookie](https://www.runoob.com/js/js-cookies.html)
>
    1. 读取cookie：document.cookie
    2. 设置cookie：document.cookie = "name=zhangsan"
    3. 删除cookie：document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 GMT"

        
- 服务端操作

```javascript
http.createServer((req, res) => {
    // 1. 获取cookie, 格式：k1=v1;k2=v2;
    const reqCookie = req.headers.cookie || ''

    // 2. 解析cookie
    req.cookie = {}
    reqCookie.split(';').forEach(item => {
        if (!item) {
            return
        }

        const keyValueArr = item.split('=')
        const key = keyValueArr[0]
        const value = keyValueArr[1]

        req.cookie[key] = value
    })


})
```

了解cookie的几个参数
>以本地服务为例，本地路由 ：localhost:3000/api/blog/list

`Domain`

指定cookie在访问哪个域名时可见，默认站点当前域
默认：localhost

---

`Path`

为服务端特定文档路径/路由设置cookie，仅访问地址包含在设置的path之内，cookie才设置生效

例如：
```javascript
res.writeHead(200, {
    'Set-Cookie': 'name=zhangsan;path=/api/blog/list'
})
```
仅当路由访问 http://localhost:3000/api/blog/list 时cookie中name字段才会被设置

---

`Expires`

设置cookie的过期时间

```javascript
// 获取当前时间
const date = new Date()

// 设置cookie7天后过期
const expireDays = 7
date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000)

//将userId和userName两个Cookie设置为10天后过期
res.writeHead(200, {
    'Set-Cookie': 'name=zhangsan; expires=' + date
})
```

---

`HttpOnly`

cookie设置HttpOnly后，将无法通过JS (document.cookie) 获取，可以有效防止XSS攻击

```javascript
res.writeHead(200, {
    'Set-Cookie': 'name=zhangsan; HttpOnly'
})
```
前端在控制台Application中查看cookie参数时会发现，HTTP有对勾标识。

---

`Secure`

防止信息在传递的过程中被监听捕获后信息泄漏, 安全层面来讲，比HttpOnly更加严格。

---

`SameSite`
待本地验证。

具体参考：[SameSite Cookie，防止CSRF 攻击](https://www.cnblogs.com/ziyunfei/p/5637945.html)

---

### Session

`session和cookie的区别`

session是服务端存储，cookie是客户端存储
session存储大小取决于服务端内存大小，而cookie最大只能5kb

`session的问题`
1. cookie信息暴露给客户端，且易被客户端修改
2. cookie大小限制

`session操作方式`

将重要信息存储在服务端并通过session_id做标记，而session_id一般存储在cookie中。

服务端一般步骤：
1. 获取cookie中存储session的字段key
2. 根据key在SESSION_DATA中查找对应数据
3. 查找结果逻辑处理：若存在... 若不存在...

