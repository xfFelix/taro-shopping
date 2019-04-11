<template>
  <div class="settlement">
    <Header>门票预订</Header>
    <good :list="dateList"></good>
    <user></user>
    <expense :data="feeInfo"></expense>
    <div class="footer" v-show="hideShow">
      <div class="total">合计: <strong class="price-color">{{feeInfo.total|toPrice}}</strong></div>
      <div class="submit">提交订单</div>
    </div>
  </div>
</template>

<script>
import {getDateList,getFeeInfo} from 'api'
import {mapGetters} from 'vuex';
export default {
  components: {
    'Header' : () => import('components/Header'),
    Good: () => import('./components/Good'),
    User: () => import('./components/User'),
    Expense: () => import('./components/Expense')
  },
  data: () => ({
    docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
    showHeight: document.documentElement.clientHeight,   //实时屏幕高度
    hideShow: true,
    dateList: [],
    feeInfo: {}
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

