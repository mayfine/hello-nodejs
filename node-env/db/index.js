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