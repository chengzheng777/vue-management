<template>
    <el-form 
        :model="loginForm" 
        ref="loginForm"
        :rules="fieldRules"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
        > 
        <h3 class="title">登入系统</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item style="width: 100%;">
            <el-button type="primary" style="width: 48%;" @click="resetForm('loginForm')">重 置</el-button>
            <el-button type="primary" style="width: 48%;" @click.native.prevent="login" :loading="logining">登 入</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import mock from '@/mock/index.js';
    import Cookies from 'js-cookie';
    
    export default {
        name: 'Login',
        data() {
            return {
                logining: false,
                loginForm: {            // 账号，密码
                    account: 'admin',
                    password: '12345',
                },
                fieldRules: {           // 输入框规则 rules:表单验证规则，即 async-validator 所使用的校验规则，类型为 Object。
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },   // 'blur'是鼠标失去焦点的时候会触发验证  required 是否必填，如果不设置，则会根据校验规则自动生成
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                },
                checked: true
            }
        },
        methods: {
            login() {
                let userInfo = { account: this.loginForm.account, password: this.loginForm.password };  // 提取本地账号密码
                this.$api.login.login(JSON.stringify(userInfo)).then((res) => {       // 传递给后台本地账号密码返回 token ，现在是没有验证账号密码过程的
                    console.log(res.data)
                    console.log('login')
                    Cookies.set('token', res.data.token);    // 放置token到Cookie
                    sessionStorage.setItem('user', userInfo.account);   // 保存用户到本地会话
                    this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                    // axios 做网络请求的时候，会遇到this 不指向 vue 。而为 undefined。因为 router 是挂载在 vue 实例上的。
                    // 可以用 window.location.href() 转跳？ 
                    // 或者在 then（） 使用 箭头函数。ES6中的箭头函数内部的 this 属于词法作用域，由上下文（外层调用者vue 来确定）
                    this.$router.push('/');     // 登入成功，转跳到主页
                }).catch((res) => {
                    this.$message({
						message: res.message,
						type: 'error'
					})
                })
            },
            resetForm(formName) {
                // resetFields： 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                this.$refs[formName].resetFields();
            }
        }
    }
</script>   

<style lang="scss" scoped>
    .login-container {
        width: 400px;
        background: #fff;
        background-clip: padding-box;
        margin: 180px auto;
        padding: 35px 35px 15px;
        box-sizing: border-box;
        border: 1px solid #eaeaea;
        border-radius: 5px;
        box-shadow: 0 0 30px rgba(0, 0, 0 , 0.1);
        .title {
            text-align: center;
            color: #505458;
            margin: 0 auto 40px;
        }
        // .remember {
        //     margin: 0 0 25px;
        // }
    }
</style>