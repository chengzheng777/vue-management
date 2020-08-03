import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//  引入
import AppStore from './modules/AppStore';

// 注册模块
const store = new Vuex.Store({
    modules: {
        app: AppStore
        // 其它
    }
})

// 导出
export default store;
