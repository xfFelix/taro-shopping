<template>
    <div class="oilRecord">
        <div class="headFixed">
            <header>
                <i class="cubeic-back" @click="$router.back()"></i>
                加油卡充值
            </header>
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
            <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp" v-if="recodeList.length!=0">
                <ul class="recordW">
                    <li v-for="(item,index) in recodeList" :key="index">
                        <div class="reName flex">
                            <span>商品名：{{item.cardUser}}</span>
                            <div v-if="changeFlag">
                                <span v-if="item.status==2">兑换成功</span>
                                <span v-else>兑换中</span>
                            </div>
                            <div v-else>
                                <span v-if="item.status==3">已回收</span>
                                <span v-else>未回收</span>
                            </div>
                        </div>
                        <div class="reTM flex">
                            <p class="reBuyTime flex">
                                <span>{{item.orderTime}}</span>
                            </p>
                            <p class="reAllMoney">
                                <span>合计：</span>
                                <span>{{item.totalAmount|toPrice}}</span>
                            </p>
                        </div>
                        <div class="reInfoW">
                            <div class="reInfo">
                                <p class="cardNum" v-if="changeFlag">
                                    <span>卡号：</span>
                                    <span>{{item.cardNum}}</span>
                                </p>
                                <p class="cardNum" v-if="!changeFlag">
                                    <span>卡号：</span>
                                    <span>{{item.idBackUrl}}</span>
                                </p>
                                <p class="cardNum" v-if="!changeFlag">
                                    <span>卡密：</span>
                                    <span>{{item.memo}}</span>
                                </p>
                                <p class="cardNum" v-if="!changeFlag">
                                    <span>面值：</span>
                                    <span>{{item.orderNum|toPrice}}</span>
                                </p>
                                <p v-if="changeFlag">
                                    <span>售价：</span>
                                    <span>{{item.repaymentAmount|toPrice}}</span>
                                </p>
                                <p>
                                    <span>服务费：</span>
                                    <span>{{item.serviceFee|toPrice}}</span>
                                </p>
                                <p>
                                    <span>税费：</span>
                                    <span>{{item.taxFee|toPrice}}</span>
                                </p>
                            </div>
                            <div class="recover" v-if="!changeFlag" @click="recovery(item.id,item.status)" :class="item.status==1?'recoverCan':'recoverNo'">
                                回收
                            </div>
                        </div>
                    </li>
                </ul>
            </cube-scroll>
            <no-data :data="recodeList"></no-data>
        </div>
    </div>
</template>
<script>
import { oilOrderList } from 'api';
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        changeFlag: 1,
        typeFlag: 1,
        recodeList: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '上拉加载更多...',
        pullUpLoadNoMoreTxt: '没有更多数据了~~',
        pageSize: 10,
        tenFlag: true,
        pageNum: 1
    }),
    components: {
        NoData: () => import('components/NoData')
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
        },
        offset() {
            return (this.pageNum - 1) * this.pageSize + 1;
        },
        ...mapGetters({
            getToken: 'getToken',
        }),
    },
    methods: {
        initData() {
            this.pageNum = 1;
            this.recodeList = [];
            this.tenFlag === true
        },
        directCharge() {
            this.changeFlag = 1;
            this.typeFlag = 1
            this.initData();
            this.getScenicList();
        },
        cardCharge() {
            this.changeFlag = 0;
            this.typeFlag = 2;
            this.initData();
            this.getScenicList();
        },
        async getScenicList() {
            let data = await oilOrderList({
                token: this.getToken,
                type: this.typeFlag,
                offset: this.offset,
                rows: this.pageSize
            });
            if (data.code != 1) {
                return this.$toast(data.message);
            }
            this.recodeList.push(...data.data);
            if (data.data.length < 10) {
                this.tenFlag = false;
            }
            this.pageNum++
        },
        onPullingUp() {
            if (this.tenFlag === true) {
                this.getScenicList();
            }

            if (!this.tenFlag && this.recodeList.length > 0) {
                this.$refs.scroll.forceUpdate();
            }
        },
        recovery(id, status) {
            if (status == 1) {
                this.$router.push({ path: '/oil/oilRecovery', query: { id: id } })
            }
        }
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
            .recover {
                position: absolute;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-radius: 30px;
                bottom: 0;
                right: 0;
                color: #fff;
            }
            .recoverCan {
                background: #30CE84;
            }
            .recoverNo {
                background: #C3C3C3;
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
    padding-top: 100px;
    height: calc(100vh - 100px);
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
}

header {
    position: relative;
    line-height: 70px;
    text-align: center;
    background: #fff;
    font-size: 18px;
    .cubeic-back {
        position: absolute;
        left: 18px;
    }
}
</style>
