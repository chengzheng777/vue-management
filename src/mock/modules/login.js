// 登入接口
export function login () {
    return {
        // isOpen: false,
        url: 'http://localhost:8080/login',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0,
            'data': {
                'token': '4344323121398'
                // 其它数据
            }
        }
    }
}