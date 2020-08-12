import axios from '../axios'

/* 
 * 系统登录模块
 */

// url 都是 '/xxx' 之类的。 axios 怎么接收的。前缀呢

// 登录
export const login = data => {
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}

// 登出
export const logout = () => {
    return axios({
        url: '/logout',
        method: 'get'
    })
}