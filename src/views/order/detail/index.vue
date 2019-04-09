<template>
  <div class="detail">
    <Header title="订单详情"></Header>
    <good></good>
  </div>
</template>

<script>
export default {
  components:{
    'Header': () => import('components/Header'),
    Good: ()=> import('./components/Good')
  }
}
</script>

<style lang="scss" scoped>

</style>
