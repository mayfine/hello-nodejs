const { getBlogList, createBlog, updateBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const blogAPIHanle = (req, res) => {
    // 博客列表
    if (req.method === 'GET' && req.path === '/api/blog/list') {
        const blogList = getBlogList()
        return new SuccessModel(blogList, '博客列表')
    }

    // 博客详情
    if (req.method === 'GET' && req.path === '/api/blog/detail') {
        return {
            message: '这是博客详情接口'
        }
    }

    // 博客添加
    if (req.method === 'POST' && req.path === '/api/blog/new') {
        const newBlogInfo = createBlog(req.body)
        return new SuccessModel(newBlogInfo, '博客创建成功！')
    }

    // 博客更新
    if (req.method === 'POST' && req.path === '/api/blog/update') {
        const updateBlogRes = updateBlog(req.body)

        if (updateBlogRes) {
            return new SuccessModel({}, '博客更新成功！')
        } else {
            return new ErrorModel(null, '博客更新失败！')
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
