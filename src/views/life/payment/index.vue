<template>
  <div class="payment">
    <Header class="navbar" :show-more="true">缴费账户</Header>
    <div class="type-wrapper">
      <div class="type">
        <img :src="require(`../../../common/images/${findIconByType(config.type)}.png`)" alt="">
        {{findNameByType(config.type)}}
      </div>
      <div class="score">
        椰子分余额:&nbsp;<span class="price-color">{{userinfo.score}}</span>
      </div>
    </div>
    <div class="content-wrapper">
      <ul class="info">
        <li>
          缴费单元<span class="value">{{config.unit}}</span>
        </li>
        <li>
          用户编号<span class="value">{{config.number}}</span>
        </li>
        <li v-if="showProgress">
          欠费
          <div class="process" v-if="!showArrears"><span class="square"></span></div>
          <span class="value" v-else>{{arrears || '0.00'}}</span>
        </li>
        <li v-if="showArrears">
          余额
          <span class="value">{{balance || '0.00'}}</span>
        </li>
      </ul>
      <div class="input-wrapper">
        <span class="point">充值金额:</span>
        <input
          type="number"
          placeholder="金额限制5~9999"
          v-model="price"
          @input="isNull"
          @focus="iptFocus"
          @blur="iptBlur"
          pattern="[0-9]*">
      </div>
      <ul class="info">
        <li>
          售价：<span class="value">{{salePrice.toFixed(2)}}</span>
        </li>
        <li>
          税费：<span class="value">{{amount.tax.toFixed(2)}}</span>
        </li>
        <li>
          应付合计：<span class="value">{{amount.total.toFixed(2)}}</span>
        </li>
      </ul>
      <button class="payment" @click="validate">立即充值</button>
    </div>
    <verify-code @confirm="payment" :showCode.sync="showCode" :amount="amount" :sale="salePrice" :price="price"></verify-code>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <!-- 设置手机号 -->
    <set-mobile :show.sync="showSetMobile"></set-mobile>
    <!-- fail -->
    <payment-fail :message="failMessage" :show-fail.sync="showFail"></payment-fail>
  </div>
</template>

<script>
import Header from 'components/Header'
import { mapGetters, mapActions } from 'vuex';
import { getPriceByLife, paymentByLife, getArrearsByLife } from 'api'
import { setPayType } from '@/mixins'
import mixin from '../mixin'
import { IOSFocus } from '@/mixins'
export default {
  mixins: [mixin, setPayType, IOSFocus],
  components: {
    Header,
    VerifyCode: () => import(/* webpackPrefetch: true */ './components/VerifyCode'),
    PaymentFail: () => import(/* webpackPrefetch: true */ './components/PaymentFail')
  },
  data: () =>({
    price: '',
    showCode: false,
    amount: {
      sale: 0,
      tax: 0,
      service: 0,
      total: 0
    },
    showProgress: true,
    showFail: false,
    failMessage: '',
    intervalout: 30,
    arrears: '',
    showArrears: false,
    balance: '',
  }),
  created() {
    this.getArrears()
  },
  computed: {
    ...mapGetters({
      config: 'life/getConfig',
      token: 'getToken',
      userinfo: 'getUserinfo'
    }),
    salePrice() {
      return this.amount.sale + this.amount.service
    }
  },
  methods: {
    ...mapActions({
      checkPassword: 'checkPassword'
    }),
    getArrears() {
      this.interval = window.setInterval(async () => {
        const { error_code, data, message, status } = await getArrearsByLife({token: this.token, productNo: this.config.unitId, pn: this.config.number, oid: (new Date()).getTime()})
        if (+status === 404) {
            window.clearInterval(this.interval)
            this.showProgress = false
        }
        if (+error_code === 3) {
          this.intervalout--
          if (this.intervalout <= 0) {
            window.clearInterval(this.interval)
            this.showProgress = false
          }
        } else {
          if (+error_code) {
            this.showProgress = false
          }
          window.clearInterval(this.interval)
          if (data) {
            this.arrears = data.totalamount
            this.balance = data.wecbalance
            this.showArrears = true
          }
        }
      }, 1000)
    },
    isNull() {
      if (!this.price) {
        this.amount = {
          sale: 0,
          tax: 0,
          service: 0,
          total: 0
        }
      } else {
        this.getTotal()
      }
    },
    getTotal() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async() => {
        const {error_code, data} = await getPriceByLife({token: this.token, amount: this.price})
        if (error_code) return
        this.amount = Object.assign(this.amount, {
          sale: data.sale,
          tax: data.tax_total,
          service: data.service_fee,
          total: data.total
        })
      }, 1000)
    },
    async validate() {
      if (!this.price) return this.$toast('请输入缴费金额')
      if (+this.price < 5 || +this.price > 9999) {
        return this.$toast('金额限制5~9999')
      }
      if (this.arrears && +this.arrears > +this.price) {
        return this.$toast('充值金额要大于欠费金额')
      }
      let res = await this.checkPassword()
      if (!res) return
      this.showCode = true
    },
    async payment(code) {
      if (!code) return this.$toast(+this.userinfo.payValidType === 1 ? '请输入支付密码': '请输入验证码')
      const toast = this.$createToast({message: 'loading', mask:true})
      toast.show()
      const { group, type, unitId, number} = this.config
      let params = {
        token: this.token,
        productNo: unitId,
        pr: this.price,
        pn: number,
        grp: group,
        bt: type,
        verify_code: code
      }
      const { error_code, data, message } = await paymentByLife(params)
      toast.hide()
      if (!error_code) {
        this.showCode = false
        this.$router.push({path: 'changeS', query: { price: this.amount.total }})
      }
    }
  }
}
</script>

<style scoped lang="scss">
.payment{
  height: 100%;
  .navbar{
    background: #000;
    color: #fff;
  }
  .type-wrapper{
    height: 65px;
    line-height: 65px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    .type{
      font-size: 15px;
      color: #4A4A4A;
      font-weight: bold;
      display: flex;
      align-items: center;
      img{
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }
    }
    .score{
      font-size: 12px;
      color: #4A4A4A;
    }
  }
  .content-wrapper {
    margin-top: 10px;
    background: #fff;
    padding-bottom: 40px;
    .info{
      padding: 24px 0;
      margin: 0 15px;
      border-bottom: 1px solid #dedede;
      li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;
        color: #4A4A4A;
        font-size: 14px;
        font-weight: bold;
        &:first-of-type{
          margin-top: 0;
        }
        .process{
          flex: 1;
          height: 12px;
          border: 0.5px solid #ccc;
          margin-left: 100px;
          border-radius: 15px; /* no */
          overflow: hidden;  /*注意这里*/
          box-shadow: 0 0 5px 0px #ddd inset;
          .square{
            display: inline-block;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #2989d8 30%,#7db9e8 31%,#7db9e8 58%,#2989d8 59%);
            background-size: 60px 30px;
            border-radius: 15px; /* no */
            text-align: center;
            color:#fff;
            animation:load 30s ease-in;
          }
          @keyframes load{
            0%{
                width: 0%;
            }
            100%{
                width: 100%;
            }
          }
        }
        .value{
          font-weight: 400;
        }
      }
    }
    .input-wrapper{
      margin: 20px 18px 0;
      box-sizing: border-box;
      border: 1px solid #dedede;
      border-radius: 5px;
      height: 44px;
      line-height: 44px;
      display: flex;
      .point{
        flex: 0 0 80px;
        text-align: center;
        font-size: 15px;
        color: #999999;
      }
      input {
        color: #000;
        font-size: 15px;
        height: 100%;
        flex: 1;
      }
    }
    .payment{
      width: 345px;
      height: 44px;
      background: #30CE84;
      color: #fff;
      margin: 45px auto 0;
      font-size: 15px;
      border: none;
      border-radius: 5px;
      display: block;
    }
  }
}
</style>
