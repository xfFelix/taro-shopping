<template>
    <div class="home">
        <div class="page-loadmore-wrapper" ref="wrapper">
            <div class="wraper">
                <home-swipe></home-swipe>
                <search-head :headShowC='headShowP' v-on:inputC="inputP"></search-head>
                <div class="h-goodsList">
                    <ul ref="scrollUl">
                        <li v-for="(item,index) in ticketList" :key="index">
                            <div @click="goodsDetailId(item.uuid)" class="goodsDetailId">
                                <div class="h-goodsimgLiW">
                                    <img v-lazy="item.uuimgpath" alt="" />
                                </div>
                                <div class="h-goodsInfoLiW">
                                    <p class="h-goodsInfoLi">{{item.uutitle}}</p>
                                    <p class="h-goodsMoneyLiW">
                                        <span class="h-goodsMoneyLi">{{item.uutprice|toDecimal2}}</span>
                                        <span>起</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="!allLoaded && tenFlag">上拉加载更多</div>
            </div>
            <div class="allLoaded" v-if="allLoaded && ticketList.length>0">加载完咯~~</div>
            <no-data :data="ticketList"></no-data>
        </div>
        <span class="iconfont background-op goTop" @click="goTop()" v-if="headShowP">&#xe811;</span>
    </div>
</template>
<script>

import { getScenicList, search } from 'api';
import { mapActions } from 'vuex';

export default {
    data: () => ({
        headShowP: false,
        headInpP: '',
        allLoaded: false,
        ticketList: [],
        pageNum: 1,
        pageSize: 10,
        listFlag: 1,
        tenFlag: false,
        firstFlag: true,  //第一次调且判断是否出现无数据
    }),
    computed: {
        offset() {
            if (this.listFlag == 1) {
                return (this.pageNum - 1) * this.pageSize + 1;
            } else {
                return this.pageSize;
            }
        },
    },
    methods: {
        ...mapActions({
            setScrollto: 'scrollTo/setGoodsList'
        }),
        goTop() {
            //参数i控制速度
            document.body.scrollTop -= 500;
            document.documentElement.scrollTop -= 500;
            if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                var c = setTimeout(() => this.goTop(), 16);
            } else {
                clearTimeout(c);
            }
        },
        goodsDetailId(id) {
            this.setScrollto(document.documentElement.scrollTop || document.body.scrollTop)
            this.$router.push({ path: 'goodsDetail', query: { sceneId: id } })
        },
        handleScroll() {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 0) {
                this.headShowP = true;
            } else {
                this.headShowP = false;
            }
            //变量windowHeight是可视区的高度
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (scrollHeight - scrollTop - windowHeight < 50) {
                this.loadBottom()
            }
        },
        inputP(val) {
            this.initData();
            this.listFlag = 0;
            this.headInpP = val;
            this.search();
        },
        async loadBottom() {
            if (this.allLoaded == true) return;
            if (this.listFlag == 1) {
                this.pageNum++;
                await this.getScenicList();
            } else {
                this.pageSize = this.pageSize + 10;
                await this.search()
            }
        },
        initData() {
            this.pageSize = 10;
            this.pageNum = 1;
            this.ticketList = [];
            this.firstFlag = true;
            this.allLoaded = false;
            this.tenFlag = false;
        },
        listConcat(data) {
            if (this.firstFlag == true && data.length < 1) { //第一次且没数据
                return this.allLoaded = true;
            }
            if (data.length < 10) { //加载完了
                this.allLoaded = true;
                this.tenFlag = false;
                console.log("加载完了")
            }
            if(data.length == 10){
                this.tenFlag = true;
                console.log("还能加载更多")
            }
            this.ticketList = this.ticketList.concat(data);
            this.firstFlag = false;
        },
        async getScenicList() {
            let data = await getScenicList({ n: this.offset, m: this.pageSize });
            if (data.code != 1) {
                return this.$toast(data.message);
            }
            this.listConcat(data.data);
        },
        async search() {
            let data = await search({ keyword: this.headInpP, offset: this.pageSize });
            if (data.code != 1) {
                return this.$toast(data.message);
            }
            this.listConcat(data.data);
        },
    },
    mounted() {
        this.getScenicList();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    components: {
        HomeSwipe: () => import('./components/HomeSwipe'),
        SearchHead: () => import('./components/SearchHead'),
        NoData: () => import('components/NoData')
    }
}
</script>

<style lang="scss" scoped>
.h-goodsList {
    padding: 0 8px 10px 8px;
    ul {
        li {
            .goodsDetailId {
                display: flex;
                background: #fff;
                height: 79px;
                padding: 10px 0;
                box-shadow: 2px 4px 10px 0px #e1ebff;
                margin: 8px 0;
                .h-goodsimgLiW {
                    width: 120px;
                    height: 80px;
                    margin: 0 7px 0 9px;
                    flex-shrink: 0;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .h-goodsInfoLiW {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin: 0;
                    text-align: left;
                    .h-goodsInfoLi {
                        margin: 0;
                        line-height: 17px;
                        color: #000;
                    }
                    .h-goodsMoneyLiW {
                        font-size: 10px;
                        color: #999999;
                        .h-goodsMoneyLi {
                            font-size: 15px;
                            color: #30ce84;
                        }
                    }
                }
            }
        }
    }
}

.allLoaded,
.mint-loadmore-bottom {
    text-align: center;
    margin-bottom: 15px;
}

.page-loadmore-wrapper {
    // -webkit-overflow-scrolling: touch;
    text-align: center;
}

.goTop {
    width: 35px;
    height: 36px;
    color: #fff;
    display: inline-block;
    font-size: 25px;
    line-height: 36px;
    text-align: center;
    bottom: 8px;
    right: 8px;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    z-index: 100;
}
</style>
