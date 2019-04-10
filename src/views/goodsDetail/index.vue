<template>
    <div class="goodsDetail">
        <swpie></swpie>
        <head-top :headShowC='headShowP' v-on:showDialogC='showDialogP'></head-top>
        <!-- 头部导航栏 -->
        <head-tab v-if="showDialog"></head-tab>
        <bg-mask v-model="showDialog" color="transparent"></bg-mask>
        <!-- 票价信息 -->
        <ticket-info></ticket-info>
        <order-now></order-now>
        <!-- 门票详情 -->
        <cube-tab-bar v-model="selectedLabelDefault" :data="tabs" @click="clickHandler" @change="changeHandler" show-slider>
        </cube-tab-bar>
    </div>
</template>
<script>
export default {
    data: () => ({
        selectedLabelDefault: '景区须知',
        tabs: [
            { label: '景区须知' },
            { label: '景区简介' },
            { label: '交通指南' },
            { label: '旅游主题' },
        ],
        showDialog: false,
        headShowP: false
    }),
    methods: {
        clickHandler(label) {
            console.log(label)
        },
        changeHandler(label) {
            console.log(label)
        },
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 0) {
                this.headShowP = true;

            } else {
                this.headShowP = false;
            }
        },
        showDialogP(val){
            console.log(val)
            this.showDialog = val
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    components: {
        Swpie: () => import('./components/Swipe'),
        HeadTop: () => import('./components/HeadTop'),
        OrderNow: () => import('./components/OrderNow'),
        TicketInfo: () => import('./components/TicketInfo'),
        BgMask: () => import("@/components/BgMask"),
        HeadTab: () => import("@/components/HeadTab"),
    }
}
</script>
<style lang="scss">
.cube-tab {
    div {
        font-size: 14px;
    }
}

.cube-tab_active {
    color: #30ce84;
}

.cube-tab-bar-slider {
    background-color: #30ce84;
}

.cube-tab-bar {
    height: 44px;
    background: #fff;
}
</style>