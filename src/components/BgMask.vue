<template>
  <div v-if="open" class="mask" @click="$emit('click', false)" :style="{'background-color':color}"></div>
</template>

<script>
export default {
  name: 'BgMask',
  model: {
    prop: 'open',
    event: 'click'
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'rgba(0,0,0,0.6)'
    }
  }
}
</script>

<style>
.mask{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0,0,0,0.6); */
  z-index: 10;
}
</style>
<style>
@media screen and (min-width: 600px){
  .mask{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
