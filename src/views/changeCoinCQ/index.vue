<template>
  <div class="changeCoinCQ">
    <Header class="header">传奇金币</Header>
    <div class="bg-black"></div>
    <div class="content">
      <div class="input-wrapper">
        <img src="~common/images/logo.png" alt="">
        <input type="text">
      </div>
      <div class="score-wrapper">
        椰子分余额：<span class="score">{{userinfo.score}}</span>
      </div>
      <div class="list">
        <h2>种类</h2>
        <div class="container">
          <div class="item">会员</div>
        </div>
      </div>
      <div class="list">
        <h2>面值</h2>
        <div class="container">
          <div class="face-item" v-for="(item, index) in list" :key="index">
            <div class="price-wrapper" :class="active == item.id ? 'active': ''" @click="toggleActive(item)">
              <div class="title">{{item.catName}}</div>
              <div class="price"><span>售价：{{item.catKey}}</span></div>
            </div>
            <div class="gift"><span>送金币一万</span></div>
          </div>
        </div>
      </div>
      <div class="desc">
        <h2>温馨提示</h2>
        <p>
          传奇扑克日卡会员<br/>
          1 本会员可享受官方客服1对1VIP售后服务一日，时间自兑换之日起计算1天。<br/>
          2 本会员附赠10万传奇金币。<br/>
          3 本会员可享受传奇周边产品99折特惠折扣。<br/>
          4 充值请填写传奇扑克APP游戏账号。<br/>
          5 如您未注册传奇扑克APP游戏账号，请先注册后出从之。<br/>
          6 本服务不支持7天无理由退款。<br/>
          7 传奇金币发放问题请咨询传奇扑克客服：微信：legendpoker_qn。<br/>
          8 订单查询步骤：传奇扑克APP→我的→查看金币即可。
        </p>
      </div>
    </div>
    <button class="confirm">立即兑换</button>

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
    list: '',
    active: ''
  }),
  computed: {
    ...mapGetters({
      token: 'getToken',
      userinfo: 'getUserinfo'
    })
  },
  created() {
    this.getList()
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
    async getList(){
      const {getChuanQiCoinList} = await import('@/api')
      const { code, data } = await getChuanQiCoinList({catKey: ''})
      this.list = data
      this.active = data[0].id
    },
    toggleActive(item) {
      this.active = item.id
    },
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
  components: {
    SmsCode: ()=> import('@/components/SmsCode'),
    BgMask: () => import('@/components/BgMask'),
    Header: () => import('@/components/Header')
    // succPage:()=> import('./components/succPage'),
  },
}
</script>

<style lang="scss" scoped>
.changeCoinCQ{
  min-height: 100%;
  background: #fff;
  .header{
    background: #373C48;
    color: #fff;
  }
  .bg-black{
    height: 48px;
    background: #373C48;
    position: relative;
    z-index: 2;
  }
  .content{
    padding: 0 15px 50px;
    overflow: hidden;
    box-sizing: border-box;
    background: #fff;
    margin-top: -30px;
    .input-wrapper{
      height:60px;
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 10px 0px rgba(55,60,72,0.25);
      border-radius:5px;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 2;
      img{
        width: 22px;
        height: 22px;
        margin: 0 15px;
      }
      input{
        width: 100%;
        height: 100%;
        font-size: 16px;
      }
    }
    .score-wrapper{
      color: #4A4A4A;
      margin-top: 20px;
      .score{
        color: #30CE84;
      }
    }
    .list{
      margin-top: 15px;
      h2{
        color: #999;
      }
      .container{
        overflow: hidden;
        .item{
          width: 103px;
          height: 49px;
          margin-left: 18px;
          margin-top: 15px;
          background:rgba(48,206,132,1);
          border-radius:5px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 15px;
          float: left;
          &:nth-child(3n + 1){
            margin-left: 0;
          }
        }
        .face-item{
          width: 103px;
          margin-left: 18px;
          margin-top: 15px;
          border-radius:5px;
          float: left;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          &:nth-child(3n + 1){
            margin-left: 0;
          }
          .price-wrapper{
            height: 49px;
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            color: #30CE84;
            &::after{
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              border: 1px solid #30CE84;
              box-sizing: border-box;
              width: 200%;
              height: 200%;
              transform: scale(0.5);
              transform-origin: left top;
              border-radius:10px 10px 0px 0px;
              pointer-events: none;
            }
            &.active{
              background: #30CE84;
              color: #fff;
              border-radius:5px 5px 0px 0px;
            }
            .title{
              font-weight: bold;
              font-size: 15px;
            }
            .price{
              font-size: 12px;
              font-weight: 200;
              span{
                display: block;
                transform: scale(.916);
              }
            }
          }
          .gift{
            width: 100%;
            height: 20px;
            color: #999;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            opacity: .9;
            &::after{
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              border: 1px solid #DEDEDE;
              border-top: none;
              box-sizing: border-box;
              width: 200%;
              height: 200%;
              transform: scale(0.5);
              transform-origin: left top;
              border-radius: 0px 0px 10px 10px;
              pointer-events: none;
            }
            span{
              display: block;
              transform: scale(.75);
            }
          }
        }
      }
    }
    .desc{
      margin-top: 30px;
      h2{
        font-weight:400;
        color:rgba(74,74,74,1);
        font-size: 15px;
      }
      p{
        margin-top: 18px;
        font-size: 12px;
        color: rgba(153,153,153,1);
        line-height: 1.8;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
  .confirm{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background: #30CE84;
    color: #fff;
    font-size: 15px;
    font-weight:400;
    border: none;
  }
}
</style>
