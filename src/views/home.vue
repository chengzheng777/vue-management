<template>
    <div class="container">
        <!-- 头部区域 -->
        <header-bar></header-bar>
        <!-- 导航菜单栏 -->
        <nav-bar></nav-bar>
        <!-- 主要内容区域 -->
        <main-c></main-c>
    </div>
</template>

<script>
    import HeaderBar from './HeadBar/HeadBar';
    import NavBar from './NavBar/NavBar';
    import MainC from './Main/Main'
    export default {
        components: {
            HeaderBar,
            NavBar,
            MainC
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        position: absolute;
        top: 0;
        
        left: 0;
        right: 0;
        background: #4b5f6e;
    }
</style>