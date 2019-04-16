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
