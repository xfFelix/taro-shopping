<template>
    <div class="phonePay-bg" id="phonePay-sms" v-if="showSendCode">
        <p class="phonePay-title">
            <span class="iconfont phoneChe-backW " @click="$emit('update:showSendCode', false)">&#xe61e;</span>
            <span class="phonePay-tName">确认兑换</span>
        </p>
        <p class="phonePay-telW hide" v-show="isSmsCode">短信验证码已发送至手机
            <span class="phonePay-tel">{{userName|formatPhone}}</span>
        </p>
        <p class="phonePay-inpW">
            <input class="phonePay-msg" type="number" placeholder="请输入短信验证码" v-model="smsCode" />
            <span class="sendPhoneSms" :style="validateFlag==1?'background: #30ce84':'background: #999999'" @click="sendPhoneSms()">{{validate}}</span>
        </p>
        <p class="phonePay-confirm phonePay-conA" :class="smsCode?'light': ''" @click="sumitOrder">确认提交</p>
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
        isSmsCode: true,
        userName: undefined
    }),
    props:{
      showSendCode: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters({
        getToken: 'getToken'
      })
    },
    methods: {
        async sendPhoneSms() {
            if (this.validateFlag == 1) {
                let data = await sendSmsCode({token: this.getToken})
                if (data.error_code) {
                    return this.Toast(data.message)
                }
                this.isSmsCode = true
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
          this.$emit('commit-order', this.smsCode)
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
    }
    .light {
        background-color: #27bd5a;
    }
}
</style>
