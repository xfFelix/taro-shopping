<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="mobile-wrapper" v-if="show" @click="$emit('update:show', false)">
      <div class="wrapper" @click.stop="$emit('update:show', true)">
        <h1>绑定手机号码</h1>
        <div class="item">
          <span class="iconfont">&#xe615;</span>
          <select style="border:none;background:#fff;width: 50px;" v-model="telPlace">
              <option :value="item.telRealVal" v-for="item in telList" :key="item.telRealVal">{{item.telShowVal}}</option>
          </select>
          <input type="tel" placeholder="请输入手机号" v-model.trim="data.mobile" pattern="[0-9]*" autofocus="autofocus" autocomplete="off">
        </div>
        <div class="item border-1-px">
          <span class="iconfont">&#xe62a;</span>
          <input type="tel" placeholder="请输入验证码" v-model.trim="data.code" pattern="[0-9]*" autocomplete="off">
          <button class="send-code" @click.stop="sendCode" :disabled="data.codeFlag">{{data.codeText}}</button>
        </div>
        <div class="item">
          <button class="link-mobile" @click.stop="validateMobile">绑定</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { IsMobile, IsChinaMobile, IsHKMobile } from "util/common";
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    telList: [
      {
        telRealVal: 86,
        telShowVal: '+86　中国',
      },
      {
        telRealVal: 852,
        telShowVal: '+852 香港',
      }
    ],
    telPlace: 86,
    data: {
      mobile: '',
      code: '',
      codeText: '发送验证码',
      codeFlag: false
    },
  }),
  computed: {
    ...mapGetters({
      token: 'getToken'
    })
  },
  methods: {
    ...mapActions({
      setUserInfo: 'setUserinfo'
    }),
    async sendCode() {
      if (!IsMobile(this.data.mobile)) return this.$toast('请输入正确的手机号')
      if (this.telPlace == '86' && !IsChinaMobile(this.data.mobile)) return this.$toast('请输入国内手机号')
      if (this.telPlace == '852' && !IsHKMobile(this.data.mobile)) return this.$toast('请输入香港手机号')
      const { sendSmsCode } = await import(/* webpackPrefetch: true */ 'api')
      let data = await sendSmsCode({ mobile: this.data.mobile })
      if (data.error_code) {
        return this.$toast(data.message)
      }
      this.data.codeText = "120s 重新获取"
      let _this = this;
      let timeInit = 120;
      let countDown = window.setInterval(function() {
        let i = 1;
        timeInit = timeInit - i;
        if (timeInit > 0) {
          _this.data.codeText = timeInit + 's 重新获取';
          _this.data.codeFlag = true
        } else {
          _this.data.codeText = "重新获取"
          _this.data.codeFlag = false;
          window.clearInterval(countDown)
        }
      }, 1000)
    },
    validateMobile() {
      if (!IsMobile(this.data.mobile)) return this.$toast('请输入正确的手机号')
      if (this.telPlace == '86' && !IsChinaMobile(this.data.mobile)) return this.$toast('请输入国内手机号')
      if (this.telPlace == '852' && !IsHKMobile(this.data.mobile)) return this.$toast('请输入香港手机号')
      if (!this.data.code) return this.$toast('请输入验证码')
      this.setMobile()
    },
    async setMobile() {
      const {setMobile, getInfo} = await import(/* webpackPrefetch: true */ 'api')
      let data = await setMobile({ token: this.token, mobile: this.data.mobile, code: this.data.code })
      if (data.error_code) {
          return this.$toast(data.message)
      }
      this.data.show = false
      this.$toast(data.message)
      this.$emit('update:show', false)
      let info = await getInfo({token: this. token})
      if (!info.error_code) return this.setUserInfo(info.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-wrapper{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 12;
  .wrapper{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%);
    background: #fff;
    padding: 10px 0;
    box-sizing: border-box;
    width: 70%;
    border-radius: 15px;
    h1{
      font-size: 14px;
      text-align: center;
      margin-top: 10px;
    }
    .item{
      padding: 10px 20px;
      position: relative;
      display: flex;
      align-items: center;
      &.border-1-px{
        &::after{
          display: block;
          content: '';
          height: 1px;
          width: 100%;
          background-color: #ccc;
          position: absolute;
          bottom: 0;
          left: 0;
          transform: scaleY(0.5);
        }
      }
      span{
        display: block;
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
        font-size: 20px;
        &.iconfont{
          text-align: center;
          line-height: 30px;
          color: #30CE84;
        }
      }
      input{
        padding: 10px 0;
        margin-left: 10px;
        width: 100%;
        font-size: 13px;
        &.text-security{
          text-security: disc;
          -webkit-text-security: disc;
        }
      }
      .send-code{
        position: absolute;
        right: 10px;
        margin: 0;
        background-color: transparent;
        border: 1px solid #27bd5a;
        padding: 1px 10px;
        color: #27bd5a;
        border-radius: 25px;
      }
      .link-mobile{
        background: #27bd5a;
        border: none;
        color: #fff;
        font-size: 16px;
        letter-spacing: 0.4em;
        margin: 0 auto;
        padding: 10px 50px;
        border-radius: 25px;
      }
    }
  }
}
</style>
