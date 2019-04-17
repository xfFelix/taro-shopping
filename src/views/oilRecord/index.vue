<template>
    <div class="oilRecord">
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
        <ul class="recordW">
            <li>
                <div class="reName flex">
                    <span>商品名：100元加油卡直充（中石油）</span>
                    <span>兑换成功</span>
                </div>
                <div class="reTM flex">
                    <p class="reBuyTime flex">
                        <span>2019-06-02 20:45:06</span>
                    </p>
                    <p class="reAllMoney">
                        <span>合计：</span>
                        <span>33.80</span>
                    </p>
                </div>
                <div class="reInfoW">
                    <div class="reInfo">
                        <p class="cardNum">
                            <span>卡号：</span>
                            <span>1874657876263621</span>
                        </p>
                        <p>
                            <span>售价：</span>
                            <span>30.00</span>
                        </p>
                        <p>
                            <span>服务费：</span>
                            <span>30.00</span>
                        </p>
                        <p>
                            <span>税费：</span>
                            <span>30.00</span>
                        </p>
                    </div>
                    <div class="recoverCon" v-if="!changeFlag">
                        回收
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data: () => ({
        changeFlag:1
    }),
    components: {
        "Header": () => import("components/Header")
    },
    methods:{
        directCharge(){
                this.changeFlag = 1;
        },
        cardCharge(){
            this.changeFlag = 0;
        }
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
            .recoverCon{
                position: absolute;
                width: 100px;
                height: 30px;
                line-height: 30px;
                background: #30CE84;
                color: #fff;
                text-align: center;
                border-radius:30px;
                bottom: 0;
                right: 0;
            }
        }
    }
}
</style>
