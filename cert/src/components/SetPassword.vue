<template>
  <transition mode="out-in" name="fade">
    <div class="set-password-wrapper" v-if="show">
      <div class="password-wrapper">
        <header>
          <i class="cubeic-close" @click="$emit('update:show', false)"></i>
          设置支付密码
        </header>
        <h3>{{ !num ? '设置支付密码': '确认支付密码'}}</h3>
        <six-password class="input-wrapper" v-model="code"></six-password>
      </div>
    </div>
  </transition>
</template>

<script>
import SixPassword from './SixPassword'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    SixPassword
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    num: 0,
    code: '',
    password: '',
    newPassword: '',
  }),
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo',
      token: 'getToken'
    })
  },
  watch: {
    code (val) {
      if (val.length === 6) {
        this.num++
        if (this.num === 1) {
          this.password = this.code
          this.code = ''
        } else {
          this.newPassword = this.code
          this.changePwd()
        }
      }
    }
  },
  methods: {
    ...mapActions({
      setUserInfo: 'setUserinfo',
      setShowSetPassword: 'setShowSetPassword'
    }),
    async changePwd() {
      let validate = this.password.length === 6 && this.newPassword === this.password
      if (!validate) return this.Toast('密码错误')
      const { checkPayPwd } = await import('api')
      let config = {
        token: this.token,
        new_passwd: this.newPassword
      }
      const {error_code, data, message} = await checkPayPwd(config)
      if (error_code) {
        this.initData()
        return this.$toast(message)
      }
      this.$toast(message)
      this.setUserInfo(data)
      this.setShowSetPassword(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.set-password-wrapper{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0,0,0,.4);
  .password-wrapper{
    position: absolute;
    z-index: 10;
    background: #f8f8f8;
    width: 88%;
    left: 50%;
    margin-left: -44%;
    top: 20%;
    header{
      font-size: 16px;
      border-bottom: 1px solid #c9daca;
      padding: 15px 10px;
      display: flex;
      align-items: center;
      .cubeic-close{
        font-size: 18px;
        margin-right: 10px;
        color:#b2b2b2;
      }
    }
    h3{
      font-size: 14px;
      text-align: center;
      margin-top: 20px;
    }
    .input-wrapper{
      margin: 30px auto 12px;
      width: 88%;
      height: 40px;
    }
  }
}
</style>
