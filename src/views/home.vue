<template>
    <div class="container">
        <!-- 
            row: 行概念
            col: 列概念， col组件的 :span属性的布局调整 栅格占据的列数，默认值 24 
         -->
        <el-row class="header">           
                <!-- 大标题 class 的切换 看 col 是否失效 lapse：失效 -->
                <el-col :span="5" class="logo" :class="isCollapse ? 'logo-collapse-width' : 'logo-width'"> 
                    <img :src="this.logo" />
                    {{ isCollapse ? sysName : sysName }}
                </el-col>
                <!-- icon @click.prevent: 阻止默认行为 -->
                <el-col :span="1">
                    <div class="tools" @click.prevent="collapse">
                        <i class="el-icon-menu"></i>
                    </div>
                </el-col>
                <!-- 顶部导航栏，
                    默认是垂直模式，通过 mode="horizontal" 设置成水平模式 horizontal: 水平的
                    default-openeds	当前打开的 sub-menu 的 index 的数组
                -->
                <el-col :span="13">
                    <div class="hearNavBar">
                        <!-- default-active 它的说明内容为：当前激活菜单的 index。（即当前哪一项被设置为高亮） 是为了浏览器刷新后，仍然可以定位到之前选中的路由。
                            mode 属性可以使导航菜单变更为水平模式
                        -->
                        <el-menu
                            :default-active="activeIndex"
                            class="el-menu-demo"
                            background-color="#4b5f6e"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            mode="horizontal"
                            @select="handleSelectHearNavBar"
                        >
                        <!-- index 唯一标志 默认值 null -->
                            <el-menu-item index="1">首页</el-menu-item>
                            <el-menu-item index="2">消息中心</el-menu-item>
                            <el-menu-item index="3">订单管理</el-menu-item>
                        </el-menu>
                    </div>
                </el-col>
                <el-col :span="5" class="userinfo">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner">
                            <img :src="this.userAvatar" />
                            {{ username }}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item>设置</el-dropdown-item>
                            <!-- 自定义组件 @click + .native 后才能触发 -->
                            <el-dropdown-item divided @click.native="logout">退出登入</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
        </el-row>
        <el-row class="main">
            <aside class="aside">
                <!-- 导航菜单 -->
                <el-menu 
                    default-active="1-2"
                    class="el-menu-vertical-demo"
                    :collapse="isCollapse"
                    @open="handleopen"
                    @close="handleclose"
                    @select="handleselect"
                >
                    <!-- 这里的两个 slot 不懂 -->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">系统管理</span>
                        </template>
                        <el-menu-item index="1-1" @click="$router.push('user')">用户管理</el-menu-item>
                        <el-menu-item index="1-2" @click="$router.push('menu')">菜单管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">系统监控</span>
                        </template>
                        <el-menu-item index="2-1" @click="$router.push('user')">服务监控</el-menu-item>
                        <el-menu-item index="2-2" @click="$router.push('menu')">任务监控</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </aside>
            <!--  section元素表示一个包含在HTML文档中的独立部分   content：内容    container：容器 -->
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <!-- 面包屑 由当前路由动态显示-->
                    <el-col :span="24" class="breadcrumb-container">
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <!-- 子路由展示地方，transition过渡效果-->
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-row>

    </div>
</template>

<script>
    import mock from '@/mock/index.js';
    export default {
        name: 'Home',
        data() {
            return {
                isCollapse: false,
                sysName: "kitty",
                username: "louis",
                userAvater: "",
                logo: "",
                activeIndex: '1'
            }
        },
        methods: {
            handleopen() {
                console.log('handleopen');
            },
            handleclose() {
                console.log('handleclose'); 
            },
            handleselect(a, b) {
                console.log('handleselect');
            },
            handleSelectHearNavBar(key, keyPath) {
                console.log(key, keyPath)
            },
            // 折叠导航栏
            collapse: function() {
                this.isCollapse = !this.isCollapse;
            },
            // 退出登入
            logout: function() {
                // 绑定 this
                let _this = this;
                this.$confirm("确认退出吗？", "提示", {
                    type: "warning"
                })
                .then(() => {
                    sessionStorage.removeItem("user");
                    this.$router.push("/login");
                })
                .catch(() => {});
            }
        },
        // 页面属性初始化
        mounted() {
            this.sysName = "I like Kitty";
            this.logo = require("@/assets/user/logo.png");
            let user = sessionStorage.getItem("user");
            if (user) {
                this.userName = user;
                this.userAvatar = require("@/assets/user/user.png")
            }
        }
    }
</script>

<style lang="scss" scoped>
    // 后续用 flex 布局重构下
    .container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        .header {
            height: 60px;
            line-height: 60px;
            background: #4b5f6e;
            color:#fff;
            .userinfo {
                text-align: right;
                padding-right: 30px;
                float: right;
                .userinfo-inner {
                    font-size: 20px;
                    cursor: pointer;
                    color: #fff;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }
            .logo {
                height: 60px;
                font-size: 22px;
                border-right-width: 1px;
                border-right-style: solid;
                border-color: rgba(238, 241, 146, 0.5);
                text-align: left;
                img {
                    width: 40px;
                    height: 40px;
                    margin: 10px;
                    float: left;
                }
                .txt {
                    color: #fff;
                }
            }
            // 切换左侧标签栏状态时变化
            .logo-width {
                width: 230px;
            }
            .logo-collapse-width {
                width: 65px;
            }
            //  切换图标
            .tools {
                width: 40px;
                padding: 0 10px;
                // 水平方向上居中
                text-align: center;            
                cursor: pointer;
            }
            .hearNavBar {
                width: 100%;
                height: 60px;
                background: #4b5f6e;
                 
                line-height: 60px;
                cursor: pointer;
            }
        }
        .main {
            width: 100%;
            display: flex;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;
            aside{
                flex: 0 0 230px;
                width: 230px;
                .el-menu {
                    height: 100%;
                    text-align: left;
                }
            }
            .content-container {
                // 占据剩下的空间
                flex:1;
                padding: 0px;
                .breadcrumb-container {
                    height: 28px;
                    background: rgba(99, 138, 161, 0.2);
                    border: 1px solid rgba(38, 80, 114, 0.2);
                    .breadcrumb-inner {
                        padding: 5px 0px 5px 5px ;
                        text-align: left;
                        font-size: 18px;
                        width: 100%;
                        height: 100%;
                        float: left;
                    }
                }
                .content-wrapper {
                    background: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>