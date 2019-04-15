<template>
    <div class="home">
        <div class="page-loadmore-wrapper" ref="wrapper">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottom-status.sync="bottomStatus" @bottom-status-change="handleBottomChange">
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
                <div slot="bottom" class="mint-loadmore-bottom" v-show="ticketList.length>0">
                    <span v-show="bottomStatus === 'drop'">释放更新...</span>
                    <span v-show="bottomStatus === 'pull'">上拉加载更多</span>
                    <span v-show="bottomStatus === 'loading'"> 数据加载中...</span>
                </div>
            </mt-loadmore>
            <div class="allLoaded" v-if="allLoaded && ticketList.length>0">加载完咯~~</div>
            <no-data :data="ticketList"></no-data>
        </div>
    </div>
</template>
<script>

import { Loadmore } from 'mint-ui';
import { getScenicList, search } from 'api';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        headShowP: false,
        headInpP: '',
        allLoaded: false,
        ticketList: [],
        pageNum: 1,
        pageSize: 10,
        listFlag: 1,
        showList: true,
        firstFlag: true,  //第一次调且判断是否出现无数据
        bottomStatus: '',
        ticketListFlag:false
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
            setScrollto: 'setGoodsList'
        }),
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        goodsDetailId(id) {
            this.setScrollto(document.documentElement.scrollTop || document.body.scrollTop)
            this.$router.push({ path: 'goodsDetail', query: { sceneId: id } })
        },
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 0) {
                this.headShowP = true;
            } else {
                this.headShowP = false;
            }
        },
        inputP(val) {
            this.initData();
            this.listFlag = 0;
            this.headInpP = val;
            this.search();
        },
        async loadBottom() {
            console.log(this.bottomStatus)
            if (this.listFlag == 1) {
                await this.getScenicList();
                this.pageNum++;

            } else {
                await this.search()
                this.pageSize = this.pageSize + 10;
            }
            this.$refs.loadmore.onBottomLoaded();
        },
        initData() {
            this.pageSize = 10;
            this.pageNum = 1;
            this.ticketList = [];
            this.firstFlag = true;
            this.showList = true;
        },
        listConcat(data) {
            if (this.firstFlag == true && data.length < 1) {
                this.allLoaded = true;
                this.showList = false;
                return
            }
            this.ticketList = this.ticketList.concat(data);

            if (data.length < 10) {
                this.allLoaded = true;
            }
            this.firstFlag = false;
        },
        async getScenicList() {
            let data = await getScenicList({ n: this.offset, m: this.pageSize });
            if (data.code != 1) {
                this.$toast(data.message);
                return
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
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    components: {
        HomeSwipe: () => import('./components/HomeSwipe'),
        SearchHead: () => import('./components/SearchHead'),
        TicketList: () => import('./components/TicketList'),
        "mt-loadmore": Loadmore,
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
    -webkit-overflow-scrolling: touch;
    text-align: center;
}
</style>
