const getBlogList = () => {
    // 返回假数据
    return [
        {
            id: 0,
            name: '内容1',
            create_time: 1555394232281,
            author: 'zhangsan'
        },
        {
            id: 1,
            name: '内容2',
            create_time: 1555394278624,
            author: 'lisi'
        }
    ]
}

// 创建博客
const createBlog = postData => {
    // 返回假数据

    return {
        id: 3,
        name: '内容3',
        create_time: 1555403637049,
        author: 'haha'
    }
}

// 更新博客
const updateBlog = postData => {
    // 返回假数据

    return true
}

module.exports = {
    getBlogList,
    createBlog,
    updateBlog
}