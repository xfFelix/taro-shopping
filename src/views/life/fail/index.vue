<template>
  <div class="fail">
    <Header class="navbar" :show-more="true">缴费失败</Header>
    <img src="~common/images/cuowu.png" alt="失败" class="fail-png">
    <p class="text">您输入的缴费号有误,请重新输入</p>
    <p class="point">缴费信息可以查询纸质账单</p>
  </div>
</template>

<script>
import Header from 'components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
.fail{
  .navbar{
    background: #000;
    color: #fff;
  }
  .fail-png{
    width: 155px;
    height: 100px;
    display: block;
    margin: 74px auto 0;
  }
  .text{
    margin-top: 25px;
    color: #333;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
  }
  .point {
    margin-top: 15px;
    color: #999;
    font-size: 12px;
    text-align: center;
  }
}
</style>
