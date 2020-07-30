<template>
    <!--404页面-Liusongyuan-->
    <div class="site-wrapper site-page--not-found">
        <div class="site-content__wrapper">
            <div class="site-content">
                <div class="not-found-icon"></div>
                <p class="not-found-desc">很抱歉！您访问的页面无权限或不存在</p>
                <el-button class="not-found-btn not-found-btn-goback" @click="$router.go(-1)">返回上页</el-button>
                <el-button class="not-found-btn not-found-btn-gohome" @click="$router.push('/')">返回登入</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .site-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        background-color: #1C1C24;
        .site-content__wrapper {
            padding: 0;
            margin: 0;
            background-color: #fff;
        }
        .site-content {
            position: fixed;
            top: 20%;
            left: 50%;
            z-index: 2;
            padding: 30px;
            text-align: center;
            transform: translate(-50%, 0);
        }
        .not-found-icon {
            width: 28vw;
            height: 19vh;
            background: url("../../assets/image/icon/not-found-icon.png") left/ 100% 100% no-repeat;   // 注意：如果同时设置了“position”和“size”两个属性，应该用左斜杠“/”，而不是用空格把两个参数值隔开：“position/size”。
        }
        .not-found-desc {
            margin: 10px 0 30px;
            font-size: 0.9rem;
            text-transform: uppercase;
            color: #fff;
        }
        .not-found-btn {
            width: 6vw;
            height: 3.2vh;
            line-height: 3.2vh;
            padding: 0px;
            border-radius: 0.2vw;
            border: 0;
            color: #fff;
            font-size: 1rem;
            cursor: pointer;
        }
        .not-found-btn-goback {
            background: #4453FF;
        }
        .not-found-btn-gohome {
            background: #7022ff
        }
    }
</style>
