<template>
  <transition mode="out-in" name="fadeIn">
    <div class="success-wrapper" v-if="show">
      <div class="icon">
        <i class="cubeic-ok"></i>
      </div>
      <span class="text">提交成功</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(val) {
      if (val) {
        let time = 3
        const timeout = window.setInterval(() => {
          time--
          if (time < 1) {
            window.clearInterval(timeout)
            this.$router.push('/oil')
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.success-wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 263px;
  background: #fff;
  z-index: 11;
  text-align: center;
  height: 148px;
  border-radius: 5px; /*no*/
  .icon{
    padding-top: 39px;
    .cubeic-ok{
      border-radius: 50%;
      border: 2px solid #4A4A4A;
      font-size: 28px;
      position: relative;
      &::after{
        content: '';
        display: block;
        width: 8px;
        height: 5px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 5px; /*no*/
      }
    }
  }
  .text{
    display: block;
    margin-top: 22px;
    font-size: 15px;
  }
}
</style>
