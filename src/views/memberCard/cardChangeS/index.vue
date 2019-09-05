<template>
  <div class="vipS-new">
    <Header class="navbar" :show-more="true">会员卡券</Header>
    <success-page
      :pathC = pathP
      :pathHomeC = pathHomeP
      :moneyC = moneyP
      :logoIdC = logoIdP
    ></success-page>
  </div>
</template>
<script>

export default {
  data(){
    return{
      pathP:{
        name:'cardRecord',
        query:0
      },//要跳转的订单记录页面
      moneyP:undefined,
      pathHomeP:'memberCard',
      logoIdP:[1,2,3,4]
    }
  },
  methods: {
    vipCostInfo() {
      let infoList = JSON.parse(localStorage.getItem("vipInfoS"));
      this.moneyP = infoList.total;
    },
  },
  components: {
    Header:()=>import('components/Header'),
    SuccessPage:()=>import('components/SuccessPage')
  },
  mounted(){
    this.vipCostInfo()
  }
}
</script>

<style lang="scss" scoped>

.vipS-new{
  min-height:100%;
  background: #fff;
  .navbar{
    background: #373C48;
    color: #fff;
  }

}


</style>
