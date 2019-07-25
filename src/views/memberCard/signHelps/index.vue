<template>
  <div id="signHelpS">
    <Header class="navbar" :show-more="true">签约助手</Header>
    <img src="~common/images/chenggong.png" alt="wu" class="img-success" />
    <p class="sign-success-word">恭喜您签约成功！</p>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  components: {
    Header: () => import("@/components/Header")
  }
};
</script>
<style lang="scss" scoped>
#signHelpS {
  min-height: 100%;
  background: #fff;
  .navbar {
    background: #373c48;
    color: #fff;
  }
  .img-success {
    width: 68px;
    height: 68px;
    margin: 91px auto 0;
  }
  .sign-success-word{
    font-family: PingFang-SC-Medium;
    color: #4e4e4e;
    text-align: center;
    font-size: 0.56rem;
    font-weight: bold;
    margin-top: 27px;
  }
}
</style>
