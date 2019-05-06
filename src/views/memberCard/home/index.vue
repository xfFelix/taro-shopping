<template>
  <div class="cardHome">
    <head-top></head-top>
    <card-select></card-select>
  </div>
</template>
<script>
export default {
  components: {
    cardSelect: () => import('./components/cardSelect'),
    headTop:() => import('./components/headTop'),
  },

}
</script>

<style lang="scss" scoped>
</style>
