<template>
    <div class="agreeFixed" v-if="show">
        <div class="iconfont goback" @click="$emit('handle-show-file')">&#xe61e;</div>
        <div class="agreeContentW">
            <h1>
                加油卡回收协议
            </h1>
            <div class="agreeContent">
                本协议是本人与椰子竞技积分商城加油卡充值供应商苏州收卡啦信息技术有限公司之间的就加油卡回收服务等相关事宜所订立的契约与约定（以下简称“本协议”）。<br/>
                1、充值卡：本协议所称加油卡，为中石油、中石化发行的具有一定面值，可用于加油卡充值的卡片。<br/>
                2、本人接受在使用本服务时支付一定手续费，手续费金额以页面提示为准。手续费将直接从充值卡面值中扣除，即回收实际到账金额为充值卡面值减去手续费。<br/>
                3、本人保证充值卡密来源的合法性，对该卡密来源的合法性承担责任，收卡啦拒绝一切通过传销、诈骗等非法手段获取的充值卡密，一经发现异常情况，收卡啦有义务告知公安机关进行调查处理，并向公安机关提供该用户的交易记录和个人信息，收卡啦对该卡密的合法性不承担任何责任。<br/>
                4、本人承诺使用本服务时符合收卡啦用户实名制度。 <br/>
                5、本人同意，由于本人输入加油卡信息有误导致的延期到账或失败等问题，由此产生的损失自行承担，收卡啦对此不承担责任，且自行解决或联系发卡商（即中石油、中石化）解决，收卡啦不介入处理。 <br/>
                6、本人将严格遵守页面提示的每日或每月的最高转让限额，否则对超过限额的回收，收卡啦有权不提供服务。 <br/>
                7、为保障回收款及时安全到账，请保障填写账户信息无误。 <br/>
                8、本人知悉：本服务条款是处理双方权利义务的约定，除非违反国家强制性法律，否则始终有效。在本人下订单的同时，表示本人明确知晓以上事实，并与收卡啦达成协议并接受所有的服务条款，并且本人对本人在订单中提供的所有信息的正确、完整和真实性负责。<br/>
                9、本人确认：收卡啦对本合约中有关免除或限制收卡啦责任、椰子分商城单方面拥有某些权利、增加本人责任或限制本人权利的条款，均已向本人进行了提示和说明。 <br/>
                10、一旦勾选，即视为本人已经完全了解并接受本协议的全部内容，本人已阅读回收条款，充分了解回收相关信息，将严格按条款内容回收加油卡，对本协议条款的含义和相应的法律后果已全部清楚并理解，愿意遵守其全部内容。同时本人声明填写的回收信息内容完全属实，并保证其内容的真实性。 最终解释权归苏州收卡啦信息技术有限公司所有。
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({

    }),
    methods: {
        goBack() {

        }
    },
    mounted() {
        console.log(this.show)
    }

}
</script>

<style lang="scss" scoped>
.agreeFixed {
    position: fixed;
    top: 0;
    z-index: 10;
    background: #fff;
    height: 100%;
}

.goback {
    height: 50px;
    line-height: 50px;
    margin-left: 15px;
}

h1 {
    text-align: center;
    font-size: 18px;
    color: #419AFE;
    line-height: 50px;
}

.agreeContentW {
    position: relative;
    overflow: scroll;
    height: 100%;
    margin: 0 20px;
    .agreeContent {
        font-size: 13px;
        line-height: 28px;
        padding-bottom: 150px;
    }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .agreeFixed{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
