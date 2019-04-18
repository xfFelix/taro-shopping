<template>
    <div class="oilRecord">
        <div class="headFixed">
            <Header>加油卡充值</Header>
            <div class="whoSelectW">
                <p :class="changeFlag?'whoSelectLogo':''" @click="directCharge()">
                    <span>直充</span>
                    <span></span>
                </p>
                <span class="divide">|</span>
                <p :class="changeFlag?'':'whoSelectLogo'">
                    <span @click="cardCharge()">充值卡</span>
                    <span></span>
                </p>
            </div>
        </div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp">
                <ul class="recordW">
                    <li v-for="(item,index) in recodeList" :key="index">
                        <div class="reName flex">
                            <span>商品名：{{item.cardUser}}</span>
                            <span v-if="item.status==2">兑换成功</span>
                            <span v-else>兑换中</span>
                            
                        </div>
                        <div class="reTM flex">
                            <p class="reBuyTime flex">
                                <span>2019-06-02 20:45:06</span>
                            </p>
                            <p class="reAllMoney">
                                <span>合计：</span>
                                <span>{{item.totalAmount}}</span>
                            </p>
                        </div>
                        <div class="reInfoW">
                            <div class="reInfo">
                                <p class="cardNum">
                                    <span>卡号：</span>
                                    <span>{{item.cardNum}}</span>
                                </p>
                                 <p class="cardNum">
                                    <span>卡密：</span>
                                    <span>{{item.cardNum}}</span>
                                </p>
                                 <p class="cardNum">
                                    <span>面值：</span>
                                    <span>{{item.cardNum}}</span>
                                </p>
                                <p>
                                    <span>售价：</span>
                                    <span>{{item.repaymentAmount}}</span>
                                </p>
                                <p>
                                    <span>服务费：</span>
                                    <span>{{item.serviceFee}}</span>
                                </p>
                                <p>
                                    <span>税费：</span>
                                    <span>{{item.taxFee}}</span>
                                </p>
                            </div>
                            <router-link :to="{path:'/oil/oilRecovery',query:{recoverId:'1111'}}" class="recoverCon" v-if="!changeFlag">
                                回收
                            </router-link>
                        </div>
                    </li>
                </ul>

            </cube-scroll>
        </div>
    </div>
</template>
<script>
import { oilOrderList } from 'api';
export default {
    data: () => ({
        changeFlag: 1,
        recodeList: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: 'Load more',
        pullUpLoadNoMoreTxt: 'No more data',
    }),
    components: {
        "Header": () => import("components/Header")
    },
    computed: {
        options() {
            return {
                pullUpLoad: this.pullUpLoadObj,
            }
        },

        pullUpLoadObj: function() {
            return this.pullUpLoad ? {
                threshold: parseInt(this.pullUpLoadThreshold),
                txt: {
                    more: this.pullUpLoadMoreTxt,
                    noMore: this.pullUpLoadNoMoreTxt
                }
            } : false
        }
    },
    methods: {
        directCharge() {
            this.changeFlag = 1;
        },
        cardCharge() {
            this.changeFlag = 0;
        },
        async getScenicList() {
            let data = await oilOrderList({
                token: "6142811501a036f94990439505d9c346",
                type: "1",
                offset: "1",
                rows: "10"
            });
            if (data.code != 1) {
                return this.$toast(data.message);
            }
            this.recodeList=data.data;
        },
        onPullingUp() {
            console.log("111")
            // 更新数据
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    // 如果有新数据
                    let newPage = _foods.slice(0, 5)
                    this.items = this.items.concat(newPage)
                } else {
                    // 如果没有新数据
                    this.$refs.scroll.forceUpdate()
                }
            }, 1000)
        },
    },
    mounted() {
        this.getScenicList()
    }
}
</script>
<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.whoSelectW {
    display: flex;
    justify-content: space-around;
    height: 30px;
    align-items: center;
    background: #fff;
    P {
        width: 90px;
        text-align: center;
        color: #000000;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
        span:first-of-type {
            margin-bottom: 5px;
        }
        span:last-of-type {
            width: 100%;
            height: 2px;
            background: #fff;
            display: block;
        }
    }
    .whoSelectLogo {
        color: #30CE84;
        span:last-of-type {
            background: #30CE84;
        }
    }
    .divide {
        color: #b1b1b1;
        font-size: 18px;
    }
}

.recordW {
    li {
        border: 1px solid #DEDEDE;
        background: #fff;
        border-radius: 5px;
        margin: 15px 17px;
        font-size: 13px;
        padding: 20px 25px 20px 15px;
        .reName {
            span:first-of-type {
                color: #070707;
            }
            span:last-of-type {
                color: #8B8B8B;
            }
        }
        .reTM {
            .reBuyTime {
                color: #8B8B8B;
                line-height: 30px;
                &:before {
                    content: '';
                    width: 7px;
                    height: 7px;
                    background: #8B8B8B;
                    display: inline-block;
                    border-radius: 50%;
                    margin-right: 3px;
                }
            }
            .reAllMoney {
                color: #30CE84;
            }
        }
        .reInfoW {
            color: #8B8B8B;
            display: flex;
            align-items: baseline;
            position: relative;
            .reInfo {
                p {
                    line-height: 21px;
                    span:first-of-type {}
                    span:last-of-type {}
                }
                .cardNum {}
            }
            &:before {
                content: '';
                width: 7px;
                height: 7px;
                background: #0DC971;
                display: inline-block;
                border-radius: 50%;
                margin-right: 3px;
            }
            .recoverCon {
                position: absolute;
                width: 100px;
                height: 30px;
                line-height: 30px;
                background: #30CE84;
                color: #fff;
                text-align: center;
                border-radius: 30px;
                bottom: 0;
                right: 0;
            }
        }
    }
}

.headFixed {
    position: fixed;
    width: 100%;
    z-index: 2;
}

.scroll-list-wrap {
    padding-top: 74px;
    height: calc(100vh - 74px);
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
}
</style>
