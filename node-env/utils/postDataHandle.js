const postDataHandle = req => {
    const postDataPromise = new Promise((resolve, reject) => {
        // 这里目前没考虑其他不符合要求的情况，若有直接在下面进行添加
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        // 确保请求参数是个对象体
        req.end('end', () => {
            resolve(postData || {})
        })
    })

    return postDataPromise
}

module.exports = postDataHandle