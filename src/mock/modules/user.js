// 获取用户信息
export function getUser () {
    return {
        // isOpen: false,
        url: 'http://localhost:8080/user',
        type: 'get',
        data: {
            'msg': 'success',
            'code': 0,
            'data': {
                'id': '@increment',
                'name': '@name',
                'email': '@email',
                'age|10-20': 12
                // 其它数据
            }
        }
    }
}