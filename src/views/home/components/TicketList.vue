<template>
    <div class="h-goodsList">
        <div class="scroll-list-wrap" ref="scenicListHight">
            <cube-scroll ref="scroll" :data="ticketList" :options="options" @pulling-up="onPullingUp">
                <ul>
                    <li v-for="(item,index) in ticketList" :key="index">
                        <router-link :to="{ path: 'goodsDetail', query: { sceneId:item.uuid}}">
                            <div class="h-goodsimgLiW">
                                <img src="" alt="" />
                            </div>
                            <div class="h-goodsInfoLiW">
                                <p class="h-goodsInfoLi">{{item.uutitle}}</p>
                                <p class="h-goodsMoneyLiW">
                                    <span class="h-goodsMoneyLi">{{item.uuid}}</span>
                                    <span>id起</span>
                                </p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </cube-scroll>
        </div>
    </div>
</template>
<script>
import { getScenicList } from 'api'
export default {
    data: () => ({
        ticketList: [],
        pageNum: 2,
        pageSize: 10
    }),
    computed: {
        offset() {
            return (this.pageNum - 1) * this.pageSize;
        },
        options() {
            return {
                pullDownRefresh: this.pullDownRefreshObj,
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: '上拉加载更多',
                        noMore: '没有更多数据'
                    }
                },
            }
        },
    },
    methods: {
        async getScenicList() {
            let data = await getScenicList({ n: this.offset, m: this.pageSize });
            if(data.code!=1){
                this.$toast(data.message);
                return
            }
            this.ticketList = this.ticketList.concat(data.data);
            if (data.data.length < 10) {
                this.$refs.scroll.forceUpdate();
            }
        },


        onPullingUp() {
            this.pageNum++
            this.getScenicList()
        },
    },
    mounted() {
        this.getScenicList();
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
    height: calc(100vh - 178px);
}
</style>