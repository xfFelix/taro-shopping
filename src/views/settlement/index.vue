<template>
  <div class="settlement">
    <Header>门票预订</Header>
    <good :list="dateList" :info="ticketInfo" ref="good"></good>
    <user :data.sync="user"></user>
    <expense :data="feeInfo"></expense>
    <div class="footer" v-show="hideShow">
      <div class="total">合计: <strong class="price-color">{{feeInfo.total|toPrice}}</strong></div>
      <div class="submit" @click="validateUser">提交订单</div>
    </div>
    <transition name="fade">
        <bg-mask v-model="showSendCode"></bg-mask>
    </transition>
    <transition name="slideUp">
        <sms-confirm :showSendCode.sync="showSendCode"></sms-confirm>
    </transition>
  </div>
</template>

<script>
import {getDateList,getFeeInfo,getTicketInfo,submitOrder} from 'api'
import {mapGetters,mapActions} from 'vuex';
import {IsMobile,isIDCard} from 'util/common'
export default {
  components: {
    'Header' : () => import('components/Header'),
    Good: () => import('./components/Good'),
    User: () => import('./components/User'),
    Expense: () => import('./components/Expense'),
    BgMask: () => import('components/BgMask'),
    SmsConfirm: () => import('./components/SmsConfirm')
  },
  data: () => ({
    docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
    showHeight: document.documentElement.clientHeight,   //实时屏幕高度
    hideShow: true,
    showSendCode: false,
    dateList: [],
    feeInfo: {},
    ticketInfo: {},
    user:{
      name: '',
      mobile: undefined,
      IDCardType: '身份证',
      options: ['身份证'],
      IDCardNumber: ''
    }
  }),
  watch:{
    showHeight:function() {
      let u = navigator.userAgent, app = navigator.appVersion;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      if (isAndroid) {
        if(this.docmHeight > this.showHeight){
          this.hideShow = false
        }else{
          this.hideShow = true
        }
      }
    },
  },
  created () {
    this.getPreviewOrder()
    this.getTicketInfo()
  },
  mounted() {
    this.checkResize()
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken'
    })
  },
  methods: {
    ...mapActions({
      checkUrlToken: 'checkUrlToken'
    }),
    validateUser() {
      // if (!this.user.name) return this.$toast('姓名不能为空')
      // if (!IsMobile(this.user.mobile)) return this.$toast('请输入正确的手机号')
      // if (!isIDCard(this.user.IDCardNumber)) return this.$toast('身份证验证失败')
      // if (!this.checkUrlToken()) return this.$toast('请先登录')
      this.showSendCode = true
    },
    async submitOrder() {
      let good = this.$refs.good.data
      let args = {
        tid: this.$route.query.id,
        token: this.getToken,
        playtime:good.checkerValue,
        tnum: good.number,
        name: this.user.name,
        mobile: this.user.mobile,
        personID: this.user.IDCardNumber
      }
      let data = await submitOrder(args)
      if (data.code !== '1') return this.$toast(data.message)
      this.$toast('门票提交成功')
      setTimeout(() => {
        this.$router.replace('/order')
      }, 500);
    },
    async getTicketInfo() {
      let data = await getTicketInfo({id: this.$route.query.id})
      if (data.code !== '1') return this.$toast(data.message)
      this.ticketInfo = data.data[0]
    },
    async getPreviewOrder() {
      let dateList = await getDateList({id: this.$route.query.id})
      if (dateList.code !== '1') return this.$toast(dateList.message)
      this.dateList = dateList.data
    },
    async getFeeInfo(price, num) {
      let feeInfo = await getFeeInfo({token: this.getToken, price,num})
      if (feeInfo.code !== '1') return this.$toast(feeInfo.message)
      this.feeInfo = feeInfo.data[0]
    },
    checkResize() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.onresize = () => {
          return (() => {
            this.showHeight = document.body.clientHeight;
          })()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settlement{
  font-size: 14px;
  padding-bottom: 70px;
  .footer{
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    .total{
      flex: 1;
      padding: 30px 0 0 10px;
      font-weight: 600;
      strong{
        font-size: 24px;
        font-weight: 700;
      }
    }
    .submit{
      padding: 20px 30px;
      background: rgb(48, 206, 132);
      color: #fff;
    }
  }
}
</style>

