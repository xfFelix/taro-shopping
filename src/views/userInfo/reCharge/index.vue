<template>
  <div class="reCharge">
    <Header class="navbar" :show-more="!yingqiudiShow">椰子分充值</Header>
    <div class="chargeWrap">
      <div class="charge-content">
      <div class="chargeBanner">
        <img src="../../../common/images/charge.png" alt="椰子积分" />
      </div>
      <div class="chargeInfo" >
        <ul class="chargeUl">
          <li>
              <span class="iconImg chargeli_01"></span>
              <input type="text" name="cardpwd" placeholder="卡密" v-model.trim="cardPass">
          </li>
          <li>
              <span class="iconImg chargeli_02"></span>
              <input type="text" name="captcha2" placeholder="验证码" v-model.trim="cardCap">
              <img :src="captcha" class="img_captcha" @click="captcha=`${domainName}user/captcha?${(new Date())}`"/>
          </li>
        </ul>
        <button class="certBnt" @click="certBnt()">充值</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { isEmpty } from "util/common";
import {mapGetters} from 'vuex';
import {charge} from 'api';
import { vipCustom} from '@/mixins';
export default {
  mixins: [vipCustom],
  data:()=>({
    captcha:undefined,
    cardPass:undefined,
    cardCap:undefined,
    domainName:process.env.VUE_APP_INFO_URl
  }),
  computed:{
    ...mapGetters({
      getToken:'getToken',
      userinfo: 'getUserinfo'
    })
  },
  methods:{
    certBnt(){
      if (isEmpty(this.cardPass)) {
        return this.$toast("请输入卡密!");
      }
      if (isEmpty(this.cardCap)) {
          return this.$toast("请输入图片验证码!");
      }
      this.charge()
    },
    async charge(){
      let res = await charge({token:this.getToken,passwd:this.cardPass,captcha:this.cardCap});
      if(res.error_code==0){
        this.$dialog({content:'卡密充值成功！'},()=>{location.href = this.userinfo.haiHang;})
      }else{
        this.$dialog({content:res.message},()=>{
          if(res.error_code==2){ this.captcha= this.domainName + 'user/captcha?' + (new Date());}
        })
        return false;
      }
    }
  },
  components: {
    Header: () => import('@/components/Header'),
  },
  mounted(){
    console.log(process.env.VUE_APP_INFO_URl)
    this.captcha= this.domainName + 'user/captcha?' + (new Date());
  }
}
</script>

<style lang="scss" scoped>
.reCharge{
  width: 100%;
  min-height: 100%;
  .navbar{
    background: #313340;
    color: #fff;
    position: fixed;
    width: 100%;
  }

.chargeWrap {
    padding-top: 52px;
    .charge-content{
      background: #fff;
      box-shadow: 0px 0px 20px 0px #e1ebff;
      border-radius: 5px;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 15px;
      width:92%;
      margin: 0 auto;
      padding: 20px 0;
      .chargeBanner {
        width: 88%;
        height: 110px;
        margin: 0 auto;
        padding: 15px 15px 25px 15px;
        img {
          width: 100%;
          height: 110px;
          border-bottom: 1px dashed #dce0e8;
          padding-bottom: 25px;
        }
      }
      .chargeInfo .chargeUl li {
        position: relative;
        width: 270px;
        height: 45px;
        border: 1px solid #30ce84;
        margin: 15px auto;
        border-radius: 50px;
        box-shadow: 4px 7px 5px 0px rgba(135, 248, 199, 0.2);
        display: flex;
        align-items: center;
        input{
          width: 100%;
          height: 100%;
          flex: 1;
          border-radius:0 50px 50px 0;
        }
        .img_captcha{
          width: 54px;
          height: 24px;
          margin-right: 10px;
        }
      }
      .chargeli_01,.chargeli_02 {
        width: 17px;
        height: 17px;
        margin: 0 6px;
      }
      .chargeli_01 {
        background-image: url("../../../common/images/charge_01.png");
      }
      .chargeli_02 {
        background-image: url("../../../common/images/charge_02.png");
      }
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
