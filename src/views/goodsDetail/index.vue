<template>
    <div class="goodsDetail">
        <swpie :sceneInfoC="sceneInfoP"></swpie>
        <head-top :headShowC='headShowP' v-on:showDialogC='showDialogP' v-on:headHightC='headHightP'></head-top>
        <!-- 头部导航栏 -->
        <head-tab v-if="showDialog"></head-tab>
        <bg-mask v-model="showDialog" color="transparent"></bg-mask>
        <!-- 票价信息 -->
        <ticket-info :sceneInfoC="sceneInfoP"></ticket-info>
        <order-now :ticketListC="ticketListP"></order-now>      
        <!-- 门票详情 -->
        <div ref="detailTop"></div>
        <cube-tab-bar 
            v-model="selectedLabelDefault" 
            :data="tabs" 
            @click="clickHandler" 
            @change="changeHandler" 
            show-slider 
            :class="tabFixed==1?'tabFixed':'tabFixedNo'"
            :style="tabFixed==1?{top:tabHightPx}:'top:0'"
        >
        </cube-tab-bar>
         <div :style="tabFixed==1?'height:1.17rem':'height:0'"></div> 
        <scene-detail :sceneInfoC="sceneInfoP" :sceneTabNameC="sceneTabNameP"></scene-detail>

    </div>
</template>
<script>
import { getScenicSpotInfo, getTicketList } from 'api'
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
        headShowP: false,
        sceneInfoP: {},
        sceneTabNameP: '景区须知',
        ticketListP: [],
        tabFixed: 0,
        tabHightPx:0,
        tabHight:0
    }),
    methods: {
        clickHandler(label) {
            this.sceneTabNameP = label;
        },
        changeHandler(label) {
            this.sceneTabNameP = label;
        },
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let detailTop = this.$refs.detailTop.offsetTop;
            let detailPosit = detailTop - scrollTop;
            if (detailPosit < this.tabHight) {
                this.tabFixed = 1
            } else {
                this.tabFixed = 0
            }
            if (scrollTop > 0) {
                this.headShowP = true;

            } else {
                this.headShowP = false;
            }
        },
        showDialogP(val) {
            this.showDialog = val;
        },
        headHightP(val){
            this.tabHightPx = val+'px';
            this.tabHight = val;
        },
        //景点信息
        async getScenicSpotInfo() {
            let data = await getScenicSpotInfo({ n: this.$route.query.sceneId });
            if(data.code!=1){
                return this.$toast(data.message);
            }
            if (data.data.length!=1){
                return
            }
            this.sceneInfoP = data.data[0];
        },
        //门票
        async getTicketList() {
            let data = await getTicketList({ n: 1,m: 100, lid: this.$route.query.sceneId });
            if(data.code!=1){
                this.$toast(data.message);
                return
            }
            this.ticketListP = data.data;
        },
    },
    mounted() {
        this.getScenicSpotInfo();
        this.getTicketList();
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
        sceneDetail: () => import("./components/sceneDetail"),
        BgMask: () => import("@/components/BgMask"),
        HeadTab: () => import("@/components/HeadTab"),
    },
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
    border-bottom: 1px solid #dfdfdf;
}
.fixedIn {
    height: 44px;
}
.fixedInNo {
    height: 0;
}   

.tabFixed{
    position:fixed;width:100%;
    z-index: 1;
}
.tabFixedNo{
    position:relative;
     z-index: 1;
}
</style>