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
  props:{
    moneyP:{
      type:Number
    }
  },
  data(){
    return{
      pathP:{
        name:'phoneRecord',
        query:0
      },//要跳转的订单记录页面
      pathHomeP:'phone',
      logoIdP:[1,3,4,5]
    }
  },
  computed: {
    ...mapGetters({
        phoneConfig: 'phone/getConfig'
    }),
  },
  components: {
    Header:()=>import('components/Header'),
    SuccessSub:()=>import('components/SuccessSub')
  },
  mounted(){
      if(this.phoneConfig.type==1){
        this.pathP.query=1
      }
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
