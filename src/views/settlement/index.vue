<template>
  <div class="settlement">
    <Header>门票预订</Header>
    <good></good>
    <user></user>
    <expense></expense>
  </div>
</template>

<script>
export default {
  components: {
    'Header' : () => import('components/Header'),
    Good: () => import('./components/Good'),
    User: () => import('./components/User'),
    Expense: () => import('./components/Expense')
  }
}
</script>

<style lang="scss" scoped>
.settlement{
  font-size: 14px;
}
</style>

