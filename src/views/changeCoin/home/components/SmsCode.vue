<template>
  <transition name="slideUp" mode="out-in">
    <div class="code" v-if="show">
      <input type="text" style="position: absolute;top:-300px;background: transparent;" ref="inputNext">
      <div class="header">
        <i class="cubeic-back" @click="$emit('handler-show-info')"></i>
        <span class="title" v-if="userinfo.payValidType === 1">请输入支付密码</span>
        <span class="title" v-else>请输入短信验证码</span>
      </div>
      <h1 v-if="userinfo.payValidType === 1">请输入支付密码</h1>
      <h1 v-else>短信验证码已发送至手机 {{userinfo.userName | formatPhone}}
        <button class="sms-code" :disabled="btnDisabled" @click="sendCode">{{time>0 ? time + 's': '重新获取'}}</button>
      </h1>
      <div class="code-input-main">
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[0]}}</div>
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[1]}}</div>
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[2]}}</div>
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[3]}}</div>
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}" v-if="userinfo.payValidType === 1">{{code[4]}}</div>
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}" v-if="userinfo.payValidType === 1">{{code[5]}}</div>
        <input type="tel" class="code-input-input" v-model="code" @input="numberNo($event)" :maxlength="userinfo.payValidType === 1 ? 6: 4" v-focus ref="inputText">
      </div>
      <div class="reInput" v-if="tipError">{{codeMessage}}</div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { sendSmsCode } from 'api'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    codeError: {
      type: Boolean,
      default: false
    },
    codeMessage: {
      type:String,
      default:'验证码输入错误，请重新输入'
    }
  },
  data: () => ({
    btnDisabled: false,
    time: 0,
    code: '',
    tipError: false,
    timeout:null
  }),
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo',
      token: 'getToken',
    })
  },
  watch: {
    show(val) {
      if (val) {
        if (this.userinfo.payValidType !== 1) {
          this.sendCode()
        }
      }else{
        this.initData();
        this.$refs.inputText.blur();
        this.$refs.inputNext.focus();
      }
    },
    code(val) {
      if (this.userinfo.payValidType === 1) {
        if (val.length == 6) {
          this.$emit('code-info', val);
        }
      } else {
        if (val.length == 4) {
          this.$emit('code-info', val);
        }
      }
    },
    codeError(val) {
      if (val == true) {
        this.code = "";
        this.tipError = true;
        this.$emit('update:codeError', false)
      }
    }
  },
  methods: {
    initData(){
      this.btnDisabled=false;
      this.code = "";
      this.tipError =false;
    },
    numberNo(e) {
      this.code = e.target.value.replace(/[^\d]/g, '');
    },
    async sendCode() {
      clearInterval(this.timeout);
      let res = await sendSmsCode({ token: this.token })
      if (res.error_code) return this.$toast(res.message)
      this.time = 120
      this.timeout = setInterval(() => {
        if (this.time > 0) {
          this.time--
          this.btnDisabled = true
        } else {
          this.btnDisabled = false
          clearInterval(this.timeout);
        }
      }, 1000)
    }
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
  padding: 16px 15px 105px;
  box-sizing: border-box;
  z-index: 11;
  .header {
    position: relative;
    text-align: center;
    font-size: 15px;
    color: #4A4A4A;
    i {
      position: absolute;
      left: 0;
    }
  }
  h1 {
    margin-top: 14px;
    padding: 20px 0;
    font-size: 12px;
    color: #C3C3C3;
    border-top: 1px solid rgba(222, 222, 222, 0.9);
    .sms-code {
      background: transparent;
      color: #30CE84;
      font-size: 12px;
      border: none;
      margin-left: 15px;
    }
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
<style lang="scss" scoped>
@media screen and (min-width: 600px) {
  .code {
    max-width: 384px;
    /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}

.code-input-main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 44px; // margin-bottom: 105px;
  position: relative;
  .code-input-main-item {
    opacity: 0.8;
    border-bottom: 1px solid #000;
    width: 15%;
    text-align: center;
    font-size: 30px;
    color: #000;
    &.text-security {
      -webkit-text-security: disc;
      text-security: disc;
    }
  }
  .code-input-input {
    position: absolute;
    outline: none;
    color: transparent;
    background: transparent;
    width: 91%;
    height: 44px;
    letter-spacing: 90px;
    padding: 0 0 80px 0;
    caret-color: transparent;
  }
}

.reInput {
  margin: 24px 0 0 15px;
  font-size: 12px;
  color: #f74340;
  position: absolute;
}
</style>
