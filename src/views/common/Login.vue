<template>
    <el-form :model="loginForm" :rules="fieldRules" 
        ref="loginForm"
        label-position="left" 
        label-width="0px" 
        class="demo-ruleForm login-container"
    >
        <h3 class="title">登入系统</h3>
        <el-form-item   prop="account">
            <el-input type="text" v-model="loginForm.account" autocomplete="off" placeholder="账号"></el-input>
        </el-form-item>

        <el-form-item   prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>

        <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width: 48%;" @click.native.prevent="reset">重置</el-button>
            <el-button type="primary" style="width: 48%;" @click.native.prevent="login" :loading="logining">登入</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import Cookies from "js-cookie";
    import router from "@/router";
    import mock from "@/mock/index"
    export default {
        name: 'Login',
        data() {
            return {
                logining: false,
                loginForm: {
                    account: 'admin',
                    password: 'admin'
                },
                fieldRules: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                checked: true
            };
        },
        methods: {
            login() {
                // let userInfo = {account:this.loginForm.account, password:this.loginForm.password};
                // this.$api.login(JSON.stringify(userInfo)).then((res) => {
                //     Cookies.set('token', res.data.token);   // 放置tolen到Cookie
                //     sessionStorage.setItem('user', userInfo.account); // 保存用户本地会话
                //     this.$router.push('/')  // 登入成功，转跳主页
                // }).catch((res) => {
                //     alert(res)
                // });
                this.$api.login().then(function(res) {
                    alert(res.data.token);
                    Cookies.set('token', res.data.token);
                    this.$router.push('/')
                }).catch(function(res){
                    alert(res)
                })
            },
            reset() {
                this.$refs.loginForm.resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
  .login-container {
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px  ;
        border: 1px solid #eaeaea;
        border-radius: 5px;
        box-shadow: 0 0 20px rgb(0, 0, 0, 0.1);
        background: #fff;
        // background-clip: padding-box;
        .title {
            margin: 0 auto 40px;
            text-align: center;
            color: #505458;
        }
        // .remember {
        //     margin: 0 0 35px 0;
        // }
    }
</style>