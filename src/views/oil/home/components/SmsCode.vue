<template>
  <transition name="slideUp" mode="out-in">
    <div class="code" v-if="show">
      <div class="header">
        <i class="cubeic-back" @click="$emit('handler-show-info')"></i>
        <span class="title">确认兑换</span>
      </div>
      <h1>短信验证码已发送至手机 {{userinfo.userName | formatPhone}}</h1>
      <div class="input-code">
        <cube-input v-model="code" type="number" placeholder="请输入短信验证码"></cube-input>
      </div>
      <button class="confirm" @click="validateCode">确认</button>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {sendSmsCode} from 'api'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo',
      token: 'getToken',
    }),
    code: {
      get() {
        return this.$store.state.oil.config.code
      },
      set(val) {
        this.$store.dispatch('oil/setConfig', {code: val})
      }
    }
  },
  watch: {
    show(val){
      if (val) {
        this.sendCode()
      }
    }
  },
  methods: {
    validateCode() {
      if (!this.code) return this.$toast('请输入验证码')
      this.$emit('submit-order')
    },
    async sendCode(){
      let res = await sendSmsCode({token: this.token})
      if (res.error_code) return this.$toast(res.message)
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
  padding: 21px 18px;
  box-sizing: border-box;
  z-index: 11;
  .header{
    position: relative;
    text-align: center;
    font-size: 18px;
    color: #111010;
    i{
      position: absolute;
      left: 0;
    }
  }
  h1{
    margin-top: 21px;
    padding: 16px 0;
    font-size: 13px;
    color: #C3C3C3;
    border-top: 1px solid rgba(222,222,222,0.9);
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
