<template>
  <header>
    <h1><slot></slot></h1>
    <i class="cubeic-back" v-if="showBack" @click="goBack"></i>
    <i class="iconfont icon-gengduo-copy" v-if="showMore" @click="toggleFlag = !toggleFlag"></i>
    <HeadTab v-show="toggleFlag" class="header-tab"/>
  </header>
</template>

<script>
export default {
  components: {
    HeadTab: () => import(/* webpackPrefetch: true */ './HeadTab')
  },
  data: () => ({
    toggleFlag: false
  }),
  props:{
    showBack: {
      type: Boolean,
      default: true
    },
    showMore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
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
  color: #fff;
  h1{
    font-size: 16px;
    background: rgba(0,0,0);
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
  .icon-gengduo-copy{
    position: absolute;
    top: 0;
    right: 6px;
    font-size: 28px;
  }
  .header-tab{
    line-height: 1;
    top: 44px;
    right: 2px;
  }
}
</style>
