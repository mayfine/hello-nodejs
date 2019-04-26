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