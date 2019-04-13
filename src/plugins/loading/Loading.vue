<template>
  <transition name="fade">
    <div class="loading" v-show="show">
      <cube-loading :size="size" class="cube-load"></cube-loading>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    size:{
      type: Number,
      default: 48
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loading{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .cube-load{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 101;
  }
}
</style>

