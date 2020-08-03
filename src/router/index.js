import Vue from "vue";
import VueRouter from "vue-router";
 

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import ("@/views/home"),
    children: [
        { path: '', name: '系统介绍', component: () => import ("@/views/Intro") },
        { path: '/user', name: '用户管理', component: () => import ("@/views/SysMng/User") },
        { path: '/dept', name: '系统介绍', component: () => import ("@/views/SysMng/Dept") },
        { path: '/role', name: '角色管理', component: () => import ("@/views/SysMng/Role") },
        { path: '/menu', name: '菜单管理', component: () => import ("@/views/SysMng/Menu") },
        { path: '/log', name: '系统介绍', component: () => import ("@/views/SysMng/Log") },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ("@/views/common/Login")
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import ("@/views/common/404")
  }
];

const router = new VueRouter({
  routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
    // 登入界面成功之后，会把用户信息保存在会话
    // 存在时间为会话生命周期，页面关闭既失效
    let user = sessionStorage.getItem('user');
    if(to.path == '/login') {
        // 访问登入界面，如果用户会话信息存在，代表已登入过，转跳到主页
        if(user) {
            next({ path: '/' })
        }else {
            next()
        }
    }else {
        // 访问非登入界面，且用户信息不存在，代表未登入，则转跳到登入界面
        if(!user) {
            next({ path: '/login' })
        }else {
            next()
        }
    }
})
export default router;
