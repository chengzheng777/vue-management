// 聚合文件，总
import Mock from 'mockjs';
import * as login from './modules/login'
import * as user from './modules/user'
import * as dept from './modules/dept'
import * as menu from './modules/menu'

// 1. 开启/关闭[所有模块]拦截, 通过调[openMock参数]设置.
// 2. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 3. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.

let openMock = true
// let openMock = false

fnCreate(login, openMock)
fnCreate(user, openMock)
fnCreate(dept, openMock)
fnCreate(menu, openMock)

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen = true) {
    if (isOpen) {
        for (var key in mod) {      
            // key = "login" key才是模块里面的函数, mod = Module {__esModule: true, Symbol(Symbol.toStringTag): "Module"} 这是一个模块。
            // key 似乎跟 res 是一样的？ 但是好像不关联。这个 key 关联的是 mod[key] 里面的。
            // 只将 上方的 key 改成 res 会提示 已声明但未取值。
            ((res) => {
                    /** res?
                     *data: {msg: "success", code: 0, data: {…}}
                     *type: "get"
                     *url: "http://localhost:8080/login"
                     *__proto__: Object
                    */
                if (res.isOpen !== false) {
                    // 格式：Mock.mock( rurl, rtype, function( options ) )
                    //options：指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性，参见 XMLHttpRequest 规范。
                    // url用正则写，这样get请求传参时，也能拦截数据了
                   
                    // let url = baseUrl + res.url
                    // 这里Mock 是拦截的 baseUrl？
                    let url = 'http://localhost:8080/'
                    // if(!url.endsWith("/")) {
                    //   url = url + "/"
                    // }
                    url = url + res.url
                    Mock.mock(new RegExp(url), res.type, (opts) => {    // opts = {url: "http://localhost:8080/login", type: "GET", body: null, data: null}
                        opts['data'] = opts.body ? JSON.parse(opts.body) : null;
                        delete opts.body;
                        console.log('\n');
                        console.log('%cmock拦截, 请求: ', 'color:blue', opts);
                        console.log('%cmock拦截, 响应: ', 'color:blue', res.data);
                        return res.data; // 这是在 对应模块中获取的 data
                    })
                }
            }) (mod[key] () || {})
        }
    }
}