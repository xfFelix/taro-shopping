<template>
  <transition name="slideUp" mode="out-in">
    <div class="code" v-if="show">
      <div class="header">
        <i class="cubeic-back" @click="$emit('go-back-info')"></i>
        <span class="title">{{userinfo.payValidType === 1 ? '请输入支付密码': '确认申请表'}}</span>
      </div>
      <h1 v-if="userinfo.payValidType !== 1">短信验证码已发送至手机 {{userinfo.userName | formatPhone}}</h1>
      <div class="input-code">
        <cube-input v-model.trim="code" type="tel" :placeholder="userinfo.payValidType === 1? '请输入支付密码': '请输入短信验证码'" :maxlength="userinfo.payValidType === 1 ? 6 : 4"></cube-input>
      </div>
      <button class="confirm" @click="validateCode">确认</button>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { sendSmsCode,buyBackCommitOrder } from 'api'
import {toDecimal2} from 'util/filter'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    recoveryListC:{
       type: Object,
    }
  },
  data: () => ({
    code: ''
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      userinfo: 'getUserinfo',
    }),
  },
  watch: {
    show: {
      handler (val) {
        if (val) {
          if (this.userinfo.payValidType !== 1) {
            this.sendCode()
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    validateCode() {
      if (!this.code) return this.$toast('请输入验证码');
      this.buyBackCommitOrder();
    },
    async sendCode() {
      let res = await sendSmsCode({ token: this.getToken })
      if (res.error_code) {
        this.$emit('go-back-init');
        return this.$toast(res.message);
      }
    },
    async buyBackCommitOrder() {
      let res = await buyBackCommitOrder({
        token: this.getToken,
        code: this.code,
        cardNum: this.recoveryListC.idBackUrl,
        cardPwd: this.recoveryListC.cardMemo,
        userBankNo: this.recoveryListC.bankNum,
        userBankName: this.recoveryListC.openBank[0],
        userIdCard: this.recoveryListC.idNum,
        name: this.recoveryListC.payeeName,
        faceValue: this.recoveryListC.faceValue,
        salePrice: toDecimal2(this.recoveryListC.disPrice),
        orderNo: this.recoveryListC.orderId
      })
      if (res.code != 1) {
        this.$emit('go-back-init');
        return this.$toast(res.message)
      } else {
        this.$emit('handler-show-success')
        // this.$router.push({
        //   path: '/oil/oilRecoveryS', query: {
        //     idBackUrl: this.recoveryListC.idBackUrl,
        //     memo: this.recoveryListC.cardMemo,
        //     cardUser: this.recoveryListC.cardUser,
        //     name: this.recoveryListC.payeeName,
        //     bankNum: this.recoveryListC.bankNum,
        //     openBank: this.recoveryListC.openBank[0],
        //     disPrice:this.recoveryListC.disPrice
        //   }
        // })
      }

    }

  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.code {
  position: fixed;
  background: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 21px 18px;
  box-sizing: border-box;
  z-index: 101;
  .header {
    position: relative;
    text-align: center;
    font-size: 18px;
    color: #111010;
    i {
      position: absolute;
      left: 0;
    }
  }
  h1 {
    margin-top: 21px;
    padding: 16px 0 0;
    font-size: 13px;
    color: #C3C3C3;
    border-top: 1px solid rgba(222, 222, 222, 0.9);
  }
  .input-code {
    border: 1px solid #DEDEDE;
    margin-top: 21px;
  }
  .confirm {
    width: 100%;
    font-size: 18px;
    margin-top: 20px;
    background: #30CE84;
    color: #fff;
    border: none;
    border-radius: 25px;
    /*no*/
    padding: 11px 0;
  }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .code{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
