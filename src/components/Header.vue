<template>
  <header>
    <h1><slot></slot></h1>
    <i class="cubeic-back" v-if="showBack" @click="goBack"></i>
  </header>
</template>

<script>
export default {
  props:{
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack() {
      let route = this.$route
      if (route.path === '/order/list') {
        return this.$router.push('/')
      }
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
header{
  position: relative;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
  // box-shadow: 0 1px 6px #ccc;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  color: #000;
  z-index: 5;
  h1{
    font-size: 16px;
    font-weight: 700;
  }
  .cubeic-back{
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 15px;
    &::before{
      font-size: 18px;
    }
  }
}
</style>
