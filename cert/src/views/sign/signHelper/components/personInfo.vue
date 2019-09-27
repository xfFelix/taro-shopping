<template>
  <div>
    <ul class="identity-info-wrap">
      <li>
        <span>真实姓名</span>
        <input type="text" placeholder="请填写真实姓名" v-model.trim="data.name" />
      </li>
      <li>
        <span>证件号码</span>
        <input type="text" placeholder="请填写身份证号码" v-model.trim="data.idNum" />
      </li>
      <li>
        <span>银行卡号</span>
        <input type="text" placeholder="请填写储蓄卡卡号" v-model.trim="data.bankCard" />
      </li>
      <li>
        <span>手机号</span>
        <input type="tel" placeholder="请填写真实的手机号码" v-model.trim="data.mobile" pattern="[0-9]*" />
      </li>
      <li>
        <span>图形验证码</span>
        <input type="text" placeholder="验证码" v-model.trim="captcha">
        <img :src="validateImgSrc" class="img_captcha" @click="validateImgClick()">
      </li>
      <li>
        <span>手机验证码</span>
        <input type="text" v-model.trim="data.code"/>
        <button @click.prevent="sendCode" :disabled="codeFlag" class="bnt" type="button">{{codeText}}</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { IsMobile,isEmpty } from "util/common";
import { mapGetters } from "vuex";
import { IOSFocus } from "@/mixins";
export default {
  mixins: [IOSFocus],
  props: {
    getPersonInfoC:{
      type:Boolean,
      default:false
    }
  },
  data: () => ({
    codeText: "发送验证码",
    codeFlag: false,
    captcha:'',
    validateImgSrc: '',
    data: {
      mobile: "",
      code: "",
      idNum: "",
      name: "",
      bankCard:""
    }
  }),
  watch: {
    getPersonInfoC(val) {
        if(val==true){
          this.$emit('person-data',this.data);
          this.$emit('update:getPersonInfoC', false);
        }
    }
  },
  methods: {
    async sendCode() {
      if (!IsMobile(this.data.mobile)) return this.$toast("请输入正确的手机号");
      if (isEmpty(this.captcha)) return this.$toast("请输入图形验证码");
      try{
        const { contractSms } = await import(/* webpackPrefetch: true */ "api");
        let data = await contractSms({ mobile: this.data.mobile,code:this.captcha});
      }catch (e) {
        this.validateImgClick();
        this.captcha = '';
        return this.$toast(e);
      }
      this.codeText = "120s 重新获取";
      let _this = this;
      let timeInit = 120;
      let countDown = window.setInterval(function() {
        let i = 1;
        timeInit = timeInit - i;
        if (timeInit > 0) {
          _this.codeText = timeInit + "s 重新获取";
          _this.codeFlag = true;
        } else {
          _this.codeText = "重新获取";
          _this.codeFlag = false;
          window.clearInterval(countDown);
        }
      }, 1000);
    },
    validateImgClick(){
      this.validateImgSrc = process.env.VUE_APP_CONTRACT_URL + '/contract/captcha?' + (new Date());
    }
  },
  mounted() {
    this.validateImgSrc = process.env.VUE_APP_CONTRACT_URL + '/contract/captcha?' + (new Date());
  },
};
</script>
<style lang="scss" scoped>
.identity-info-wrap {
  background: #fff;
  padding: 0 15px;
  margin-top: 10px;
  li {
    line-height: 62px;
    height: 62px;
    border-bottom: 1px solid #f6f6f6;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: #666;
      width: 86px;
    }
    &:last-of-type {
      border: none;
    }
    input {
      flex: 1;
      height: 100%;
      color: #333;
      line-height: 100%;
      &::-webkit-input-placeholder {
        color: #a9a9a9;
        font-size: 13px;
      }
      &:-moz-placeholder {
        color: #a9a9a9;
        font-size: 13px;
      }
      &:-ms-input-placeholder {
        color: #a9a9a9;
        font-size: 13px;
      }
    }
    input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0px 1000px white inset !important;
      -webkit-transition-delay: 9999s;
      -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
    }
    .bnt{
      text-align: center;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #30ce84;
      color: #30ce84;
      background: #fff;
    }
    img{
      width: 90px;
      height: 40px;
    }
  }
}
</style>
