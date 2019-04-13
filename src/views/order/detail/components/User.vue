<template>
  <ul class="main">
    <li class="item">
      <span class="label">取票人</span>
      <span class="value">{{data.name}}</span>
    </li>
    <li class="item">
      <span class="label">证件号码</span>
      <span class="value">{{data.idNum}}</span>
    </li>
    <li class="item">
      <span class="label">支付时间</span>
      <span class="value">{{data.orderTime}}</span>
    </li>
    <li class="item">
      <span class="label">订单号</span>
      <span class="value">{{data.idUrl}}</span>
    </li>
    <li class="item">
      <span class="label">数量</span>
      <span class="value">{{data.cardBank}}</span>
    </li>
    <li class="item">
      <span class="label">总票价</span>
      <span class="value">{{amount | toPrice}}</span>
    </li>
    <li class="item">
      <span class="label">税费</span>
      <span class="value">{{data.taxFee| toPrice}}</span>
    </li>
    <li class="item">
      <span class="label">服务费</span>
      <span class="value">{{data.serviceFee | toDecimal2Fp}}.{{data.serviceFee | toDecimal2Ap}}</span>
    </li>
    <li class="item">
      <span class="label">合计</span>
      <span class="value price-color">{{data.totalAmount | toPrice}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props:{
    data:{
      type: Object,
      required: true
    }
  },
  computed: {
    amount () {
      return this.data.repaymentAmount * this.data.cardBank
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  background-color: #fff;
  margin-top: 10px;
  padding: 8px 25px;
  .item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    .label{
      color: #000;
      font-weight: 700;
    }
  }
}
</style>

