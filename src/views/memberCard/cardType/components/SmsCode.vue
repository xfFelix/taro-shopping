<template>
  <transition name="slideUp" mode="out-in">
    <div class="code" v-if="show">
      <div class="header">
        <span class="title">{{userinfo.payValidType === 1 ? '请输入支付密码': '请输入短信验证码'}}</span>
        <i @click="$emit('go-back')">取消</i>
      </div>
      <h1 v-if="userinfo.payValidType === 1">请输入支付密码</h1>
      <h1 v-else>
        短信验证码已发送至手机 {{userinfo.userName | formatPhone}}
        <span v-if="!getSmgFlag">{{countDown}}s</span>
        <span class="reGetSms" @click="reGetSms()" v-if="getSmgFlag">重新获取</span>
      </h1>

      <div class="code-input-main">
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[0]}}</div>
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[1]}}</div>
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[2]}}</div>
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[3]}}</div>
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}" v-if="userinfo.payValidType === 1">{{code[4]}}</div>
        <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}" v-if="userinfo.payValidType === 1">{{code[5]}}</div>
        <input type="tel" class="code-input-input" v-model="code" @input="numberNo($event)" :maxlength="userinfo.payValidType === 1 ? 6: 4" v-focus>
      </div>
      <div class="reInput" v-if="tipError">{{failText}}</div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { IOSFocus } from "@/mixins";
export default {
  mixins: [IOSFocus],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    codeError: {
      type: Boolean,
      default: false
    },
    failText: ''
  },
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo',
    }),
  },
  data() {
    return {
      code: '',
      countDown: 120,
      timer: null,
      getSmgFlag: false,
      tipError:false
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.timeDown();
      } else {
        this.initData();
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
    numberNo(e) {
      this.code = e.target.value.replace(/[^\d]/g, '');
    },
    initData() {
      this.countDown = 120;
      this.getSmgFlag = false;
      this.code = "";
      this.tipError = false;
      clearInterval(this.timer);
    },
    reGetSms() {
      this.$emit("send-sms");
      this.timeDown();
    },
    timeDown() {
      this.initData();
      this.timer = setInterval(() => {
        this.countDown--;
        if (this.countDown == 0) {
          this.getSmgFlag = true;
          clearInterval(this.timer);
        }
      }, 1000)
    }
  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
.code {
  position: fixed;
  background: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0 18px 105px 18px;
  box-sizing: border-box;
  z-index: 11;

  .header {
    line-height: 44px;
    text-align: center;
    font-size: 15px;
    color: #4A4A4A;
    position: relative;
    i {
      position: absolute;
      right: 0;
      color: #999999;
      font-size: 12px;
    }
  }
  h1 {
    padding: 16px 0;
    font-size: 13px;
    color: #C3C3C3;
    border-top: 1px solid rgba(222, 222, 222, 0.9);
    span {
      color: #4A4A4A;
    }
    .reGetSms {
      color: #30CE84;
    }
  }

  .confirm {
    width: 100%;
    font-size: 18px;
    margin-top: 20px;
    background: #30CE84;
    color: #fff;
    border: none;
    border-radius: 25px;
    padding: 11px 0;
  }
  .reInput {
    margin: 24px 0 0 15px;
    font-size: 12px;
    color: #ea5a5a;
    position: absolute;
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
    &.text-security{
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
</style>
<style scoped>
@media screen and (min-width: 600px) {
  .code {
    max-width: 384px;
    /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>


