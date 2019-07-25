<template>
  <div id="signHelpS">
    <div class="navbar">
      <i class="cubeic-back" @click="$router.back()"></i>
      <h1>签约助手</h1>
    </div>
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
    position: relative;
    text-align: center;
    line-height: 44px;
    background: #000;
    color: #fff;
    font-family: PingFang-SC-Regular;
    background: #373C48;
    h1 {
      font-size: 18px;
    }
    .cubeic-back {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 15px;
      &::before {
        font-size: 18px;
      }
    }
  }
  .img-success {
    width: 68px;
    height: 68px;
    margin: 91px auto 0;
  }
  .sign-success-word {
    font-family: PingFang-SC-Medium;
    color: #4e4e4e;
    text-align: center;
    font-size: 0.56rem;
    font-weight: bold;
    margin-top: 27px;
  }
}
</style>
