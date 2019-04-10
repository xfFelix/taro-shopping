<template>
  <div class="settlement">
    <Header>门票预订</Header>
    <good></good>
    <user></user>
    <expense></expense>
    <div class="footer">
      <div class="total">合计: <strong class="price-color">6201.25</strong></div>
      <div class="submit">提交订单</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'Header' : () => import('components/Header'),
    Good: () => import('./components/Good'),
    User: () => import('./components/User'),
    Expense: () => import('./components/Expense')
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
        font-size: 19px;
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

