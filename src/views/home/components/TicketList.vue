<template>
    <div class="h-goodsList">
        <div class="scroll-list-wrap" ref="scenicListHight">
            <cube-scroll ref="scroll" :data="ticketList" :options="options" @pulling-up="onPullingUp" v-if="showList">
                <ul ref="scrollUl">
                    <li v-for="(item,index) in ticketList" :key="index">
                        <router-link :to="{ path: 'goodsDetail', query: { sceneId:item.uuid}}">
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
                        </router-link>
                    </li>
                </ul>

            </cube-scroll>
            <no-data :data="ticketList"></no-data>
        </div>

    </div>
</template>
<script>
import { getScenicList, search } from 'api'
export default {
    props: {
        headInpC: String
    },
    data: () => ({
        ticketList: [],
        pageNum: 1,
        pageSize: 10,
        headInp: '',
        listFlag: 1,
        showList: true,
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
        options() {
            return {
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: '上拉加载更多',
                        noMore: '没有更多数据了~~'
                    }
                },
            }
        },
    },
    watch: {
        headInpC: {
            handler(newVal) {
                this.init();
                this.listFlag = 0;
                this.headInp = newVal;
                this.search();
            },
        }
    },
    methods: {
        init() {
            this.pageSize = 10;
            this.pageNum = 1;
            this.ticketList = [];
            this.firstFlag = true;
            this.showList = true;
            // let cube = document.getElementsByClassName("cube-scroll-content")[0];
            // console.log(cube.style.alignContent)
            // cube.style.transform="translate(0px, 0px) scale(1) translateZ(0px)"
        },
        listConcat(data) {
            if (this.firstFlag == true && data.length < 1) {
                return this.showList = false;
            }
            this.ticketList = this.ticketList.concat(data);
            if (data.length < 10) {
                this.$refs.scroll.forceUpdate();
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
            let data = await search({ keyword: this.headInp, offset: this.pageSize });
            if (data.code != 1) {
                return this.$toast(data.message);
            }
            this.listConcat(data.data);
        },
        onPullingUp() {
            if (this.listFlag == 1) {
                this.pageNum++;
                this.getScenicList();
            } else {
                this.pageSize = this.pageSize + 10;
                this.search()
            }
        },
    },
    mounted() {
        this.init();
        this.getScenicList();

        // let cube = document.getElementsByClassName("cube-scroll-content")[0];

    },
    components: {
        NoData: () => import('components/NoData')
    },
}
</script>
<style lang="scss" scoped>
.h-goodsList {
    padding: 0 8px 10px 8px;
    ul {
        li {
            a {
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

.scroll-list-wrap {
    height: calc(100vh - 228px);
}
</style>