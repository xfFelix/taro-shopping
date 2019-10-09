<template>
  <div class="bind">
       <Header class="navbar" :show-more="!yingqiudiShow">用户绑定</Header>
      <ul >
        <li><span class="iconImg telPng"></span><input type="text" placeholder="请输入手机号码" v-model.trim="mobile"/></li>
        <li><span class="iconImg msgPng"></span><input type="text" placeholder="短信验证码"  v-model.trim="smsValid"/>
          <button class="btn-code" @click="getCode" :disabled="btnCodeDisabled">{{time > 0 ? `${time}s` : timeFlag}}</button>
        </li>
      </ul>

      <p class="certBnt" @click="certBnt()">确定</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { IsMobile,isEmpty } from "util/common";
import {bind } from 'api';
import { vipCustom } from '@/mixins';
export default {
  mixins: [vipCustom],
  data:()=>({
    btnCodeDisabled: false,
    time: 0,
    mobile:undefined,
    smsValid:undefined,
    timeFlag:'发送验证码'
  }),
  computed: {
    ...mapGetters({
      token: 'getToken',
    })
  },
  methods:{
    async getCode() {
      if(!IsMobile(this.mobile)){
        return this.$toast('请输入有效的手机号码');
      }
      const { sendSmsCode } = await import(/* webpackPrefetch: true */ 'api');
      let res= await sendSmsCode({mobile: this.mobile})
      if (res.error_code != 0) return this.$toast(res.message);
      this.btnCodeDisabled = true;
      this.time = 120;
      this.timeFlag = '重新获取'
      this.interval = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          this.btnCodeDisabled = false
          clearInterval(this.interval)
        }
      }, 1000)
    },
    async bind(){
      let res = await bind({token:this.token,mobile:this.mobile,passwd:this.smsValid,captcha:""});
      if(res.error_code == 0){
        this.$dialog({content:res.message},()=>{
          if(this.$route.query.back){
            this.$router.push({path:'/'+this.$route.query.back})
          }else{
            this.$router.push({path:'/realName'})
          }
        })
      }else{
         this.$dialog({content:res.message},()=>{})
      }
    },
    certBnt(){
      if(!IsMobile(this.mobile)){
        return this.$toast('请输入有效的手机号码');
      }
      if(isEmpty(this.smsValid)) {
        return this.$toast('请输入短信验证码');
      }
      this.bind();
    }
  },
  mounted(){
    if(this.$route.query.m){
      this.mobile = this.$route.query.m;
    }
  },
  components: {
    Header: () => import('@/components/Header'),
  },
}
</script>

<style lang="scss" scoped>
.bind{
  width: 100%;
  min-height: 100%;
  background-color: #FFF;
  .navbar{
    background: #313340;
    color: #fff;
    position: fixed;
    width: 100%;
  }
  ul{
    padding: 70px 22px;
    font-size: 14px;
    li{
      border-bottom: 1px solid #dfdfdf;
      height: 52px;
      display: flex;
      align-items: center;
      input{
        width: 100%;
        height: 100%;
        flex: 1;
        margin-left: 6px;
      }
    }
    .msgPng {
      width: 19px;
      height: 19px;
      background-image: url("../../../common/images/login-msg.png");
    }
    .telPng {
      width: 17px;
      height: 23px;
      background-image: url("../../../common/images/login-tel.png");
    }
  }
  .certBnt{
      background: linear-gradient(to right, #52e49c, #2fcf84);
      line-height: 45px;
      text-align: center;
      font-size: 15px;
      color: #fff;
      width: 92%;
      border-radius: 30px;
      margin: 0 auto;
    }
      .btn-code{
        border: none;
        background: #30ce84;
        color: #fff;
        white-space: nowrap;
        width: 80px;
        padding: 5px 5px;
        font-size: 12px;
      }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .navbar{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
