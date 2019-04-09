<template>
  <div class="detail">
    <Header>订单详情</Header>
    <good></good>
    <certificate></certificate>
    <user></user>
  </div>
</template>

<script>
export default {
  components:{
    'Header': () => import('components/Header'),
    Good: ()=> import('./components/Good'),
    Certificate: ()=> import('./components/Certificate'),
    User: ()=> import('./components/User')
  }
}
</script>

<style lang="scss" scoped>

</style>
