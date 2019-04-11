<template>
    <div class="goodsDetail" ref="goodsTop">
        <swpie></swpie>
        <head-top :headShowC='headShowP' v-on:showDialogC='showDialogP' v-on:headHightC='headHightP'></head-top>
        <!-- 头部导航栏 -->
        <head-tab v-if="showDialog"></head-tab>
        <bg-mask v-model="showDialog" color="transparent"></bg-mask>
        <!-- 票价信息 -->
        <ticket-info :sceneInfoC="sceneInfoP"></ticket-info>
        <order-now :ticketListC="ticketListP"></order-now>
        <!-- 门票详情 -->
        <div ref="detailTop">1</div>
        <cube-tab-bar 
            v-model="selectedLabelDefault" 
            :data="tabs" 
            @click="clickHandler" 
            @change="changeHandler" 
            show-slider 
            :class="tabFixed==1?'tabFixed':'tabFixedNo'"
            :style="{top:tabHight}"
        >
        </cube-tab-bar>
        <div :class="tabFixed==1?'fixedIn':'fixedInNo'"></div>
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
        tabHight:0
    }),
    methods: {
        clickHandler(label) {
            this.sceneTabNameP = label;
            switch (label) {
                case '景区须知':
                    window.scrollTo(10,937); 
                case '景区简介':
                    window.scrollTo(0,1931);  
                 case '交通指南':
                    window.scrollTo(0,2400);
                 case '旅游主题':
                    window.scrollTo(0,2400);
            }
            console.log('changed to:', label)
        },
        changeHandler(label) {
            this.sceneTabNameP = label;
            console.log('changed to:', label)
        },
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let detailTop = this.$refs.detailTop.offsetTop;
            let detailPosit = detailTop - scrollTop;
            // console.log(detailPosit)
            if (detailPosit <=90) {
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
            this.tabHight = val;
        },
        //景点信息
        async getScenicSpotInfo() {
            let data = await getScenicSpotInfo({ n: this.$route.query.sceneId });
            if(data.code!=1){
                this.$toast(data.message);
                return
            }
            this.sceneInfoP = data.data[0];
        },
        //门票
        async getTicketList() {
            let data = await getTicketList({ n: 1,m: 10, lid: this.$route.query.sceneId });
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
}
.fixedIn {
    height: 44px;
}
.fixedInNo {
    height: 0;
}

.tabFixed{
    position:fixed;width:100%;
}
.tabFixedNo{
    position:relative
}
</style>