<template>
  <div>
    <ul class="identity-info-wrap">
      <li>
        <span>真实姓名</span>
        <input type="text" placeholder="请填写真实姓名（与提现姓名一致）" v-model.trim="data.name" />
      </li>
      <li>
        <span>证件号码</span>
        <input type="text" placeholder="请填写证件号码" v-model.trim="data.idNum" />
      </li>
      <li>
        <span>手机号</span>
        <input type="tel" placeholder="与提现手机号一致" v-model.trim="data.mobile" pattern="[0-9]*" />
      </li>
      <li>
        <span>手机验证码</span>
        <input type="text" v-model.trim="data.code" />
        <p @click.stop="sendCode" :display="codeFlag">{{codeText}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { IsMobile } from "util/common";
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
    data: {
      mobile: "",
      code: "",
      idNum: "",
      name: ""
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
  computed: {
    ...mapGetters({
      token: "getToken"
    })
  },
  methods: {
    async sendCode() {
      if (!IsMobile(this.data.mobile)) return this.$toast("请输入正确的手机号");
      const { contractSms } = await import(/* webpackPrefetch: true */ "api");
      let data = await contractSms({ mobile: this.data.mobile });
      if (data.code!=0) return this.$toast(data.msg);
      this.codeText = "300s 重新获取";
      let _this = this;
      let timeInit = 300;
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
    }
  }
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
    p {
      width: 88px;
      text-align: center;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #30ce84;
      color: #30ce84;
    }
  }
}
</style>
