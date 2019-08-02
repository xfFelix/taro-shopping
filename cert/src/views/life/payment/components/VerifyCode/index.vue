<template>
  <transition name="fade" mode="out-in">
    <div class="mask" v-if="showCode" @click="$emit('update:showCode', false)">
      <div class="wrapper" @click.stop="$emit('update:showCode', true)">
        <h2>确认兑换</h2>
        <h1>{{amount.total.toFixed(2)}}</h1>
        <div class="item"><span class="label">产品名称</span><i>:</i>{{price}}元{{findNameByType(config.type)}}充值</div>
        <div class="item"><span class="label">售价</span><i>:</i>{{sale.toFixed(2)}}</div>
        <div class="item"><span class="label">税费</span><i>:</i>{{amount.tax.toFixed(2)}}</div>
        <div class="item"><span class="label">应付合计</span><i>:</i>{{amount.total.toFixed(2)}}</div>
        <div class="item">
          <span class="label">{{+userinfo.payValidType === 1 ? '密码': '验证码'}}</span>
          <i>:</i>
          <input
            :type="+userinfo.payValidType === 1 ? 'password': 'tel'"
            :placeholder="+userinfo.payValidType === 1 ? '**支付密码**': '**短信验证码**'"
            class="verify-code"
            v-model="code"
            :maxlength="+userinfo.payValidType === 1 ? 6 : 4"
            pattern="[0-9]*">
          <button v-if="+userinfo.payValidType !== 1" class="btn-code" @click="getCode" :disabled="btnCodeDisabled">{{time > 0 ? `${time}s` : '发送验证码'}}</button>
        </div>
        <button class="btn-confirm" @click="$emit('confirm', code)">确认兑换</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import mixin from '../../../mixin'
export default {
  mixins: [mixin],
  data:() => ({
    btnCodeDisabled: false,
    time: 0,
    code: ''
  }),
  computed: {
    ...mapGetters({
      config: 'life/getConfig',
      token: 'getToken',
      userinfo: 'getUserinfo'
    })
  },
  props: {
    amount: Object,
    showCode: false,
    sale: 0,
    price: 0
  },
  methods: {
    async getCode() {
      this.btnCodeDisabled = true
      this.time = 60
      const { sendSmsCode } = await import(/* webpackPrefetch: true */ 'api')
      const { error_code, data } = await sendSmsCode({token: this.token})
      if (error_code) return
      this.interval = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          this.btnCodeDisabled = false
          clearInterval(this.interval)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.4);
  .wrapper{
    background: #fff;
    width: 300px;
    height: 400px;
    margin: 120px auto 0;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0 15px;
    h2{
      padding: 15px 0 10px;
      text-align: center;
      font-size: 14px;
      border-bottom: 1px solid #dedede;
    }
    h1{
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      margin: 15px 0 5px;
    }
    .item{
      height: 46px;
      line-height: 46px;
      font-size: 14px;
      padding: 0 15px;
      box-sizing: border-box;
      border-bottom: 1px solid #dedede;
      display: flex;
      align-items: center;
      position: relative;
      &:last-of-type{
        border: none;
      }
      .label{
        width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        text-align: justify;
        height: 100%;
        &::after{
          width: 100%;
          display: inline-block;
          content: '';
        }
      }
      i{
        margin-right: 10px;
      }
      .btn-code{
        position: absolute;
        right: 0;
        border: none;
        background: #30ce84;
        color: #fff;
        white-space: nowrap;
        width: 80px;
        padding: 5px 5px;
        font-size: 12px;
      }
    }
    .btn-confirm{
      background: #30ce84;
      color: #fff;
      border: none;
      border-radius: 25px; /* no */
      width: 100%;
      padding: 10px 15px;
      margin-top: 15px;
    }
  }
}
</style>
