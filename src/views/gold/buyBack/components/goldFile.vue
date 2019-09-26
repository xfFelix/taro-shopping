<template>
    <div class="agreeFixed" v-if="show">
        <div class="iconfont goback" @click="$emit('handle-show-file')">&#xe61e;</div>
        <div class="agreeContentW">
            <h1>
                《回购协议》
            </h1>
            <div class="agreeContent">
             本协议是本人与椰子分商城黄金兑换供应商深圳市金宇阳光文化发展有限公司之间就黄金回购服务等相关事宜所订立的契约与约定（以下简称“本协议”）。<br/>
              1、 回购产品仅针对深圳市金宇阳光文化发展有限公司在椰子分商城售卖的黄金制品。<br/>
              2、 为保障回购客户利益和流程的安全性，回购时间统一在工作日早10：00-11:30，13:30-16:00进行。<br/>
              3、 回购检测费统一按照标准3元/克，以当日上海黄金交易所实时金价价格计算。<br/>
              4、 若实物需要回购时，用户需将兑换凭证（成交确认单原件）、检测证书以及保证包装完整邮寄至指定地址（邮费自付），回购公司收到金条/金砂安排人员在摄像头底下拆包、检查完回购产品外包装、证书等相关物品后进行成色检测（确认产品印记、克重、票据真伪、鉴定黄金真伪、及纯度）。<br/>
              5、 如检测无误，将根据上海黄金交易所实时金价减去检测费后的价格，锁定金价，电话与用户本人确认无误后，回购公司将在回购当天算起1个工作日内将回购资金转入申请人填写的银行账户内。<br/>
              6、 如检测出现疑问，回购公司有权终止回购操作，以书面形式说明检测结果和终止理由，并将联系本人退回产品（邮费自付）。<br/>
              7、 为保障回购款及时安全到账，请保障填写银行账户信息无误。<br/>
              8、本人知悉：本服务条款是处理双方权利义务的约定，除非违反国家强制性法律，否则始终有效。在本人下订单的同时，表示本人明确知晓以上事实，并与深圳市金宇阳光文化发展有限公司达成协议并接受所有的服务条款，并且本人对本人在订单中提供的所有信息的正确、完整和真实性负责。<br/>
              9、本人确认：深圳市金宇阳光文化发展有限公司对本合约中有关免除或限制责任、深圳市金宇阳光文化发展有限公司单方面拥有某些权利、增加本人责任或限制本人权利的条款，均已向本人进行了提示和说明。<br/>
              10、一旦勾选，即视为本人已经完全了解并接受本协议的全部内容，本人已阅读回购条款，充分了解回购相关信息，将严格按条款内容回购贵金属产品，对本协议条款的含义和相应的法律后果已全部清楚并理解，愿意遵守其全部内容。同时本人声明填写的回购信息内容完全属实，并保证其内容的真实性。<br/>
              最终解释权归深圳市金宇阳光文化发展有限公司所有。<br/>
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
    color: #30ce84;
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
        text-indent: 2em;
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
