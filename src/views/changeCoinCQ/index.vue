<template>
  <div class="changeCoinCQ">
      <header><i class="cubeic-back back" @click="$router.back()"></i>椰子分兑换传奇金币</header>
      <div class="cq-content">
        <P class="cq-info flex">椰子分余额<span>{{userinfo.score|toPrice}}</span></P>
        <P class="cq-info flex">传奇账户<span>{{userinfo.userName|formatPhone}}</span></P>
        <ul>
          <li>椰子分</li>
          <li><input type="text" v-model.trim="taxPrice"/><span class="iconImg logoG"></span></li>
          <li><p class="flex"><span class="iconImg c1"></span>兑换金币数</p>{{taxInfo.coin_total}}</li>
          <li><p class="flex"><span class="iconImg c2"></span>税费</p>{{taxInfo.tax_total|toPrice}}</li>
          <li><p class="flex"><span class="iconImg c3"></span>服务费</p>{{taxInfo.service_fee|toPrice}}</li>
          <li><p class="flex"><span class="iconImg c4"></span>应付合计</p>{{taxInfo.total|toPrice}}</li>
        </ul>
        <p class="certBnt" @click="certBnt()">立即兑换</p>
        <a href="https://mp.weixin.qq.com/s/hTBIzw7oJCKiI0qXb83iKA" target="_blank">兑换说明</a>
      </div>

    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <!-- 设置手机号 -->
    <set-mobile :show.sync="showSetMobile"></set-mobile>
    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <sms-code :show="show.code" :fail-text="failText" @handler-show-info="initShow" @submit-order="submitOrder" ></sms-code>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import { IsMobile,isEmpty } from "util/common";
import {chuanqiinfo,chuanqiTax,buyChuanQiCoin } from 'api';
import { setPayType ,IOSFocus} from '@/mixins';
export default {
  mixins: [setPayType, IOSFocus],
  data:()=>({
    taxPrice:undefined,
    timeInp:null,
    taxInfo:{
      coin_total:0,
      tax_total:0,
      service_fee:0,
      total:0,
      monthTotal:0
    },
    failText:undefined,
    show:{
      code:false,
      mask:false,
    },
    rate:10000,
    dis:0.85,
  }),
  computed: {
    ...mapGetters({
      token: 'getToken',
      userinfo: 'getUserinfo'
    })
  },
  watch:{
    taxPrice(val){
      if(val){
        window.clearTimeout(this.timeInp)
        this.timeInp=window.setTimeout(()=>{
          this.chuanqiTax(val);
        },500)
      }else{
        this.chuanqiTax(0);
      }
    },
  'show.mask': {
    handler(val) {
      if (!val) {
        this.initShow();
        this.failText=undefined
      }
    }
  },
},
  methods:{
    ...mapActions({
      checkPassword: 'checkPassword'
    }),
    async chuanqiinfo(){
      let res = await chuanqiinfo({});
      if (res.error_code != 0) { return console.log(res.message); }
      if(res.data != null){
        if(res.data.exchange_rate) this.rate = res.data.exchange_rate;
        if(res.data.chuanqiRate) this.dis = res.data.chuanqiRate;
      }
    },
    async chuanqiTax(val){
      let res = await chuanqiTax({amount:val,token:this.token});
      if (res.error_code != 0) { return this.$toast(res.message);}
      this.taxInfo = res.data;
      this.taxInfo.coin_total=Math.round(val*this.rate /this.dis);
    },
    initShow(){
      this.show={code:false,mask:false};
    },
    async submitOrder(val){
      let res = await buyChuanQiCoin({token:this.token,verify_code:val,amount:this.taxPrice});
       if(res.error_code == 0) {
         this.$dialog({content:'购买成功！'},()=>{})
       }else if(res.error_code == 30000){
          this.$dialog({content:res.message},()=>{
            this.$router.push({path:'realName?back=/changeCoinCQ'})
          })
       }else{
          this.failText=res.message;
       }
    },
    async certBnt(){
      if(!this.taxPrice || this.taxPrice<=0) return this.$toast('请输入有效金额');
      if(this.userinfo.score < this.taxInfo.total) return this.$toast('您的积分不足');
      if(this.coin_total < 0 || this.coin_total == 0) return this.$toast('获取金币兑换比例出错，请联系客服！');
      if(this.taxInfo.monthTotal > 30000 && !isEmpty(this.userinfo.idnum)){
        this.$dialog({content:'您消费额度超过3万，请先实名认证！'},()=>{
          this.$router.push({path:'realName?back=/changeCoinCQ'})
        })
        return false;
      }
      let res = await this.checkPassword();
      if (!res) return;
      this.show = {mask:true,code:true}
    }
  },
  mounted(){
    this.chuanqiinfo()
  },
  components: {
    SmsCode: ()=> import('@/components/SmsCode'),
    BgMask: () => import('@/components/BgMask'),
    // succPage:()=> import('./components/succPage'),
  },
}
</script>

<style lang="scss" scoped>
.changeCoinCQ{
  min-height: 100%;
  header{
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
    background: #373C48;
    font-size: 18px;
    color: #fff;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 0.4rem;
      font-size: 18px;
    }
  }
  .flex{
    display: flex;
    align-items: center;
  }
  .cq-content{
     padding-top: 62px;
      margin: 0 20px;
      border-radius: 5px;
      font-size: 14px;
      text-align: center;
    .cq-info{
      height: 52px;
      background: #fff;
      padding: 0 15px;
      color: #333;
      margin-bottom: 15px;
      justify-content: space-between;
      box-shadow:0px 0px 10px 0px #e1ebff;
      span{
        color: #666;
      }
    }
    ul{
    background: #fff;
    padding: 0 15px;
    box-shadow:0px 0px 10px 0px #e1ebff;
      li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 52px;
        border-bottom: 1px solid #e6e6e6;
        input{
          width: 100%;
          height: 100%;
          flex: 1;
        }
        .logoG{
          width: 25px;
          height: 25px;
          background-image: url('../../common/images/logoG.png')
        }
        .c1,.c2,.c3,.c4{
          width: 17px;
          height: 17px;
          margin-right: 10px;
        }
        .c1{
          background-image: url('../../common/images/c1.jpg')
        }
         .c2{
          background-image: url('../../common/images/c2.jpg')
        }
         .c3{
          background-image: url('../../common/images/c3.jpg')
        }
         .c4{
          background-image: url('../../common/images/c4.jpg')
        }
        &:first-of-type,&:last-of-type{
          border: none;
        }
      }
    }
    a{
      color: #007aff;
    }
  }
  .certBnt{
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
<style>
@media screen and (min-width: 600px) {
  header{
    max-width: 384px; /*no*/
  }
}
</style>
