<template>
  <div class="success-wrapper">
    <div class="banner">
      <div class="success">
        <i class="iconfont ok">&#xe631;</i>
        <span class="text">提交成功</span>
      </div>
      <div class="price">{{infoList.total|toPrice}}</div>
    </div>
    <ul>
      <li>产品名称：{{infoList.productName}}</li>
      <li>类型：
        <span v-if="infoList.timeType==='1'">周卡</span>
        <span v-else-if="infoList.timeType==='2'">月卡</span>
        <span v-else-if="infoList.timeType==='3'">季卡</span>
        <span v-else-if="infoList.timeType==='4'">半年卡</span>
        <span v-else>年卡</span>
      </li>
      <li>充值账号：{{$route.query.num|formatPhone}}</li>
      <li>售价：{{infoList.sellingPrice|toPrice}}</li>
      <li>税费：{{infoList.tax_total|toPrice}}</li>
      <li>合计：{{infoList.total|toPrice}}</li>
    </ul>
    <button class="confirm" @click="$router.push({name:'memberHome'})">确定</button>
    <span class="time">
      <em>{{countDown}}s</em>后自动跳转</span>
  </div>
</template>

<script>
import { vipCostInfo } from 'api';
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    timer: null,
    countDown: 3,
    infoList: {}
  }),
  methods: {
    async vipCostInfo() {
      let data = await vipCostInfo({ token: this.getToken, productId: this.$route.query.productId });
      if (data.code != 1) return this.$toast(data.message);
      this.infoList = data.data;
    },
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
    })
  },
  mounted() {
    this.vipCostInfo()
    this.timer = setInterval(() => {
      this.countDown--
      if (this.countDown == 0) {
        clearInterval(this.timer);
        this.$router.push({ name: 'memberHome' })
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.success-wrapper {
  padding: 0 15px;
  background: #fff;
  min-height: 100%;
  letter-spacing: 1px;
  .banner {
    height: 215px;
    border-bottom: 1px solid #DEDEDE;
    .success {
      padding-top: 84px;
      font-size: 30px;
      color: #30CE84;
      text-align: center;
      .ok {
        font-size: 24px;
        border: 2px solid #30CE84;
        border-radius: 50%;
        padding: 4px;
        margin-right: 18px;
        position: relative;
        z-index: 0;
        &::before {
          content: '';
          display: block;
          position: absolute;
          width: 6px;
          height: 10px;
          top: 0;
          left: 3px;
          background: #fff;
          z-index: 1;
        }
      }
    }
    .price {
      font-size: 36px;
      color: #30CE84;
      font-weight: 500;
      text-align: center;
      margin-top: 34px;
    }
  }
  ul {
    margin-top: 42px;
    color: #4A4A4A;
    padding-left: 15px;
    box-sizing: border-box;
    li {
      font-size: 15px;
      /*no*/
      margin-top: 25px;
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  .confirm {
    margin: 38px 0 10px 0;
    border: none;
    width: 100%;
    height: 44px;
    color: #fff;
    background: #30CE84;
    border-radius: 5px;
  }
  .time {
    font-size: 12px;
    /*no*/
    padding: 15px 0 10px 0;
    display: block;
    text-align: center;
    color: #999999;
    em {
      color: #30CE84;
    }
  }
}
</style>
