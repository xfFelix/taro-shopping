<template>
  <div class="changeCoin-home">
    <header>
      <i class="cubeic-back back" @click="$router.go(-1)"></i>
      兑换{{userinfo.coinAlisa ? '元宝' : '金币'}}
    </header>
    <div class="changeCoin-content">
      <div class="changeCoin-inp-wrap">
        <span class="logoPng"></span>
        <input type="number" placeholder="请输入椰子分金额" @input="getMoneyInfo(false,$event)" v-model="coinInfo.moneyNum" />
      </div>
      <div class="changeCoin-account-wrap">
        <p>当前账号：
          <span class="changeCoin-account">{{userinfo.userName}}</span>
        </p>
        <!-- <p class="changeCoin-goout" @click="outLogin">退出登录</p> -->
      </div>
    </div>

    <div class="changeCoin-money-wrap">
      <p>椰子分余额：
        <span class="changeCoin-money">{{userinfo.score | toPrice}}</span>
        <!-- <span class="changeCoin-goout" :class="+userinfo.score === 0 ? 'disabled': ''" @click="+userinfo.score === 0 ? undefined : exchangeAll()">全部兑换</span> -->
      </p>
      <p @click="$router.push({name:'coinList'})">兑换记录></p>
    </div>

    <ul>
      <li>兑换{{userinfo.coinAlisa ? '元宝' : '金币'}}数：
        <span>{{coinInfo.num|toDecimal2Fp}}</span>
      </li>
    </ul>
    <div class="change-coin-total">
      <div class="tax-wrapper">
        <span>税费：
          <i>{{coinInfo.tax_total|toDecimal2}}</i>
        </span>
        <span style="margin-left: 15px">服务费：
          <i>{{coinInfo.service_fee|toDecimal2}}</i>
        </span>
      </div>
      <span class="total-wrapper">应付合计：
        <i style="font-weight: 600">{{coinInfo.total|toDecimal2}}</i>
      </span>
    </div>
    <p class="change-coin-bnt" @click="coinChange()">立即兑换</p>

    <div class="agreement">
      <cube-checkbox class="with-click" v-model="checked" shape="square">我已阅读并同意</cube-checkbox>
      <span @click="show.file=true" class="file">《椰子分兑换{{userinfo.coinAlisa ? '元宝' : '金币'}}说明》</span>
    </div>

    <!-- 遮罩层 -->
    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <!-- 兑换信息 -->
    <recharge-info :show="show.info" @handler-show-code="showSms" @go-back="initShow" :coinInfo="coinInfo"></recharge-info>
    <!-- 发送短信 -->
    <sms-code :show="show.sms" @handler-show-info="showInfo" @code-info="codeInfo" :codeError.sync="codeErrFlag" :codeMessage="codeMessage"></sms-code>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <!-- 设置手机号 -->
    <set-mobile :show.sync="showSetMobile"></set-mobile>
    <!-- 同意协议 -->
    <agree-file :show="show.file" @handle-show-file="initShow"></agree-file>
  </div>
</template>
<script>
import { localStorage } from 'common/storage'
import { tools_uri } from 'common/tools';
import { getCostCoin, sumbmitCoin, getInfo } from 'api';
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    checked: true,
    codeErrFlag: false,
    codeMessage: "",
    codeErr: {},
    show: {
      mask: false,
      info: false,
      sms: false,
      file: false
    },
    coinInfo: {
      num: 0,
      tax_total: 0,
      service_fee: 0,
      total: 0,
      moneyNum: ""
    },
    vendorId: null,
    vendorUid: undefined
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
      userinfo: 'getUserinfo',
    }),
    showSetPassword: {
      get() {
        return this.$store.getters.getShowSetPassword
      },
      set(val) {
        this.$store.dispatch('setShowSetPassword', val)
      }
    },
    showSetMobile: {
      get() {
        return this.$store.getters.getShowSetMobile
      },
      set(val) {
        this.$store.dispatch('setShowSetMobile', val)
      }
    }
  },
  methods: {
    ...mapActions({
      checkPassword: 'checkPassword',
      setUserInfo: 'setUserinfo'
    }),
    exchangeAll () {
      this.coinInfo.moneyNum = this.userinfo.score
      this.realMoney(false, undefined, 1)
    },
    codeInfo(code) {
      this.coinSumbmit(code)
    },
    initShow() {
      this.show = { mask: false, info: false, sms: false, file: false };
    },
    showInfo() {
      this.show = { mask: true, info: true, sms: false, file: false };
    },
    showSms() {
      this.show = { mask: true, info: false, sms: true, file: false };
    },
    async coinChange() {
      if (!this.coinInfo.moneyNum) { return this.$toast("请输入有效的椰子分") }
      if (this.checked == false) { return this.$toast("请阅读并同意协议") }
      let res = await this.checkPassword();
      if (!res) return;
      this.realMoney(true, undefined);
    },
    outLogin() {
      this.$dialog({ type: 'confirm', content: '确认退出当前账号？' }, () => {
        localStorage.remove('token');
        window.location.href = process.env.VUE_APP_INFO_URl + '#!/login?back=' + tools_uri.encode(window.location.origin + window.location.pathname)
      })
    },
    initData() {
      this.coinInfo = {
        num: 0,
        tax_total: 0,
        service_fee: 0,
        total: 0,
        moneyNum: ""
      }
    },
    getMoneyInfo(changeFlag, e) {
      window.clearTimeout(this.timeOut)
      this.timeOut = window.setTimeout(() => {
        this.realMoney(changeFlag, e)
      }, 1000)
    },
    async realMoney(changeFlag, e, isAll) {
      if (e) {
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
        this.coinInfo.moneyNum = e.target.value;
      }
      if (!this.coinInfo.moneyNum) {
        this.initData()
        return this.$toast("请输入有效的椰子分")
      }
      let params = { token: this.getToken, integral: this.coinInfo.moneyNum, vendorId: this.vendorId }
      if (isAll) {
        Object.assign(params, { isall: isAll})
      }
      let data = await getCostCoin(params);
      if (changeFlag == true) {
        if (data.code !== '1' && data.code !== '6' && data.code !== '4') return this.$toast(data.message);
        if (data.code === '6') {
          return this.$dialog({ content: '请先实名认证' }, () => {
            return window.location.href = process.env.VUE_APP_INFO_URl + '#!/cert?back=' + tools_uri.encode(window.location) + '&token=' + this.getToken
          })
        } else if (data.code === '4') {
          return this.$toast(data.message)
        }
        this.showInfo();
      } else {
        if (data.code !== '1' && data.code !== '6' && data.code !== '4') return this.$toast(data.message);
      }
      this.coinInfo = Object.assign(this.coinInfo, data.data[0]);
      if (data.data[0].amount) {
        this.coinInfo.moneyNum = data.data[0].amount
      }
    },
    async coinSumbmit(code) {
      let res = await sumbmitCoin({ token: this.getToken, integral: this.coinInfo.moneyNum, code: code, vendorId: this.vendorId, vendorUid: this.vendorUid })
      if (res.code != 1 && res.code != 4) {
        this.initShow();
        return this.$toast(res.message);
      }
      if (res.code == 4) {
        this.codeMessage = res.message;
        this.codeErrFlag = true;
        return
      }
      if (res.code == 1) {
        this.coinInfo.moneyNum = "";
        this.initShow();
        return this.$dialog({ title: "恭喜您，兑换成功",icon:"cubeic-right" }, () => {
          this.coinInfo = {
            num: 0,
            tax_total: 0,
            service_fee: 0,
            total: 0,
            moneyNum: ""
          }
          this.getInfo();
          return
        })
      }
    },
    async getInfo() {
      let info = await getInfo({ token: this.getToken })
      if (!info.error_code) { return this.setUserInfo(info.data) }
    },
  },
  mounted() {
    if (this.$route.query.vendorId) {
      this.vendorId = this.$route.query.vendorId
    }
    if (this.$route.query.vendorUid) {
      this.vendorUid = this.$route.query.vendorUid
    }
  },
  components: {
    BgMask: () => import('components/BgMask'),
    SmsCode: () => import('./components/SmsCode'),
    RechargeInfo: () => import('./components/RechargeInfo'),
    SetPassword: () => import(/* webpackPrefetch: true */ 'components/SetPassword'),
    SetMobile: () => import(/* webpackPrefetch: true */ 'components/SetMobile'),
    AgreeFile: () => import('./components/AgreeFile')
  },
}
</script>
<style lang="scss" scoped>
.changeCoin-home {
  header {
    text-align: center;
    position: relative;
    font-size: 18px;
    color: #FEFEFE;
    background: #373C48;
    line-height: 44px;
    .back {
      position: absolute;
      left: 15px;
    }
  }
  .changeCoin-content {
    background: #373C48;
    color: #FEFEFE;
    padding: 30px 15px 10px 15px;
    .changeCoin-inp-wrap {
      padding: 0 15px;
      background: #fff;
      height: 50px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      input {
        width: 100%;
        flex: 1;
        font-size: 18px;
        padding: 0 10px;
      }
    }
    .changeCoin-account-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 5px 10px 5px;
      .changeCoin-account {
        color: #30ce84;
      }
      .changeCoin-goout {
        background: #30ce84;
        font-size: 12px;
        border-radius: 5px;
        padding: 2px 11px;
      }
    }
  }
  .changeCoin-money-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 15px;
    border-bottom: 1px solid #eee;
    padding: 10px 0 20px 0;
    .changeCoin-account,
    .changeCoin-money {
      color: #30ce84;
    }
    .changeCoin-goout {
      background: #30ce84;
      font-size: 11px;
      border-radius: 5px;
      padding: 5px 10px;
      margin-left: 10px;
      color: #fff;
      &.disabled{
        background: #ccc;
      }
    }
  }
  ul {
    padding: 0px 20px 20px 20px;
    font-size: 14px;
    line-height: 50px;
    color: #4f4f4f;
    li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
    }
  }
  .change-coin-total{
    font-size: 14px;
    color: #4f4f4f;
    padding: 0 20px;
    margin-bottom: 30px;
    overflow: hidden;
    .tax-wrapper{
      float: left;
      margin-bottom: 10px;
      word-break: break-all;
      word-wrap: break-word;
    }
    .total-wrapper{
      float: right;
      font-weight: 600;
    }
  }
  .change-coin-bnt {
    margin: 0 25px;
    line-height: 45px;
    font-size: 15px;
    text-align: center;
    border-radius: 40px;
    color: #Fff;
    background: #30ce84;
  }
  .agreement {
    display: flex;
    align-items: center;
    padding:10px 10px 50px 10px;
    .file {
      color: #30ce84;
      margin-top: -1px;
    }
    .cube-checkbox {
      padding-right: 0;
    }
  }
}
</style>
<style lang="scss">
.cube-dialog-icon{
  .cubeic-right{
    background: #fff;
    width: auto;
    height: auto;
    &::before{
      color:#30ce84;
      font-size:60px;
  }
}
}

</style>
