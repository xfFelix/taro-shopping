<template>
  <transition name="slideUp" mode="out-in">
    <div class="code" v-if="show">
      <div class="header">
        <span class="title">请输入短信验证码</span>
        <i @click="$emit('go-back')">取消</i>
      </div>
      <h1>
        短信验证码已发送至手机 {{userinfo.userName | formatPhone}}
        <span>{{countDown}}s</span>
      </h1>

      <div class="code-input-main">
        <div class="code-input-main-item">{{code[0]}}</div>
        <div class="code-input-main-item">{{code[1]}}</div>
        <div class="code-input-main-item">{{code[2]}}</div>
        <div class="code-input-main-item">{{code[3]}}</div>
        <input class="code-input-input" v-model="code" maxlength="4" type="number" v-focus/>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
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
  }),
  },
data() {
  return {
    code: '',
    countDown: 120,
    timer: null
  }
},
watch: {
  show(val) {
    if (val) {
      this.timer = setInterval(() => {
        this.countDown--
        if (this.countDown == 0) {
          clearInterval(this.timer);
          this.$emit('go-back');
          this.$toast("订单提交失败")
        }
      }, 1000)
    } else {
      this.countDown = 120;
      this.code = ''
      clearInterval(this.timer);
    }
  },
  code(val) {
    if (val.length == 4) {
      this.$emit('code-info', val)
    }
  }
},
methods: {

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
  padding: 0 18px;
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
}




.code-input-main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 44px;
  margin-bottom: 105px;
  position: relative;
  .code-input-main-item {
    opacity: 0.8;
    border-bottom: 1px solid #000;
    width: 15%;
    text-align: center;
    font-size: 30px;
    color: #000;
  }
  .code-input-input {
    position: absolute;
    outline: none;
    color: transparent;
    background: transparent;
    width: 100%;
    height: 100%;
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


