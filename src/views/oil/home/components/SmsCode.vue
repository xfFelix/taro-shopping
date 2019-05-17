<template>
  <transition name="slideUp" mode="out-in">
    <div class="code" v-if="show">
      <div class="header">
        <i class="cubeic-back" @click="$emit('handler-show-info')"></i>
        <span class="title">确认兑换</span>
      </div>
      <h1>短信验证码已发送至手机 {{userinfo.userName | formatPhone}} <button class="sms-code" :disabled="btnDisabled" @click="sendCode">{{time>0 ? time + 's': '重新获取'}}</button></h1>
      <Code @confirm="validateCode"></Code>
    </div>
  </transition>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {sendSmsCode} from 'api'
import Code from 'components/Code'
import { setInterval } from 'timers';
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    btnDisabled: false,
    time: 0
  }),
  components: {
    Code
  },
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo',
      token: 'getToken',
    })
  },
  watch: {
    show(val){
      if (val) {
        this.sendCode()
      } else {
        this.initConfig()
      }
    }
  },
  methods: {
    ...mapActions({
      initConfig: 'oil/initConfig'
    }),
    validateCode() {
      this.$emit('submit-order')
    },
    async sendCode(){
      let res = await sendSmsCode({token: this.token})
      if (res.error_code) return this.$toast(res.message)
      this.time = 120
      const timeout = setInterval(() => {
        if (this.time > 0) {
          this.time--
          this.btnDisabled = true
        } else {
          this.btnDisabled = false
          window.clearInterval(timeout)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.code{
  position: fixed;
  background: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 16px 15px 105px;
  box-sizing: border-box;
  z-index: 11;
  .header{
    position: relative;
    text-align: center;
    font-size: 15px;
    color: #4A4A4A;
    i{
      position: absolute;
      left: 0;
    }
  }
  h1{
    margin-top: 14px;
    padding: 20px 0;
    font-size: 12px;
    color: #C3C3C3;
    border-top: 1px solid rgba(222,222,222,0.9);
    .sms-code{
      background: transparent;
      color: #30CE84;
      font-size: 12px;
      border: none;
      margin-left: 15px;
    }
  }
  .input-code{
    border: 1px solid #DEDEDE;
  }
  .confirm{
    width: 100%;
    font-size: 18px;
    margin-top: 20px;
    background: #30CE84;
    color: #fff;
    border: none;
    border-radius: 25px; /*no*/
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
