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
