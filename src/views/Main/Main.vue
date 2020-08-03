<template>
    <div class="main-container" :class="this.$store.state.app.collapse?'menu-bar-collapse-width':'menu-bar-width'">
        <BreadCrumb></BreadCrumb>
        <transition name="fade" mode="out-in">
        <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";

export default {
    components: {
        BreadCrumb
    },
    data() {
        return {
        };
    },
    methods: {

    },
    mounted() {

    }
    };
</script>

<style scoped lang="scss">
    .main-container {
    position: absolute;
    top: 60px;
    bottom: 0px;
    left: 200px;
    right: 0px;
    background: #fff;
    }
    .menu-bar-width {
        left: 200px;
    }
    .menu-bar-collapse-width {
        left: 65px;
    }
</style>