<template>
  <transition name="slideUp" mode="out-in">
    <ul class="type" v-if="show">
      <li class="header">
        <i class="cubeic-back" @click="$emit('init-show')"></i>
        <span class="title">选择加油卡类型</span>
      </li>
      <li class="item" v-for="item of typeList" :key="item.value" @click="handerShowInfo(item.value)">
        {{item.label}}
      </li>
    </ul>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props:{
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      typeList: 'oil/getTypeList'
    })
  },
  methods: {
    handerShowInfo(val) {
      if (val === 2) {
        return this.$toast('中石油未开通')
      }
      this.$store.dispatch('oil/setConfig', {type: val})
      this.$emit('handler-show-info')
    }
  }
}
</script>

<style lang="scss" scoped>
.type{
  position: fixed;
  z-index: 11;
  background: #fff;
  padding: 0 18px;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  width: 100%;
  .header{
    padding: 22px 0 23px 0;
    color: #000;
    font-size: 15px;
    position: relative;
    text-align: center;
    i{
      position: absolute;
      left: 0;
    }
  }
  .item{
    padding: 18px 0;
    font-size: 13px;
    text-align: center;
    color: #000;
    position: relative;
    &::before{
      width: 100%;
      height: 1px;
      content: '';
      display: block;
      background: #DEDEDE;
      position: absolute;
      top: 0;
    }
  }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .type{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
