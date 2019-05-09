<template>
  <div class="cardType">
    <!-- 选择卡券 -->
    <card-select @info-content="infoContent"></card-select>
    <!-- 兑换信息 -->
    <charge-info :show="show.info" @go-back="initShow" @send-sms="sendCode" :info="chargeInfo"></charge-info>
    <!-- 短信 -->
    <sms-code :show="show.sms" @go-back="initShow" @code-info="codeInfo"></sms-code>
    <!-- 遮罩层 -->
    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>

  </div>
</template>
<script>
import { vipCostInfo, sendSmsCode, vipSubmit } from 'api';
import { mapGetters } from 'vuex';
import { tools_uri } from 'common/tools';
export default {
  data: () => ({
    show: {
      mask: false,
      info: false,
      sms: false
    },
    productId: undefined,
    chargeInfo: {
      productName: undefined,
      sellingPrice: undefined,
      tax_total: undefined,
      total: undefined,
      cardNumber: undefined
    },
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken',
    })
  },
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow()
        }
      }
    }
  },
  methods: {
    initShow() {
      this.show = { mask: false, info: false, sms: false };
    },
    showInfo() {
      this.show = { mask: true, info: true, sms: false };
    },
    showSms() {
      this.show = { mask: true, info: false, sms: true };
    },
    infoContent(item) {
      this.productId = item.productId;
      this.chargeInfo.cardNumber = item.cardNumber;
      this.vipCostInfo();
    },
    //兑换信息
    async vipCostInfo() {
      let data = await vipCostInfo({ token: this.getToken, productId: this.productId });
      if (res.code !== '1' && res.code !== '6') return this.$toast(data.message);
      if (data.code === '6') {
        return this.$dialog({ content: '请先实名认证' }, () => {
          return window.location.href = process.env.VUE_APP_INFO_URl + '#!/cert?back=' + tools_uri.encode(window.location) + '&token=' + this.getToken;
        })
      }
      this.chargeInfo.productName = data.data.productName;
      this.chargeInfo.sellingPrice = data.data.sellingPrice;
      this.chargeInfo.tax_total = data.data.tax_total;
      this.chargeInfo.total = data.data.total;

      this.showInfo();
    },
    //发送短信
    async sendSmsCode() {
      let res = await sendSmsCode({ token: this.getToken })
      if (res.error_code) {
        this.initShow();
        return this.$toast(res.message);
      };
      this.showSms()
    },
    sendCode() {
      this.sendSmsCode();
    },
    codeInfo(val) {
      this.initShow();
      this.vipSubmit(val)
    },
    //提交订单
    async vipSubmit(code) {
      let res = await vipSubmit({ code: code, token: this.getToken, productId: this.productId, accountNo: this.chargeInfo.cardNumber })
      if (res.code != 1) {
        this.initShow();
        return this.$toast(res.message);
      }
      this.$router.push({ name: 'cardChangeS', query: { num: this.chargeInfo.cardNumber, productId: this.productId } })
    },
  },
  components: {
    ChargeInfo: () => import('./components/ChargeInfo'),
    BgMask: () => import('components/BgMask'),
    SmsCode: () => import('./components/SmsCode'),
    CardSelect: () => import('./components/CardSelect'),
  },
  mounted() {


  }
}
</script>

<style lang="scss" scoped>
.cardType {
  background: #fff;
  width: 100%;
  height: 100%;
}
</style>
