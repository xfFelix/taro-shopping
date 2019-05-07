<template>
    <div class="headTop">
        <div class="header">
            <i class="cubeic-back" @click="goHome"></i>
            会员卡券
            <div class="iconMoreW">
                <div class="iconMore">
                    <span class="iconfont" @click="showDialog=!showDialog">&#xe80c;</span>
                    <Head-tab v-if="showDialog"></Head-tab>
                </div>
            </div>
        </div>
        <div  class="goRecode" @click="$router.push({name:'cardRecord'})">
            兑换记录
            <span class="iconfont">&#xe61e;</span>
        </div>
        <bg-mask v-model="showDialog" color="transparent"></bg-mask>
    </div>
</template>
<script>
export default {
    data: () => ({
        showDialog: false
    }),
    methods: {
        goHome() {
            window.location.href = process.env.VUE_APP_BASE_HOME_URL
        },
    },
    components: {
        HeadTab: () => import('@/components/HeadTab'),
        BgMask: () => import("@/components/BgMask"),
    }
}
</script>
<style lang="scss" scoped>
.headTop {
    background: #373C48;
    color: #fff;
    .header {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0 31px 0;
        font-size: 18px;
        .cubeic-back {
            position: absolute;
            left: 18px;
        }
        .iconMoreW {
            position: absolute;
            right: 18px;
            .iconMore {
                position: relative;
            }
        }
    }
    .goRecode {
        span {
            transform: rotate(180deg);
            font-size: 6px;
            display: inline-block;
        }
        display: flex;
        justify-content: flex-end;
        padding: 0 20px 15px 0;
        align-items: center;
    }
}
</style>
