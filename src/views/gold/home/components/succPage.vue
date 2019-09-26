<template>
  <div class="vipS-new">
    <success-sub
      :pathC = pathP
      :pathHomeC = pathHomeP
      :moneyC = moneyP
      :logoIdC = logoIdP
      v-bind="$attrs" v-on="$listeners"
    ></success-sub>
  </div>
</template>
<script>
import {goldInfo} from 'api';
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      pathP:{
        name:'goldRecord',
        query:0
      },//要跳转的订单记录页面
      moneyP:undefined,
      pathHomeP:'gold',
      logoIdP:[2,3,4,5]
    }
  },
  computed:{
     ...mapGetters({
      getToken: 'getToken',
      goldConfig: 'gold/getConfig'
    }),
  },
  methods: {
    async getGoldInfo(){
      let res = await goldInfo({id:this.goldConfig.id,token:this.getToken});
      if(res.error_code != 0)  return this.$toast(res.message);
      this.moneyP = res.data.totalAmount;
      this.pathP.query = this.goldConfig.type;
    }
  },
  components: {
    Header:()=>import('components/Header'),
    SuccessSub:()=>import('components/SuccessSub')
  },
  mounted(){
    this.getGoldInfo()
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
