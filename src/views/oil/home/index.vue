<template>
  <div class="home">
    <score :rechargeType.sync="rechargeType"></score>
    <price-list :rechargeType="rechargeType"></price-list>
  </div>
</template>

<script>
export default {
  components: {
    Score: () => import('./components/Score'),
    PriceList: () => import('./components/PriceList')
  },
  data: () => ({
    rechargeType: 1 // 充值方式： 1 直充 2 加油卡充值
  })
}
</script>

<style lang="scss" scoped>
.home{
  background: #fff;
}
</style>

