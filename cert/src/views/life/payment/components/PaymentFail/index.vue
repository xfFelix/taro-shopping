<template>
  <div class="fail" v-if="showFail">
    <div class="wrapper">
      <h1>缴费失败</h1>
      <img src="~common/images/cuowu.png" alt="失败" class="fail-png">
      <p class="text">{{message}}</p>
      <p class="point">缴费信息可以查询纸质账单</p>
      <span class="close" @click="$emit('update:show-fail', false)"><i class="cubeic-wrong"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showFail: false,
    message: {
      type: String,
      default: '您输入的缴费号有误，请重新输入'
    }
  }
}
</script>

<style lang="scss" scoped>
.fail{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.4);
  z-index: 11;
  .wrapper{
    width: 270px;
    height: 400px;
    border-radius: 5px;
    margin: 50px auto;
    color: #fff;
    h1{
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      line-height: 44px;
      border-bottom: 1px solid #fff;
    }
    .fail-png{
      width: 155px;
      height: 100px;
      display: block;
      margin: 40px auto 0;
    }
    .text{
      margin-top: 25px;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
    }
    .point {
      margin-top: 15px;
      font-size: 12px;
      text-align: center;
    }
    .close{
      position: absolute;
      display: block;
      text-align: center;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      i{
        font-size: 40px;
      }
    }
  }
}
</style>
