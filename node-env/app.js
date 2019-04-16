// 获取环境变量设置
const env = process.env.NODE_ENV
console.log(env)

const serverHandle = (req, res) => {
    // 业务API相关处理逻辑
    res.end('app code...')
}

module.exports = serverHandle