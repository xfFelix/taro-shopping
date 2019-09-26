<template>
  <div class="realName">
    <Header class="navbar" :show-more="!yingqiudiShow">实名认证</Header>
    <div class="name-info-wrap">
      <ul class="name-info">
        <li v-if="smsValid" style="color:#999;">虚拟号码：{{userinfo.userName}}</li>
        <li v-if="smsValid"><span class="iconImg tel"></span><input type="text" placeholder="手机号码" v-model="mobile"></li>
        <li v-if="smsValid">
          <span class="iconImg sms"></span><input type="text" placeholder="短信验证码" v-model="smsCode">
          <button class="sms-code" :disabled="btnDisabled" @click="sendCode">{{time>0 ? time + 's': '重新获取'}}</button>
        </li>
        <li><span class="iconImg name"></span><input type="text" placeholder="姓名" v-model="name"></li>
        <li><span class="iconImg identy"></span><input type="text" placeholder="身份证号码" v-model="cardId">
        </li>
        <li class="tip">
          温馨提示：应税务要求，信用卡还款或者月累计消费超过3万的用户需要实名认证。
        </li>
      </ul>
      <p class="certBnt" @click="certBnt()">确定</p>
    </div>
  </div>
</template>

<script>
import {cert ,certsms} from 'api';
import {mapGetters} from 'vuex';
import {isEmpty,IsMobile} from 'util/common'
import {IOSFocus ,vipCustom} from '@/mixins';
export default {
  mixins: [IOSFocus,vipCustom],
  data:()=>({
      name:undefined,
      cardId:undefined,
      mobile:undefined,
      smsCode:undefined,
      btnDisabled:false,
      timeout:null,
      smsValid:false,
      time:0
  }),
  computed:{
    ...mapGetters({
      getToken:'getToken',
      userinfo: 'getUserinfo'
    })
  },
  methods:{
    certBnt(){
      if(!isEmpty(this.userinfo.idnum)){
        this.$dialog({content:'您已经实名认证过了！'},()=>{});
        return false;
      }
      if(!this.name){
        return this.$toast("请输入你的真实姓名!");
      }
      if(!this.cardId){
         return this.$toast("请输入你的有效身份证号码!");
      }
      this.cert();
    },
    async cert(){
      let res = await cert({cardId:this.cardId,realName:this.name,token:this.getToken,mobile:this.mobile});
      if(res.error_code!=0) return this.$toast(res.message);
      this.$dialog({content:"身份证认证成功！"},()=>{
      if(this.$route.query.back){
          if(this.$route.query.back.indexOf('http')>=0){
              if(this.$route.query.back.indexOf('?')>0){
                location.href = this.$route.query.back+"&token=" + this.getToken;
              }else{
                location.href = this.$route.query.back+"?token=" + this.getToken;
              }
            }else{
              this.$router.push({path:this.$route.query.back})
            }
          }else{
            if(this.userinfo.haiHang){
              location.href = this.userinfo.haiHang;
            }else{
              this.$router.back()
            }
          }
      })
    },
    async sendCode() {
      if(isEmpty(this.mobile)|| !IsMobile(this.mobile)){
        return this.$toast("请输入您的有效手机号码！");
      }
      clearInterval(this.timeout);
      let res = await certsms({ mobile: this.mobile})
       if(res.error_code == 2){
        this.$dialog({type:'confirm',content:'该手机号码已经注册了，请先绑定该账号！'},()=>{
            if(this.$route.query.back){
              this.$router.push({path:`/bind?back=${this.$route.query.back}&m=${this.mobile}`})
            }else{
              this.$router.push({path:`/bind?m=${this.mobile}`})
            }
        })
      }else{
          this.time = 120;
          this.timeout = setInterval(() => {
            if (this.time > 0) {
              this.time--
              this.btnDisabled = true
            } else {
              this.btnDisabled = false
              clearInterval(this.timeout);
            }
          }, 1000)
      }
    }
  },
  mounted(){
      if(!isEmpty(this.userinfo.idnum)){
        this.$dialog({type:'confirm',content:'您已经实名认证过了！'},()=>{
          if(this.$route.query.back){
            if(this.$route.query.back.indexOf('http')>=0){
              if(this.$route.query.back.indexOf('?')>0){
                location.href = this.$route.query.back+"&token=" + this.getToken;
              }else{
                location.href = this.$route.query.back+"?token=" + this.getToken;
              }
            }else{
              this.$router.push({path:this.$route.query.back})
            }
          }else{
            if(this.userinfo.haiHang){
              location.href = this.userinfo.haiHang;
            }else{
              this.$router.back()
            }
          }
        })
      }

      if (IsMobile(this.userinfo.userName)){
        if(this.userinfo.payValidType == null || this.userinfo.payValidType == 0) {
          this.smsValid= true;
        }else{
          this.smsValid= false;
        }
      }else{
        this.smsValid= false;
      }

  },
  components: {
      Header: () => import('@/components/Header'),
    },
  }
</script>
<style lang="scss" scoped>
.realName{
  .navbar{
    background: #313340;
    color: #fff;
    position: fixed;
    width: 100%;
  }
  .name-info-wrap{
    padding-top: 44px;
    .name-info{
      font-size: 14px;
      padding: 30px 13px;
      background: #fff;
      margin: 0 auto;
      width: 86%;
      box-shadow: #cfe2f8 0 0 10px 0;
      margin-top: 15px;
      li{
        border-bottom: 1px solid #eee;
        line-height: 44px;
        display: flex;
        height: 44px;
        align-items: center;
        padding: 2px 5px;
        .name,.sms,.identy{
          margin-right: 16px;
          width: 20px;
          height: 20px;
        }
        .tel{
          width: 17px;
          height: 23px;
          margin-right: 16px;
          background-image: url('../../../common/images/login-tel.png');
        }
        .sms{
          background-image: url('../../../common/images/login-msg.png')
        }
        .identy{
          background-image: url('../../../common/images/login-identity.png')
        }
        .name{
          background-image: url('../../../common/images/login-name.png');
        }
        input{
          width: 100%;
          height: 100%;
          flex: 1;
        }
        .sms-code{
          background-color: transparent;
          border: 1px solid #27bd5a;
          padding: 1px 10px;
          color: #27bd5a;
          border-radius: 25px;
        }
      }
      .tip{
        line-height: 22px;
        color: #FF004E;
        font-size: 12px;
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
      margin: 40px auto;
    }

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
