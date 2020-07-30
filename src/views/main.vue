<template>
    <div class="page">
        <h2>Main Page</h2>
        <el-button type="primary" @click="getUser()">获取用户信息</el-button>
        <el-button type="primary" @click="getMenu()">获取菜单信息</el-button>
    </div>
</template>

<script>
    // mock 开关
    const mock = true;
    // 用 require 不会永远拦截
    if(mock) {
        require('../mock/index.js')
    }
    // 会预加载，永远拦截
    // import mock from '@/mock/api.js'
 
    import Cookies from 'js-cookie';
    import router from '@/router' 

    export default {
        name: 'Main',
        methods: {
            getUser() {
                this.$api.getUser().then(function(res) {
                    alert(res.data.name)
                }).catch(function(res) {
                    alert(res);
                });
            },
            getMenu() {
                // this.$api.getMenu().then((res) => {
                //     alert(JSON.stringify(res.data));
                // }).cath((res) => {
                //     alert(res);
                // })
                this.$api.getMenu().then(function(res) {
                    alert(JSON.stringify(res.data))
                }).catch(function(res) {
                    alert(res);
                });
            }
        }
    }
</script>