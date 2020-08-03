import Vue from "vue";
import VueRouter from "vue-router";
 
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "首页",
    component: () => import ("@/views/home"),
    children: [
        { path: '', name: '系统介绍', component: () => import ("@/views/Intro/intro") },
    ]
  },
  {
    path: '/login',
    name: '登入',
    component: () => import ("@/views/Login")
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import ("@/views/Error/404")
  }
];

const router = new VueRouter({
  routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
    // 登入界面成功之后，会把用户信息保存在会话
    // 存在时间为会话生命周期，页面关闭既失效
    let isLogin = sessionStorage.getItem('user');
    if(to.path === '/login') {
        // 访问登入界面，如果用户会话信息存在，代表已登入过，转跳到主页
        if(isLogin) {
            next({ path: '/' })
        }else {
            next()
        }
    }else {
        // 访问非登入界面，且用户信息不存在，代表未登入，则转跳到登入界面
        if(!isLogin) {
            next({ path: '/login' })
        }else {
            next()
        }
    }
})

export default router;
