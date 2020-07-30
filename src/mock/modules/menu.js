// 获取菜单信息
export function getMenu () {
    return {
        // isOpen: false,
        url: 'http://localhost:8080/menu',
        type: 'get',
        data: {
            'msg': 'success',
            'code': 0,
            'data': {
                'id': '@increment',
                'name': 'menu',
                'order|10-20': 12
                // 其它数据
            }
        }
    }
}