import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//  引入
import app from './modules/app';
import user from './modules/user';
import menu from './modules/Menu';
import tab from './modules/tab';

// 注册模块
const store = new Vuex.Store({
    modules: {
        app: app,
        menu: menu,
        user:user,
        tab:tab
        // 其它
    }
})

// 导出
export default store;
