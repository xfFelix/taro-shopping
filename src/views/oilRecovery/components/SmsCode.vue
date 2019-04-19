<template>
  <transition name="slideUp" mode="out-in">
    <div class="code" v-if="show">
      <div class="header">
        <i class="cubeic-back" @click="$emit('go-back-info')"></i>
        <span class="title">确认申请表</span>
      </div>
      <!-- <h1>短信验证码已发送至手机</h1> -->
       <h1>短信验证码已发送至手机 {{userinfo.userName | formatPhone}}</h1> 
      <div class="input-code">
        <cube-input v-model="code" type="number" placeholder="请输入短信验证码"></cube-input>
      </div>
      <button class="confirm" @click="validateCode">确认</button>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { sendSmsCode,buyBackCommitOrder } from 'api'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
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
    show(val) {
      if (val) {
        this.sendCode()
      }
    },
    recoveryListC(val) {
      console.log(val)
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
        cardNum: this.recoveryListC.cardNum,
        cardPwd: this.recoveryListC.cardMemo,
        userBankNo: this.recoveryListC.bankNum,
        userBankName: this.recoveryListC.openBank[0],
        userIdCard: this.recoveryListC.idNum,
        name: this.recoveryListC.payeeName,
        faceValue: this.recoveryListC.faceValue,
        salePrice: this.recoveryListC.disPrice,
        orderNo: this.recoveryListC.orderId
      })
      if (data.code != 1) {
        return this.$toast(res.message)
      } else {
        this.$router.push({
          path: 'oil/oilRecoveryS', query: {
            cardNum: this.recoveryListC.cardNum,
            memo: this.recoveryListC.memom,
            cardUser: this.recoveryListC.cardUser,
            name: this.recoveryListC.payeeName,
            bankNum: this.recoveryListC.bankNum,
            openBank: this.recoveryListC.openBank[0]
          }
        })
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
    padding: 16px 0;
    font-size: 13px;
    color: #C3C3C3;
    border-top: 1px solid rgba(222, 222, 222, 0.9);
  }
  .input-code {
    border: 1px solid #DEDEDE;
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
