<template>
  <div class="vipS-new">
    <Header class="navbar" :show-more="true">加油卡充值</Header>
    <success-page
      :pathC = pathP
      :pathHomeC = pathHomeP
      :moneyC = moneyP
      :logoIdC = logoIdP
    ></success-page>
  </div>
</template>
<script>
import {getOilOrderDetail} from 'api';
import { mapGetters } from 'vuex';
import {isEmpty} from 'util/common';

export default {
  data(){
    return{
      pathP:{
        name:'oilRecord',
        query:2
      }, //要跳转的订单记录页面
      moneyP:undefined,
      pathHomeP:'oil',
      logoIdP:[1,2,4,5]
    }
  },
  computed: {
    ...mapGetters({
      token: 'getToken'
    })
  },
  methods: {
    async getDetail() {
        if (isEmpty(this.$route.query)) return this.$toast('id is null')
        let res = await getOilOrderDetail({token: this.token, id: this.$route.query.id})
        if (res.code !== '1') return this.$toast(res.message)
        this.moneyP = res.data.totalAmount;
        this.pathP.query = res.data.cardId;
      },
  },
  components: {
    Header:()=>import('components/Header'),
    SuccessPage:()=>import('components/SuccessPage')
  },
  mounted(){
    this.getDetail()
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
