<template>
  <div class="record-wrapper">
    <header>
      <i class="iconfont back">&#xe61e;</i>
      充值记录
    </header>
    <div class="content">
      <ul class="item">
        <li class="title" v-for="(item,index) in orderList" :key="index" >
          <span class="order-number">
            订单编号:&nbsp;{{item.IdUrl}}
          </span>
          <span class="status">兑换中</span>
        </li>
        <li>产品名称：爱奇艺VIP黄金会员年卡</li>
        <li>时间：2019-05-01 12:12:12</li>
        <li>时间：2019-05-01 12:12:12</li>
        <li>售价：142.56</li>
        <li>
          <span class="tax_fee">税费：3.00</span>
          <span class="total">合计：145.56</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { vipOrderList } from 'api';
import { mapGetters } from 'vuex';
export default {
  data: () => ({
      orderList:[]
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken',
    })
  },
  methods: {
    async vipOrderList() {
      let data = await vipOrderList({ token: this.getToken, offset: '1', rows: '10'});
    },
  },
  mounted() {
    this.vipOrderList()
  }
}
</script>

<style lang="scss" scoped>
.record-wrapper {
  background: #FFF;
  min-height: 100%;
  header {
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
    background: #373C48;
    font-size: 18px;
    color: #fff;
    .back {
      position: absolute;
      left: 15px;
      font-size: 20px;
    }
  }
  .content {
    padding: 0 15px 20px;
    box-sizing: border-box;
    .item {
      border: 1px solid rgba(222, 222, 222, 1);
      border-radius: 5px;
      margin-top: 20px;
      li {
        padding: 15px 15px 0;
        color: #4A4A4A;
        font-size: 15px;
        background: #F4F4F4;
        &.title {
          height: 43px;
          line-height: 43px;
          padding-top: 0;
          display: flex;
          justify-content: space-between;
          background: #fff;
        }
        &:last-of-type {
          padding-bottom: 15px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
