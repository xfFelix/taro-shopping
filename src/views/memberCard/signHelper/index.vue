<template>
  <div class="sign-helper">
    <form ref="advForm">
      <upload-img @front-file="frontFiles"  @back-file="backFiles"></upload-img>
      <person-info @person-data="personInfoF" :getPersonInfoC.sync="getPersonInfo"></person-info>
      <div class="agreement">
        <cube-checkbox class="with-click" v-model="checked" shape="square">我已阅读并同意</cube-checkbox>
        <span class="file" @click="$router.push({name:'signHelpFile'})">《在线签约用户协议》</span>
      </div>
    </form>
    <div class="next-step" @click="commitInfo">确认提交</div>
  </div>
</template>
<script>
import { IdentityCodeValid,isEmpty,IsMobile } from "util/common";
import { checkId,signInfo } from 'api'
import axios from 'axios'
export default {
  data: () => ({
    checked: true,
    getPersonInfo:false,
    dataInfo:{},
    frontObj:{},
    backObj:{},
  }),
  methods: {
    // 点击确定按钮后不能直接拿到子组件的值，所以得在拿到值后再调接口
    commitInfo() {
      this.getPersonInfo = true;
    },
    //判断是否为空
    judgeEmpty(){
      console.log(this.dataInfo)
      if (Object.keys(this.frontObj).length==0) return this.$toast("请上传您的身份证正面照");
      if (Object.keys(this.backObj).length==0) return this.$toast("请上传您的身份证反面照");
      if (isEmpty(this.dataInfo.name)) return this.$toast("请填写您的姓名");
      if (!IdentityCodeValid(this.dataInfo.idNum)) return this.$toast("请填写您的有效身份证号码");
      if (isEmpty(this.dataInfo.bankCard)) return this.$toast("请填写您的银行卡号");
      if (isEmpty(this.dataInfo.mobile)) return this.$toast("请填写您的手机号");
      if (!IsMobile(this.dataInfo.mobile)) return this.$toast("请输入正确的手机号");
      if (isEmpty(this.dataInfo.code)) return this.$toast("请输入验证码");
      if (this.checked==false) return  this.$toast("请阅读并同意<p>《在线签约用户协议》</p>");
      this.checkedID()
    },
    //校验
    async checkedID(){
      let data = await checkId({name:this.dataInfo.name, idCard: this.dataInfo.idNum,bankCardNum:this.dataInfo.bankCard});
      console.log(data)
      if (data.code!=0) return this.$toast(data.msg);
      this.uploadFile()
    },
    //上传文件
    async uploadFile(){
      const toast = this.$createToast({mask:true,time:0});
      toast.show();
      let data = await signInfo({
        name:this.dataInfo.name,
        idCard:this.dataInfo.idNum,
        mobile:this.dataInfo.mobile,
        code:this.dataInfo.code,
        bankCardNum:this.dataInfo.bankCard,
        positiveIDPhoto:this.frontObj,
        negativeIDPhoto:this.backObj
      })

      if(data.code==0){
        this.$router.push({name:'signHelps'})
        toast.hide();
      }else{
        toast.hide();
        this.$toast(data.msg)
      }

    },
    //拿到子组件的值，开始调接口
    personInfoF(val){
      this.dataInfo=val;

      this.judgeEmpty();
    },
    frontFiles(val){
      this.frontObj = val;
    },
    backFiles(val){
       this.backObj = val;
    }
  },
  components: {
    personInfo: () => import("./components/personInfo"),
    uploadImg: () => import("./components/uploadImg")
  }
};
</script>
<style lang="scss" scoped>
.sign-helper {
  min-height: 100%;
  .next-step {
    width: 345px;
    background: #30ce84;
    border-radius: 5px;
    font-size: 15px;
    color: #fff;
    line-height: 44px;
    text-align: center;
    margin: 0 auto 54px auto;
  }
  .agreement {
    display: flex;
    align-items: center;
    .cube-checkbox {
      padding: 0 0 0 20px;
    }
    .file {
      color: #30ce84;
      margin-top: -2px;
    }
  }
}
</style>
