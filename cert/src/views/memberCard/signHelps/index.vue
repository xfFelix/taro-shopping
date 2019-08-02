<template>
  <div id="signHelpS">
    <img src="~common/images/chenggong.png" alt="wu" class="img-success" />
    <p class="sign-success-word">恭喜您签约成功！</p>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  components: {
  }
};
</script>
<style lang="scss" scoped>
#signHelpS {
  min-height: 100%;
  background: #fff;
  .img-success {
    width: 68px;
    height: 68px;
    margin: 0 auto;
    padding-top: 91px;
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
