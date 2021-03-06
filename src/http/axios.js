// 二次封装 axios 模块，包含拦截器等信息
import axios from 'axios';
import config from './config';
// 不知道 qs 是什么？
// 传递参数需要将参数序列化才行，qs有两个方法：
// qs.parse() : 将URL解析成为对象
// qs.stringify() ：将对象序列化成 URL，以&进行拼接
import qs from 'qs';
import Cookies from 'js-cookie';
import router from '@/router';

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios(options) {   
    
    // 模板默认导出一个 Promise 实例
    return new Promise ((resolve, reject) => {
        const instance = axios.create({     // axios.create() 是实例化
            baseURL: config.baseUrl,
            headers: config.headers,
            timeout: config.timeout,
            withCredentials: config.withCredentials
            // transformResponse: [function (data) {   // transformResponse 在传递给 then/catch 前，允许修改响应数据，用的不多？
            // }]
        });
        
        // request 拦截器
        instance.interceptors.request.use((config) => {
            let token = Cookies.get('token');
            // 1.请求开始的时候可以结合 vuex 开启全屏 loading 动画
            // console.log(store.state.loading)
            // console.log('准备发送请求...')
            
            // 2.带上 token
            if (token) {
                config.headers.token = token
            } else {
                // 重定向到登入页面
                router.push('/login')
            };

            // 3.根据请求方法，序列化转来的参数，根据后端需求是否序列化
            if (config.method === 'post') {
                // if (config.data.__proto__ === FormData.prototype
                //     || config.url.endsWith('path')                  // endsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。
                //     || config.url.endsWith('mark')
                //     || config.url.endsWith('patchs')
                // ) {

                // } else {
                //     // 序列化
                //     config.data = qs.stringify(config.data)
                // }
            }
            return config       // if() {} 大括号里面的执行完，继续执行大括号后面的时候不加 else {}
        },
        error => {
            // 请求错误时
            console.log('request:', error);
            // 1.判断请求超时
            if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {         // indexOf() 返回error.message中第一次出现的指定值 timeout 的索引。未找到返回 -1
                console.log('timeout请求超时')
                // return service.request(originalRequest);  // 再重复请求一次
            };
            // 2.需要重定向到错误页面
            const errorInfo = error.response;
            console.log(errorInfo);
            if (errorInfo) {
                error = errorInfo.data  // 页面那边 catch 的时候就能拿到详细的错误信息，看最下边的Promise.reject
                const errorStatus = errorInfo.status;   // 404 403 500 ...
                router.push({
                    path: `/error/${errorStatus}`
                })
            }
            return Promise.reject(error);   // 在调用的那边可以拿到(catch)你想返回的错误信息
        }
        );

        // response 拦截器
        instance.interceptors.response.use(
            (response) => {
                let data;
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                // 在此处我以为说 IE9 需要，现在不需要了，就直接 let data = response.data 导致各种undefined
                if (response.data == undefined) {
                  data = JSON.parse(response.request.responseText)
                } else {
                  data = response.data
                }

                // 根据返回的 code 值来做不同处理
                switch (data.rc) {  
                    case 1:
                        console.log(data.desc)
                        break;
                    case 0:
                        store.commit('changeState')
                        console.log('登入成功')
                    default:
                }
                // 若不是正确的返回code，且已经登入，就抛出错误
                // const err = new Error(data.desc)
                // err.data = data
                // err.response = response
                // throw err
                return data
        },
        (err) => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 400:
                        err.message = '请求错误'
                        break;
                    case 401:
                        err.message = '未授权，请登入'
                        break;
                    case 403:
                        err.message = '拒绝访问'
                        break;
                    case 404:
                        err.message = `请求地址出错：${err.response.config.url}`
                        break;
                    case 408:
                        err.message = '请求超时'
                        break;
                    case 500:
                        err.message = '服务器内部错误'
                        break;
                    case 501:
                        err.message = '服务未实现'
                        break;
                    case 502:
                        err.message = '网关错误'
                        break;
                    case 503:
                        err.message = '服务不可用'
                        break;
                    case 504:
                        err.message = '网关超时'
                        break;
                    case 505:
                        err.message = 'HTTP版本不受支持'
                        break;
                    default:
                }
            }
            console.error(err)
            return Promise.reject(err)  // 返回接口返回的错误信息
        }
        );

        // 请求处理
        instance(options).then(res => {
            resolve(res);
            return false;
        }).catch(error => {
            reject(error);
        })

    })
}