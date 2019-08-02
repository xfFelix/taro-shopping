<template>
  <div class="order">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    console.log('this is order 路由')
  }
}
</script>

<style>
.order{
  height: 100%;
  font-size: 14px;
}
</style>
