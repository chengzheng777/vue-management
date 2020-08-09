// axios 默认配置，包含基础路径等消息。
export default {
    method: 'get',
    // 基础 url 前缀
    baseUrl: 'http://localhost:8080/',
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 1000,
    // 携带凭证,是否允许跨域属性
    withCredentials: true,
    // 返回数据类型
    responseType: 'json'
}