<template> 
    <div class="header-container" :style="{'background-color': themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'">
        <!-- 导航收缩 -->
        <span class="hamburger-container" :style="{'background-color': themeColor}">
            <ham-burger :onClick="onCollapse" :isActive="collapse"></ham-burger>
        </span>
        <!-- 导航菜单 -->
        <span class="nav-bar">
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                :style="{'background-color': themeColor}"
                text-color="#fff"
                active-text-color="#ffd04b"
                mode="horizontal"
                @select="selectNavBar()"         
            >
                <!-- index 唯一标志 默认值 null -->
                <el-menu-item index="1" @click="$router.push('/')">首页</el-menu-item>
                <el-menu-item index="2">消息中心</el-menu-item>
                <el-menu-item index="3">订单管理</el-menu-item>
            </el-menu>
        </span>
        <span class="tool-bar"> 
        <!-- 用户信息 -->
            <el-dropdown class="user-info-dropdown" trigger="hover">
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
        </span>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import mock from "@/mock/index.js";
import Cookies from "js-cookie";

import HamBurger from '@/components/Hamburger';

export default {
    components: {
        HamBurger
    },
    data() {
        return {
        isCollapse: false,
        username: "Louis",
        userAvatar: "",
        activeIndex2: '1'
        };
    },
    computed:{
        ...mapState({
            // 动态主题颜色
            themeColor: state=>state.app.themeColor,
            // 折叠
            collapse: state=>state.app.collapse
        })
    },
    methods: {
        selectNavBar(key, keyPath) {
        console.log(key, keyPath)
        },
        //折叠导航栏
        onCollapse: function() {
            console.log('折叠');
            this.$store.commit('onCollapse')
        },
        //退出登录
        logout: function() {
        var _this = this;
        this.$confirm("确认退出吗?", "提示", {
            type: "warning"
        })
        .then(() => {
            Cookies.remove('token'); 
            sessionStorage.removeItem("user");
            this.$router.push("/login");
        })
        .catch(() => {
            alert('退出失败')
        });
        }
    },
    mounted() {
        this.sysName = "I like Kitty";
        var user = sessionStorage.getItem("user");
        if (user) {
        this.userName = user;
        this.userAvatar = require("@/assets/user/user.png");
        }
    }
    };
</script>

<style lang="scss" scoped >
    .header-container {
        position: absolute;
        left: 200px;
        right: 0;
        height: 60px;
        line-height: 60px;
        background: #545c64;
        .hamburger-container {
            text-align:center;
            width: 40px;
            float: left;
            border-color: rgba(80, 124, 133, 0.747);
            border-left-width: 1px;
            border-left-style: solid;
            border-right-width: 1px;
            border-right-style: solid;
            color: white;
            background: #545c64;
        }
        .nav-bar {
            margin-left: auto;
            float: left;
            .el-menu {
            background: #545c64;
            }
        }
        .tool-bar {
            float: right;
            .user-info-dropdown {
                font-size: 20px;
                padding-right: 20px;
                color: #fff;
                cursor: pointer;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
    }
    .menu-bar-width {
        left: 200px;
    }
    .menu-bar-collapse-width {
        left: 65px;
    }
</style>