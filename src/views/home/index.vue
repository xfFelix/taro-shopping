<template>
    <div class="home">
        <!-- <keep-alive> -->
            <home-swipe></home-swipe>
            <search-head :headShowC='headShowP' v-on:inputC="inputP"></search-head>
            <ticket-list :sceneListC='sceneListP' v-on:pullUpC="pullUpP" :flagC="flagP" :firstC="firstP"></ticket-list>
            
        <!-- </keep-alive> -->
    </div>
</template>
<script>
import { search, getScenicList } from 'api';
export default {
    data: () => ({
        headShowP: false,
        sceneListP: [],
        flagP: 0,//判断是搜索列表或者是全部列表
        headInp: '',
        firstP: true //判断是否是第一次传
    }),

    watch: {

    },
    methods: {
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 0) {
                this.headShowP = true;
            } else {
                this.headShowP = false;
            }
        },
        init() {
            this.sceneListP = [];
            this.firstP = true;
        },
        inputP(val) {
            this.init();
            this.flagP = 1;
            this.headInp = val;
            this.search(10);
        },
        //监听子组件传来的offset
        pullUpP(val) {
            this.firstP = false;
            if (this.flagP == 0) {
                this.getScenicList(val);
            } else {
                this.search(val);
            }
        },
        async getScenicList(offset) {
            let data = await getScenicList({ n: offset, m: 10 });
            if (data.code != 1) {
                return this.$toast(data.message); 
            }
            this.sceneListP = data.data;
        },
        async search(offset) {
            let data = await search({ keyword: this.headInp, offset: offset });
            if (data.code != 1) {
                return this.$toast(data.message);
            }
            this.sceneListP = data.data;
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.init();
        this.getScenicList(1)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    components: {
        HomeSwipe: () => import('./components/HomeSwipe'),
        SearchHead: () => import('./components/SearchHead'),
        TicketList: () => import('./components/TicketList'),
        NoData: () =>import('components/NoData')
    }
}
</script>
