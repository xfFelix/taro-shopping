<template>
  <div class="home">
    <score :rechargeType.sync="rechargeType"></score>
    <price-list :rechargeType="rechargeType" @handler-click="handlerClick"></price-list>

    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <!-- 加油卡号dialog -->
    <card-number :show="show.card" @close-dialog="initShow" @handler-show-info="handlerShowInfo"></card-number>
    <!-- 短信dialog -->
    <sms-code :show="show.code" @handler-show-info="handlerShowInfo" @submit-order="submitOrder"></sms-code>
    <!-- 选择类型dialog 中石化1，中石油2 -->
    <select-type :show="show.type" @handler-show-info="handlerShowInfo" @init-show="initShow"></select-type>
    <!-- 详情dialog -->
    <recharge-info :show="show.info" @handler-show-code="handlerShowCode" @go-back="goBack"></recharge-info>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    Score: () => import('./components/Score'),
    PriceList: () => import('./components/PriceList'),
    CardNumber: () => import(/* webpackPrefetch: true */ './components/CardNumber'),
    BgMask: () => import(/* webpackPrefetch: true */ 'components/BgMask'),
    SmsCode: () => import(/* webpackPrefetch: true */ './components/SmsCode'),
    SelectType: () => import(/* webpackPrefetch: true */ './components/SelectType'),
    RechargeInfo: ()=> import(/* webpackPrefetch: true */ './components/RechargeInfo')
  },
  data: () => ({
    rechargeType: 1, // 充值方式： 1 直充 2 加油卡充值
    show: {
      mask: false,
      card: false,
      code: false,
      type: false,
      info: false
    }
  }),
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow()
        }
      }
    }
  },
  created() {
    this.initConfig()
  },
  computed: {
    ...mapGetters({
      config: 'oil/getConfig'
    })
  },
  methods: {
    async submitOrder () {
      const {faceValue, code, cardNum, token, type} = this.config
      let config = {faceValue, code, cardNum, token, rechargeType: this.rechargeType, oilCardType: type}
      const {submitOilOrder} = await import(/* webpackPrefetch: true */ 'api')
      let res = await submitOilOrder(config)
      if (res.code !== '1') return this.$toast(res.message)
      this.initShow()
      this.$router.push({
        path: '/oil/oilChangeS',
        query: {
          id : res.data
        }
      })
    },
    handlerClick() {
      if (this.rechargeType === 1) {
        this.handlerShowCard()
      } else if (this.rechargeType === 2) {
        this.handlerShowType()
      }
    },
    initShow() {
      this.show = { mask: false, card: false, code: false, type: false, info: false }
    },
    handlerShowInfo() {
      this.show = { mask: true, info: true, type: false, card: false, code: false }
    },
    handlerShowType() {
      this.show = { mask: true, type: true, card: false, code: false, info: false }
    },
    handlerShowCard() {
      this.show = { mask: true, card: true, code: false, type: false, info: false }
    },
    handlerShowCode() {
      this.show = { mask: true, code: true, card: false, type: false, info: false }
    },
    goBack() {
      if (this.rechargeType === 1) {
        this.handlerShowCard()
      } else if (this.rechargeType === 2) {
        this.handlerShowType()
      }
    },
    ...mapActions({
      initConfig: 'oil/initConfig'
    })
  }
}
</script>

<style lang="scss" scoped>
.home{
  background: #fff;
}
</style>

