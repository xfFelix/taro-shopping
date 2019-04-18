<template>
  <div class="main">
    <h1 class="border-bottom-1px"><i class="iconfont icon-shangpinxiangqing"></i>费用详情</h1>
    <ul>
      <li class="item">
        <span class="label">门票总额</span>
        <span class="value">{{data.amount | toPrice}}</span>
      </li>
      <li class="item">
        <span class="label">服务费</span>
        <span class="value">{{data.service_fee| toPrice}}</span>
      </li>
      <li class="item">
        <span class="label">税费</span>
        <span class="value">{{data.tax_total | toPrice}}</span>
      </li>
      <li class="item">
        <span class="label">余额</span>
        <span class="value">{{userinfo.score | toPrice}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props:{
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo'
    })
  }
}
</script>

<style lang="scss" scoped>
.main{
  background-color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 10px;
  h1{
    font-size: 16px;
    font-weight: 700;
    padding: 10px 0;
    .iconfont{
      margin-right: 5px;
      &::before{
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  ul{
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      .label{
        color: #000;
        font-weight: 600;
      }
    }
  }
}
</style>

