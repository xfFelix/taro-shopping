<template>
  <div class="no-data" v-if="open">
    <img src="~common/images/nothing.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props:{
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    open () {
      if (this.data && this.data.length) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data{
  display: flex;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
  img{
    width: 130px;
    height: 130px;
  }
}
</style>
