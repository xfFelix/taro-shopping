<template>
  <div class="cardHome">
    <head-top></head-top>
    <card-select></card-select>
  </div>
</template>
<script>
export default {
  components: {
    CardSelect: () => import('./components/CardSelect'),
    HeadTop:() => import('./components/HeadTop'),
  },

}
</script>

<style lang="scss" scoped>
</style>
