<template>
  <div class="success-wrapper">
    <Header :show-back="false">{{$route.meta.title}}</Header>
    <div class="img-wrapper">
      <img src="~common/images/chenggong.png" alt=" ">
    </div>
    <p class="title">恭喜您，已经签约成功！</p>
  </div>
</template>
<script>
export default {

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
    font-size:21px;
    font-weight:bold;
    color:rgba(78,78,78,1);
    text-align: center;
  }
}
</style>
