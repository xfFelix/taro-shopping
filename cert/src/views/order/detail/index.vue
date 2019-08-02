<template>
  <div class="detail">
    <Header>订单详情</Header>
    <good :data="data"></good>
    <certificate :data="data"></certificate>
    <user :data="data"></user>
  </div>
</template>

<script>
import {getOrderDetail} from 'api'
import {mapGetters} from 'vuex'
export default {
  components:{
    'Header': () => import('components/Header'),
    Good: ()=> import('./components/Good'),
    Certificate: ()=> import('./components/Certificate'),
    User: ()=> import('./components/User')
  },
  data: () => ({
    id: '',
    data: {}
  }),
  created () {
    this.getDetail()
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken'
    })
  },
  methods: {
    async getDetail() {
      this.id = this.$route.query.id
      let data = await getOrderDetail({token: this.getToken, id: this.id})
      if (data.code !== '1') return this.$toast(data.message)
      this.data = data.data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
