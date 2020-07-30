import Vue from "vue";
// import axios from 'axios';      
// import VueAxios from 'vue-axios';   // 挂载到全局

import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import api from './http/index'      // 二次封装的 axios 组件

Vue.use(ElementUI);                 // 注册插件
// Vue.use(VueAxios, axios);           // 注册，之后就可以用 this 进行调用
Vue.use(api);                       // 注册后 就可以使用 this.$api 调用相关接口了

Vue.config.productionTip = false;   // 生产环境提示

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
