<template>
  <div class="vipS-new" v-if="show">
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
    props: {
      show: {
          type: Boolean,
          default: false
      },
      totalAmount:{
        type:Number
      }
  },
  data(){
    return{
      pathP:{
        name:'CCRecord',
        query:0
      },//要跳转的订单记录页面
      moneyP:undefined,
      pathHomeP:'creditCard',
      logoIdP:[1,2,3,5]
    }
  },
  watch:{
    totalAmount(val){
      console.log(val)
       this.moneyP =val;
    }
  },
  computed:{

  },
  methods: {

  },
  components: {
    Header:()=>import('components/Header'),
    SuccessSub:()=>import('components/SuccessSub')
  },
  mounted(){


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
