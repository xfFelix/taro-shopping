<template>
  <div class="success-wrapper">
    <Header :show-back="false">{{type == 1 ? '认证成功' : '认证失败'}}</Header>
    <div class="img-wrapper">
      <img src="~common/images/chenggong.png" alt=" ">
    </div>
    <p class="title">{{type == 1 ? '您本次的个人认证已通过，点击进行电子合同签章！' : '您本次的个人认证已失败'}}</p>
    <button class="btn-next">立即签约<i v-if="type == 1">（{{time}}S）</i></button>
  </div>
</template>
<script>
import { getParam } from '@/util/common'
export default {
  data: () => ({
    type: 1,
    time: 5
  }),
  created() {
    const result = getParam()['result']
    this.type = result
    if (result == 1) {
      this.getTimeout()
    } else {

    }
  },
  methods: {
    getTimeout() {
      clearInterval(this.timeout)
      this.timeout = setInterval(() => {
        this.time--
        console.log(this.time)
      }, 1000);
    }
  }
}
</script>
<style scoped lang="scss">
.success-wrapper{
  font-family:PingFang SC;
  .img-wrapper{
    img{
      display: block;
      width: 68px;
      height: 68px;
      border: none;
      margin: 91px auto 0;
    }
  }
  .title{
    margin-top: 30px;
    font-size:14px;
    font-weight:bold;
    color:rgba(78,78,78,1);
    text-align: center;
  }
  .btn-next{
    margin-top: 66px;
    width:185px;
    height:40px;
    background:rgba(98,98,98,.3);
    border-radius:5px;
    border: none;
    margin-left: auto;
    margin-right: auto;
    display: block;
    font-size:16px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:15px;
  }
}
</style>
