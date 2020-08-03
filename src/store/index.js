import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//  引入
import AppStore from './modules/AppStore';
import MenuStore from './modules/Menu';

// 注册模块
const store = new Vuex.Store({
    modules: {
        app: AppStore,
        menu: MenuStore
        // 其它
    }
})

// 导出
export default store;
