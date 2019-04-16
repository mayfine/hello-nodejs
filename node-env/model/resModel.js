// 返回结果处理，设置返回数据格式
class BaseModel {
    constructor (data, message) {
        if (typeof(data) === 'string') {
            this.message = data

            return
        }

        this.data = data
        this.message = message
    }
}

// 正常数据返回
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.result = true
    }
}

// 错误数据返回
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.result = false
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}