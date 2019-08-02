<template>
    <div class="phonePay-bg" id="phonePay-sms" v-if="showSendCode">
        <p class="phonePay-title">
            <span class="iconfont phoneChe-backW " @click="$emit('update:showSendCode', false)">&#xe61e;</span>
            <span class="phonePay-tName">确认兑换</span>
        </p>
        <p class="phonePay-telW hide" v-if="userinfo.payValidType !== 1">短信验证码已发送至手机
            <span class="phonePay-tel">{{userName|formatPhone}}</span>
        </p>
        <p class="phonePay-inpW">
            <input class="phonePay-msg" type="tel" autofocus="autofocus" :maxlength="userinfo.payValidType === 1?6:4" :placeholder="userinfo.payValidType === 1? '请输入支付密码': '请输入短信验证码'" v-model="smsCode" />
            <span v-if="userinfo.payValidType !== 1" class="sendPhoneSms" :style="validateFlag==1?'background: #30ce84':'background: #999999'" @click="sendPhoneSms()">{{validate}}</span>
        </p>
        <p class="fail-text">{{failText}}</p>
        <button class="phonePay-confirm phonePay-conA" :class="smsCode?'light': ''" :disabled="btnDisabled" @click="sumitOrder">确认提交</button>
    </div>
</template>

<script>
import {sendSmsCode} from 'api'
import {mapGetters} from 'vuex';
export default {
    name: 'SmsConfirm',
    data: () => ({
        smsCode: undefined,
        validate: "获取验证码",
        validateFlag: 1,
        userName: undefined,
        btnDisabled: false
    }),
    props:{
      showSendCode: {
        type: Boolean,
        default: false
      },
      failText: ''
    },
    watch: {
      btnDisabled(val) {
        if (val) {
          setTimeout(() => {
            this.btnDisabled = false
          }, 3000);
        }
      }
    },
    computed: {
      ...mapGetters({
        getToken: 'getToken',
        userinfo: 'getUserinfo'
      })
    },
    methods: {
        async sendPhoneSms() {
            if (this.validateFlag == 1) {
                let data = await sendSmsCode({token: this.getToken})
                if (data.error_code) {
                    return this.$toast(data.message)
                }
                this.validateFlag = 0
                this.validate = "120s 重新获取"
                let _this = this;
                let timeInit = 120;
                let countDown = setInterval(function() {
                    let i = 1;
                    timeInit = timeInit - i;
                    if (timeInit > 0) {
                        _this.validate = timeInit + 's 重新获取';
                        _this.validateFlag = 0
                    } else {
                        _this.validate = "重新获取"
                        _this.validateFlag = 1;
                        clearInterval(countDown)
                    }
                }, 1000)
            }
        },
        sumitOrder() {
          this.btnDisabled = true
          if (this.userinfo.payValidType === 1) {
            if (this.smsCode.length === 6) {
              this.$emit('commit-order', this.smsCode)
            } else {
              this.$toast('请输入6位数字密码')
            }
          } else {
            if (this.smsCode.length === 4) {
              this.$emit('commit-order', this.smsCode)
            } else {
              this.$toast('请输入4位数字验证码')
            }
          }
        }
    }
}


 //定时

</script>

<style lang="scss" scoped>
.phonePay-bg {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    margin: 0 auto;
    right: 0;
    z-index: 101;
    background: #F3F4F6;
    input {
        width: 65%;
        height: 100%;
        line-height: 23px;
        padding-left: 11px;
        font-size: 14px;
        color: #333;
    }
    .sendPhoneSms {
        width: 30%;
        display: flex;
        align-items: center;
        color: #fff;
        justify-content: center;
        font-size: 14px;
    }
    .phonePay-title {
        background: #fff;
        text-align: center;
        height: 45px;
        line-height: 45px;
        color: #333333;
        font-size: 15px;
        position: relative;
        .phoneChe-backW {
            position: absolute;
            left: 10px;
            top: 0;
        }
    }
    .phonePay-inpW {
        height: 44px;
        max-width: 339px;
        display: flex;
        justify-content: space-between;
        margin: 16px auto;
        position: relative;
        background: #fff;
    }

    .phonePay-telW {
        max-width: 339px;
        margin: 23px auto 0 auto;
        color: #333;
        font-size: 13px;
    }

    .phonePay-confirm {
        margin: 0 auto;
        line-height: 45px;
        height: 45px;
        text-align: center;
        color: #ffffff;
        font-size: 15px;
        box-shadow: 0px 0px 10px 0px rgba(135, 248, 199, 0.4);
        border-radius: 50px;
        background: #91efb1;
        width: 90%;
        margin-bottom: 1rem;
        display: block;
        border: none;
    }
    .light {
        background-color: #27bd5a;
    }
    .fail-text{
      color: red;
      padding: 0 18px 18px;
    }
}
</style>
<style>
@media screen and (min-width: 600px){
  .phonePay-bg{
    margin: 0 !important;
    max-width: 384px;
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
