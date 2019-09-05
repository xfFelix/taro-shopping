<template>
  <div class="life-changeS">
  <Header class="navbar" :show-more="true">生活缴费</Header>
    <success-page
      :pathC = pathP
      :pathHomeC = pathHomeP
      :moneyC = moneyP
      :logoIdC = logoIdP
    ></success-page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from 'components/Header'
export default {
  data: () => ({
    pathP:{
      name:'lifeRecord',
      query:0
    }, //要跳转的订单记录页面
    moneyP:undefined,
    pathHomeP:'lifeHome',
    logoIdP:[1,2,3,5]
  }),
  components: {
    Header:()=>import('components/Header'),
    SuccessPage:()=>import('components/SuccessPage')
  },
  methods: {

  },
  mounted(){
    this.moneyP = this.$route.query.price;
  }
}
</script>

<style lang="scss" scoped>
.life-changeS{
  min-height:100%;
  background: #fff;
  .navbar{
    background: #373C48;
    color: #fff;
  }
}

</style>
