<template>
  <div class="goldBuyBack">
    <header>
      <i class="cubeic-back back" @click="$router.go(-1)"></i>黄金回购
    </header>
     <ul class="goldbuy-back-list gbb-form">
        <li class="goldbuy-back-money">
          回购金额:
          <p>
            <span>{{backPrice|toPrice}}</span>
            <span>元</span>
            <span @click="showDig()">?</span>
          </p>
        </li>
        <li class="l_add">卡密<input type="text" name="code" maxlength="14" placeholder="请输入兑换码"  disabled :value="backInfo.cardCode"/></li>
        <li>联系电话<input type="text" name="mobile" maxlength="12" placeholder="请输入联系人电话" v-model="inpInfo.mobile"/></li>
        <li>姓名<input type="text" name="name" maxlength="10" placeholder="请输入户主姓名" v-model="inpInfo.name"/></li>
        <li>银行卡号<input type="text" name="cardNum" maxlength="20" placeholder="请输入银行卡号" v-model="inpInfo.cardNum"/></li>
        <li>开户行<input type="text" name="bank" maxlength="20" placeholder="请输入开卡银行" v-model="inpInfo.bank"/></li>
        <li>开户支行<input type="text" name="subBank" maxlength="20" placeholder="请输入开户支行" v-model="inpInfo.subBank" /></li>
      </ul>
    <div class="agreement">
      <cube-checkbox class="with-click" v-model="checked" shape="square">我已阅读并同意</cube-checkbox>
      <span @click="show.file=true" class="file">《黄金回购协议》</span>
    </div>
    <p class="arrivel-accound-day">1-3个工作日内到账，请耐心等待</p>

    <div class="backBnt" @click="buyBnt()">提交</div>

    <sms-code :show="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder"></sms-code>
    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>

     <gold-file :show="show.file" @handle-show-file="initShow"></gold-file>


  </div>
</template>

<script>
import { goldbuyback ,goldPrice} from 'api';
import { mapGetters ,mapActions } from 'vuex';
import { IsMobile,isEmpty } from "util/common";
export default {
  data:()=>({
    checked:false,
    backPrice:undefined,
    inpInfo:{
      mobile:undefined,
      name:undefined,
      cardNum:undefined,
      bank:undefined,
      subBank:undefined
    },
    show:{
      mask:false,
      code:false,
      file:false
    },
    failText:''
  }),
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow();
          this.failText = undefined;
        }
      }
    },
  },
  computed:{
    ...mapGetters({
      getToken: 'getToken',
      goldConfig: 'gold/getConfig',
      backInfo: 'gold/getBackInfo',
      userinfo: 'getUserinfo'
    }),
  },
  methods:{
    ...mapActions({
      checkPassword: 'checkPassword',
    }),
    async submitOrder(val){ //输入短信下单
        let res= await goldbuyback({
            token: this.getToken,
            mobile: this.inpInfo.mobile,
            bank: this.inpInfo.bank,
            subBank: this.inpInfo.subBank,
            realName: this.inpInfo.name,
            cardNum: this.inpInfo.cardNum,
            id: this.backInfo.type,
            cardId:this.backInfo.cardId,
            verify_code: val,
        })
        if(res.error_code != 0){
          return this.failText = res.message;
        }else{
          this.initShow();
          this.$dialog({content:res.message},()=>{
            this.$router.push({name:'goldHome'})
          })
        }
    },
    async buyBnt(){
      if(!IsMobile(this.inpInfo.mobile)){
          return this.$toast('请输入有效的手机号码');
      }
      if(isEmpty(this.inpInfo.name)){
          return this.$toast('请输入真实姓名！');
      }
      if(isEmpty(this.inpInfo.cardNum)){
          return this.$toast('请输入有效的银行账号！');
      }
      if(isEmpty(this.inpInfo.bank)){
          return this.$toast('请输入开卡银行！');
      }
      if(isEmpty(this.inpInfo.subBank)){
          return this.$toast('请输入分行信息！');
      }
      if(!this.checked){
          return this.$toast('请先阅读并同意《黄金回购协议》');
      }
      let res = await this.checkPassword();
      if (!res) return;
      this.show={mask:true,code:true,file:false}
    },
    handlerShowInfo(){
        this.initShow();
      },
    initShow(){
      this.show={mask:false,code:false,file:false}
    },
    showDig(){
      this.$dialog({title:'回购说明',content: "<p style='margin-top:-12px;text-align: left;'>本服务由深圳市金宇阳光文化发展有限公司提供。</p><p style='text-align: left;margin: 8px 0 -13px 0;'>回购价格=基础金价-3元/克，基础金价为上海黄金交易所Au99.99当日开盘价。</p>"},() => {})
    },
  },
  mounted(){
    if(this.backInfo.type==0){
      this.backPrice = (this.backInfo.barPrice-20)*this.backInfo.weight;
    }else{
      this.backPrice = (this.backInfo.sandPrice-21)*this.backInfo.weight;
    }
    this.inpInfo.mobile = this.userinfo.userName;
    this.inpInfo.name = this.userinfo.realName;
  },
  components:{
    SmsCode: ()=> import('@/components/SmsCode'),
    BgMask: () => import('@/components/BgMask'),
    goldFile: () => import("./components/goldFile")
  }

}
</script>

<style lang="scss" scoped>
.goldBuyBack{
  min-height: 100%;
  background: #fff;
  header{
    text-align: center;
    position: fixed;
    font-size: 0.48rem;
    color: #FEFEFE;
    background: #373C48;
    line-height: 1.173333rem;
    height: 1.173333rem;
    width: 100%;
    top: 0;
    z-index: 2;
    .back{
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 0.4rem;
    }
  }
  .goldbuy-back-list{
    padding: 44px 16px 0 16px;
    color: #4A4A4A;
    font-size: 14px;
    .goldbuy-back-money{
      margin-top: 20px;
      font-size: 12px;
      display: block;
      padding: 0 0 20px 0;
      border: none;
      line-height: inherit;
      position: relative;
      p{
          text-align: center;
          margin-top: 18px;
          span{
            &:first-of-type{
              font-size: 36px;
              color: #30CE84;
              line-height: 34px;
            }
            &:nth-of-type(2){
              display: inline-block;
              vertical-align: bottom;
              color: #999999;
            }
            &:nth-of-type(3){
              border: 1px solid #30CE84;
              width: 15px;
              height: 15px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              color: #30CE84;
              font-size: 14px;
              margin: 0px 0 0 10px;
              font-weight: bold;
            }
          }
      }
    }
    li{
      display: flex;
      justify-content: space-between;
          line-height: 69px;
      border-bottom: 1px solid #DEDEDE;
      input{
        text-align: right;
        flex: 1;
        background: #fff;
      }
    }

    li input::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: #999;
      font-size: 15px;
    }
    li input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #999;
      font-size: 15px;
    }
    li input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #999;
      font-size: 15px;
    }
    li input:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #999;
      font-size: 15px;
    }
  }

  .agreement {
    display: flex;
    align-items: center;
    .cube-checkbox {
      padding: 0 0 0 20px;
    }
    .file {
      color: #30CE84;
      margin-top: -2px;
    }
  }
  .arrivel-accound-day{
    padding: 10px 0 55px 0;
    font-size:12px;
    color: #999999;
    text-align: center;
  }
  .backBnt {
    line-height: 44px;
    position: fixed;
    bottom: 0;
    background: #30ce84;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 15px;
    z-index: 1;
  }
}
</style>
<style>
.cube-dialog-title-def{
  margin:20px 0 25px 0;
}

@media screen and (min-width: 600px) {
  header,.backBnt{
    max-width: 384px; /*no*/
  }
}
</style>

