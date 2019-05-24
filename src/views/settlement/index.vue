<template>
  <div class="settlement">
    <Header>门票预订</Header>
    <good :list="dateList" :info="ticketInfo" ref="good"></good>
    <user :data.sync="user"></user>
    <expense :data="feeInfo"></expense>
    <div class="footer" v-show="hideShow">
      <div class="total">合计: <strong class="price-color">{{feeInfo.total|toPrice}}</strong></div>
      <div class="submit" @click="checkInfo">提交订单</div>
    </div>
    <transition name="fade">
        <bg-mask v-model="showSendCode"></bg-mask>
    </transition>
    <transition name="slideUp">
        <sms-confirm :showSendCode.sync="showSendCode" @commit-order="submitOrder"></sms-confirm>
    </transition>
    <transition name="slide-left" mode="out-in">
      <exchange-su :price="feeInfo.total" v-if="showSuccess"></exchange-su>
    </transition>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
  </div>
</template>

<script>
import {getDateList,getFeeInfo,getTicketInfo,submitOrder,getInfo} from 'api'
import {mapGetters,mapActions} from 'vuex';
import {IsMobile,isIDCard} from 'util/common'
import {tools_uri} from 'common/tools'
export default {
  components: {
    'Header' : () => import('components/Header'),
    Good: () => import('./components/Good'),
    User: () => import('./components/User'),
    Expense: () => import('./components/Expense'),
    BgMask: () => import('components/BgMask'),
    SmsConfirm: () => import('./components/SmsConfirm'),
    ExchangeSu: () => import('./components/ExchangeSu'),
    SetPassword: () => import(/* webpackPrefetch: true */ 'components/SetPassword')
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
    },
    showSuccess: false,
    userinfo: {},
    showLogin: false
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
    // 提取取票人信息
    if (this.getTicketUser) {
      this.user = this.getTicketUser
    }
    this.getPreviewOrder()
    this.getTicketInfo()
  },
  mounted() {
    this.checkResize()
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      getTicketUser: 'ticket/getUser',
      showSetPassword: 'getShowSetPassword'
    })
  },
  methods: {
    ...mapActions({
      setTicketUser: 'ticket/setUser',
      checkPassword: 'checkPassword'
    }),
    async checkInfo() {
      let res = await this.checkPassword()
      if (!res) return
      if (!this.getToken) return this.$dialog({type: 'confirm', content: '请先登录'}, () => {
        window.location.href = process.env.VUE_APP_INFO_URl + '#!/login?back=' + tools_uri.encode(window.location)
      })
      let info = await getInfo({token: this.getToken})
      if (info.error_code) return this.$toast(info.message)
      this.userinfo = info.data
      if (this.feeInfo.monthTotal > 30000) {
        if (!this.userinfo.isRealCert) {
          return this.$dialog({type: 'confirm', content: '请先实名认证'}, () => {
            return window.location.href = process.env.VUE_APP_INFO_URl + '#!/cert?back=' + tools_uri.encode(window.location) + '&token=' + this.getToken
          })
        }
      }
      this.validateUser()
    },
    validateUser() {
      if (!this.user.name) return this.$toast('姓名不能为空')
      if (!IsMobile(this.user.mobile)) return this.$toast('请输入正确的手机号')
      if (!isIDCard(this.user.IDCardNumber)) return this.$toast('身份证验证失败')
      this.showSendCode = true
    },
    async submitOrder(smsCode) {
      let good = this.$refs.good.data
      let args = {
        tid: this.$route.query.id,
        token: this.getToken,
        playtime:good.checkerValue,
        tnum: good.number,
        name: this.user.name,
        mobile: this.user.mobile,
        code: smsCode,
        personID: this.user.IDCardNumber
      }
      this.$loading()
      let data = await submitOrder(args)
      this.$loading.hide()
      if (data.code !== '1') return this.$toast(data.message)
      this.$toast('门票下单成功')
      this.setTicketUser(this.user) // 保存取票人信息
      this.showSendCode = false
      setTimeout(() => {
        this.showSuccess = true
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
      if (feeInfo.code === '3') return
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
<style>
@media screen and (min-width: 600px){
  .footer{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>


