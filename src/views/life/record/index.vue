<template>
  <div class="life-record">
    <Header class="navbar" :show-more="true">兑换记录</Header>

  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  computed: {

  },
  methods: {

  },
  components: {
    Header: () => import('@/components/Header'),
  }
}
</script>

<style lang="scss" scoped>
.life-record {
  .navbar {
    background: #373C48;
    color: #fff;
  }
}
</style>
