// 聚合文件，总
import Mock from 'mockjs';
import * as login from './modules/login';
import * as user from './modules/user';
import * as menu from './modules/menu';

// 1.关闭/开启[业务模块]拦截，通过调用fnCreate方法[isOpen参数]设置。
// 2.关闭/开启[业务模块中的某个请求]拦截，通过函数返回对象中的[isOpen属性]设置。
fnCreate(login, true);
fnCreate(user, true);
fnCreate(menu, true);

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen = true) {
    if (isOpen) {
        for (var key in mod) {      // key = "login" key才是模块里面的函数, mod = Module {__esModule: true, Symbol(Symbol.toStringTag): "Module"} 这是一个模块。
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
                    Mock.mock(new RegExp(res.url), res.type, (opts) => {    // opts = {url: "http://localhost:8080/login", type: "GET", body: null, data: null}
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