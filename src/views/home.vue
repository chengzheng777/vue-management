<template>
    <div class="container">
        <!-- 头部区域 -->
        <header-bar></header-bar>
        <!-- 导航菜单栏 -->
        <menu-bar></menu-bar>
        <!-- 主要内容区域 -->
        <main-c></main-c>
    </div>
</template>

<script>
    import HeaderBar from './HeadBar/HeadBar';
    import MenuBar from './MenuBar/MenuBar';
    import MainC from './Main/Main'
    export default {
        components: {
            HeaderBar,
            MenuBar,
            MainC
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #4b5f6e;
    }
</style>