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

      if(Object.keys(this.frontObj).length==0) return this.$toast("请上传您的身份证正面照");
      if(Object.keys(this.backObj).length==0) return this.$toast("请上传您的身份证反面照");
      if(isEmpty(this.dataInfo.name)) return this.$toast("请填写您的姓名");
      if (!IdentityCodeValid(this.dataInfo.idNum)) return this.$toast("请填写您的有效身份证号码");
      if(isEmpty(this.dataInfo.mobile)) return this.$toast("请填写您的手机号");
      if (!IsMobile(this.dataInfo.mobile)) return this.$toast("请输入正确的手机号");
      if(isEmpty(this.dataInfo.code)) return this.$toast("请输入验证码");
      if(this.checked==false) return  this.$toast("请阅读并同意<p>《在线签约用户协议》</p>");
      this.checkedID();
    },
    //校验
    async checkedID(){
      const { checkId } = await import(/* webpackPrefetch: true */ "api");
      let data = await checkId({name:this.dataInfo.name, idCard: this.dataInfo.idNum});
      if (data.code!=0) return this.$toast(data.msg);
      this.uploadFile()
    },
    //上传文件
    uploadFile(){
      const toast = this.$createToast({message: 'loading', mask:true,time:0})
      toast.show()
      let formData = new FormData(this.$refs.advForm);
        console.log(this.$refs.advForm)
        formData.append('name',this.dataInfo.name);
        formData.append('idCard',this.dataInfo.idNum);
        formData.append('mobile',this.dataInfo.mobile);
        formData.append('code',this.dataInfo.code);
        formData.append('positiveIDPhoto1',this.frontObj.file);
        formData.append('negativeIDPhoto1',this.backObj.file);
      // const instance = axios.create({
      //   headers:{'Content-Type': 'multipart/form-data;charset=utf-8'},
      //   withCredentials: process.env.NODE_ENV === 'production',
      // })

      // let xhr = new XMLHttpRequest();
      // xhr.open("post", process.env.VUE_APP_CONTRACT_URL+'/contract/submit', true);
      // // xhr.setRequestHeader("Content-Type","multipart/form-data;charset=utf-8");
      // xhr.send(formData);
      // xhr.onreadystatechange = ()=>{
      //   if(xhr.readyState == 4 && xhr.status == 200) {
      //     let data=JSON.parse(xhr.responseText);
      //     if(data==0){
      //       this.$router.push({name:'signHelps'})
      //     }else{
      //     this.$toast(data.msg);
      //     }
      //   }
      //   toast.hide()
      // }
      axios.defaults.headers.post['Content-Type']='multipart/form-data;charse=UTF-8';
      axios({
          method: 'post',
          data: formData,
          transformRequest: [function(){
              return formData;
          }],
          url: process.env.VUE_APP_CONTRACT_URL+'/contract/submit',
      }).then(res => {
           toast.hide()
          if(res.data.code==0){
              this.$router.push({name:'signHelps'})
          }else{
              this.$toast(res.data.msg);
          }
      }).catch(err=>{
        toast.hide()
        console.error(err);
      });

      // instance.post(process.env.VUE_APP_CONTRACT_URL+'/contract/submit',formData).then(res=>{
      //   toast.hide()
      //   if(res.data.code==0){
      //       this.$router.push({name:'signHelps'})
      //   }else{
      //     this.$toast(res.data.msg);
      //   }
      // }).catch(err=>{
      //   toast.hide()
      //   console.error(err);
      // })
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
  // h1{
  //   line-height: 44px;
  //   background: #373C48;
  //   text-align: center;
  //   color: #fff;
  //   font-size: 18px;
  //   font-family: PingFang-SC-Regular;
  // }
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
