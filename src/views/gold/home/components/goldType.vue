<template>
  <div class="gold-type" ref="detailTop" >

    <ul class="gold-select" :class="fixedTop==1?'fixedP':''">
      <li v-for="(item,index) in detail" :key="index" @click="detailClick(index)" :class="selectIndex==index?'active':''">{{item.name}}</li>
    </ul>
    <div class="liHight" v-if="fixedTop==1"></div>
    <ul v-show="goldType.type==0">
      <li v-show="selectIndex==0">
        <img src="../../../../common/images/gold/bar-01-01.jpg" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-02.jpg" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-03.jpg" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-04.jpg" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-05.jpg" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-06.jpg" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-07.jpg" alt="金条" width="100%" />
      </li>
      <li v-show="selectIndex==1">
        <img src="../../../../common/images/gold/bar-02.png" alt="金条" width="100%" />
      </li>
      <li v-show="selectIndex==2">
        <img src="../../../../common/images/gold/bar-03.png" alt="金条" width="100%" />
      </li>
      <li v-show="selectIndex==3">
        <img src="../../../../common/images/gold/bar-04.png" alt="金条" width="100%" />
      </li>
    </ul>

   <ul v-show="goldType.type==1">
      <li v-show="selectIndex==0">
         <img src="../../../../common/images/gold/sand-01-01.jpg" alt="金砂" width="100%" />
        <img src="../../../../common/images/gold/sand-01-02.jpg" alt="金砂" width="100%" />
        <img src="../../../../common/images/gold/sand-01-03.jpg" alt="金砂" width="100%" />
        <img src="../../../../common/images/gold/sand-01-04.jpg" alt="金砂" width="100%" />
      </li>
      <li v-show="selectIndex==1"> <img src="../../../../common/images/gold/sand-02.png" alt="金砂" width="100%" /></li>
      <li v-show="selectIndex==2"><img src="../../../../common/images/gold/sand-03.png" alt="金砂" width="100%" /></li>
      <li v-show="selectIndex==3"><img src="../../../../common/images/gold/sand-04.png" alt="金砂" width="100%" /></li>
    </ul>
    <div ref="headTop" class="headTop"></div>
  </div>
</template>
<script>
import { mapGetters} from 'vuex';
export default {
  data: () => ({
    detail: [
      {
        name: "产品介绍"
      },
      {
        name: "回购须知"
      },
      {
        name: "检测报告"
      },
      {
        name: "常见问题"
      }
    ],
    selectIndex:0,
    gtId:0,
    fixedTop:0
  }),
  computed: {
     ...mapGetters({
      goldType: 'gold/getConfig',
    })
  },
  methods:{
    detailClick(index){
      this.selectIndex = index;
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let detailTop = this.$refs.detailTop.offsetTop;
      let detailPosit = detailTop - scrollTop;
      let headTop = window.getComputedStyle(this.$refs.headTop).height.substring(0,2);
      if(detailPosit<headTop){
        this.fixedTop=1
      }else{
         this.fixedTop=0
      }
    }
  },
  mounted(){
      window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>
<style lang="scss" scoped>
.headTop{
  height: 44px;
  background: #fff;
}
.gold-type {
  background: #f4f4f4;
  position: relative;
  margin-top: 15px;
  width: 100%;
  box-sizing: border-box;
  .gold-select{
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    box-sizing: border-box;
    li {
      line-height: 29px;
      color: #999999;
      padding: 8px 0;
      font-size: 12px;
    }
  }
}
.active {
  border-bottom: 2px solid #32cf85;
}
.fixedP{
  top: 44px;
  z-index: 1;
  width: 100%;
  background: #F4F4F4;
  position: fixed;
}
.liHight{
  height: 44px;
}
</style>
<style>
@media screen and (min-width: 600px) {
  .fixedP{
    max-width: 384px; /*no*/
  }
}
</style>
