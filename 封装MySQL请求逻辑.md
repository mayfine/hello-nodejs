## 封装MySQL请求逻辑

在数据模型中，我们需要不断的进行数据库的请求操作，这里我们将整个请求过程抽象出来做一层封装，简化我们数据的请求过程。

首先，我们需要建立数据库连接，可能针对不同的环境会有不同的配置，那么我们可以先将这块配置曾抽出来。如下：

`config > db.js`
```javascript
// 环境参数
const env = process.env.NODE_ENV

// 这里可以根据不同的环境参数 env 区分不同的DB配置

let DB_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    post: 3306,
    database: 'myblog'
}

module.exports = {
    DB_CONF
}
```

现在我们有了数据库配置之后，下一步是直接进行数据的连接等操作了，如下：
```javascript
const mysql = require('mysql')
const { DB_CONF } = require('../config/db.js')

// 创建数据库连接
const dbCon = mysql.createConnection(DB_CONF)

// 连接数据库
dbCon.connect()
 
// 执行mysql
function mySqlExec(sql) {
    return new Promise((resolve, reject) => {
        dbCon.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }

            resolve(result)
        })
    })
}

module.exports = {
    mySqlExec
}
```

这样我们在model曾直接进行引入调用就可以得到一个简洁的 `Promise` 进行链式调用了。