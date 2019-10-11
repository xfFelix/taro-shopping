<template>
<div class="gold-home">
  <div v-show="!suceesShow" class="gold-home">
      <Header class="navbar" :show-more="!yingqiudiShow">黄金兑换</Header>
      <div class="main-absolute" ref='viewBox'>
        <gold-info  v-model.trim="inpPrice"  @inp-Clean="inpClean" @tax-money="taxInfo" @infoHeight="infoHeightF"></gold-info>
        <div class="agreement" ref="viewAgree">
          <cube-checkbox class="with-click" v-model="checked" shape="square">我已阅读并同意</cube-checkbox>
          <span @click="show.file=true" class="file">《黄金兑换协议》</span>
        </div>
        <gold-type :viewTopC="viewTop" :viewBoxHeightC="viewBoxHeight"></gold-type>
      </div>
      <sms-code :show="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder" ></sms-code>
      <transition name="fade">
        <bg-mask v-model="show.mask"></bg-mask>
      </transition>
      <!-- 设置支付密码dialog -->
      <set-password :show.sync="showSetPassword"></set-password>
      <!-- 设置手机号 -->
      <set-mobile :show.sync="showSetMobile"></set-mobile>
      <div class="goldBnt">
        <p class="goldBnt-left" @click="handlerShowType()" :class="!inpPrice?'bntNo':'bntCan'" >
            立即兑换
        </p>
        <p class="goldBnt-right" @click="$router.push({name:'goldRecord',query:{cardId:goldType.type}})" v-if="!yingqiudiShow">
            立即回购
        </p>
      </div>
    </div>
      <succ-page v-if="suceesShow" v-on:getCData="getCData"></succ-page>
      <gold-file  :show="show.file" @handle-show-file="initShow"></gold-file>
</div>
</template>
<script>

import {mapGetters, mapActions} from 'vuex';
import { goldBuy } from 'api';
import { setPayType ,IOSFocus ,vipCustom} from '@/mixins';
import { IsInteger,isEmpty } from "util/common";
export default {
  mixins: [setPayType, IOSFocus,vipCustom],
  data:()=>({
      checked:true,
      show:{
        code:false,
        mask:false,
        file:false
      },
      failText:undefined,
      inpPrice:undefined,
      suceesShow:false,
      taxMoney:{},
      viewTop:0,
      viewBoxHeight:0,
  }),
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow()
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      goldType: 'gold/getConfig',
      userinfo: 'getUserinfo'
    }),
  },
  methods:{
      ...mapActions({
        checkPassword: 'checkPassword',
        setConfig: 'gold/setConfig',
        initConfig:'gold/initConfig'
      }),
      inpClean(){
        this.inpPrice = ''
      },
      taxInfo(val){
        this.taxMoney = val;
      },
      getCData(val){  //关闭成功页
        this.suceesShow=val;
        this.inpPrice='';
      },
      handlerShowInfo(){
        this.initShow();
      },
      async submitOrder(val){ //输入短信下单
        let res = await goldBuy({token:this.getToken,amount:this.inpPrice,verify_code:val,id:this.goldType.type});
        if(res.error_code == 30000){
          this.$dialog({type:'confirm',content:res.message},()=>{
          this.$router.push({path:'/realName?back=/gold'})});
          return false;
        }
        if(res.error_code!=0)  return this.$toast(res.message);
        this.setConfig({id:res.data.id});
        this.initShow();
        this.suceesShow=true;
      },
      initShow(){
        this.show={mask:false,code:false,file:false};
      },
      async handlerShowType() {
        if(!this.checked){
          return this.$toast('请阅读并同意《黄金兑换协议》');
        }
        if(this.inpPrice >=1 && IsInteger(this.inpPrice)){
          if(this.userinfo.score >= this.taxMoney.total){
            if(this.taxMoney.monthTotal > 30000 && isEmpty(this.userinfo.idnum)){
              return this.$dialog({type:'confirm',content:'您消费额度超过3万，请先实名认证！'},()=>{
                this.$router.push({path:'/realName?back=/gold'})
              })
            }
            else{
              let res = await this.checkPassword();
              if (!res) return;
              this.show = { mask: true,code: true,file:false}
            }
          }else{
            this.$toast('您的积分不足');
          }
        }else{
          if(this.goldType.type==0){
            this.$toast('请输入有效的根数');
          }else{
            this.$toast('请输入有效的颗数');
          }
        }
      },
      infoHeightF(val){
        this.viewBoxHeight = this.$refs.viewAgree.offsetHeight + val;
      }
  },
  components: {
    Header: () => import('@/components/Header'),
    goldInfo: ()=> import('./components/goldInfo'),
    goldType: ()=> import('./components/goldType'),
    SmsCode: ()=> import('@/components/SmsCode'),
    BgMask: () => import('@/components/BgMask'),
    succPage:()=> import('./components/succPage'),
    goldFile: () => import("./components/goldFile"),
  },
  created() {
    this.initConfig()
  },
  mounted(){
    this.box = this.$refs.viewBox;
    this.box.addEventListener('scroll', () => {
      this.viewTop = this.$refs.viewBox.scrollTop;
    }, false)
  },
  beforeDestroy() {
    this.box.removeEventListener('scroll',this.$refs.viewBox);
  }
}
</script>
<style lang="scss" scoped>
.gold-home{
  height: 100%;
  .navbar{
      background: #313340;
      color: #fff;
      position: fixed;
      width: 100%;
  }
}
  .agreement {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    .cube-checkbox {
      padding: 0 0 0 20px;
    }
    .file {
      color: #30CE84;
      margin-top: -2px;
    }
  }

.goldBnt{
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    height: 45px;
    text-align: center;
    font-size: 16px;
  .goldBnt-left {
    flex: 2;
    color: #fff;
    height: 100%;
    line-height: 1.173333rem;
  }
  .goldBnt-right{
    height: 45px;
    display: inline-block;
    color: #4A4A4A;
    line-height: 45px;
    background: #fff;
    border-top: 1px solid #DEDEDE;
    width: 35%;
  }
  .bntCan{
    background: #30ce84;
    border-top: 1px solid #30ce84;
  }
  .bntNo{
    background:#98E7C2;
    border-top: 1px solid #98E7C2;
  }
}

.main-absolute{
  height: calc(100vh-89px);
  position: absolute;
  top: 44px;
  bottom:45px;
  overflow-y: scroll; /*使之可以滚动*/
　-webkit-overflow-scrolling:touch;
  scrollbar-width: none;
  overflow-x: hidden;
}
.main-absolute::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */}
.main-absolute:-webkit-scrollbar-thumb {
    background: transparent;
}
</style>
<style>
@media screen and (min-width: 600px) {
  .navbar,.goldBnt,.main-absolute{
    max-width: 384px; /*no*/
  }
}
</style>

