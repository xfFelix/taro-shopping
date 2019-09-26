<template>
  <div class="gold-Info">
    <div class="goldC-banner">
      <ul class="goldC-select">
        <li
          v-for="(item,index) in goldType"
          :key="index"
          :class="gtId==index?'goldC-active':''"
          @click="selectType(index)"
          :style="item.show?'':'display:none'"
        >{{item.name}}</li>
      </ul>

      <ul class="goldC-compare">
        <li class="goldC-goldPrice">
          <p class="goldC-price-name">{{gtId==0?'今日金条价：':'今日金砂价：'}}</p>
          <p>
            <span class="goldPrice">{{goldPrice|toPrice}}</span>
            <span class="goldC-ratio">元/克</span>
          </p>
        </li>
      </ul>

      <div class="goldC-buy">
        <span class="logoGreen iconImg"></span>
        <input
          type="number"
          :placeholder="gtId==0?'1根起购，仅限整数':'1颗起购，仅限整数'"
          class="goldC-input"
          :value="inpPrice"
          @input="$emit('input', $event.target.value)"
        />
        <span class="goldC-unit">{{gtId==0?'根':'颗'}}</span>
        <span class="goldC-explain">{{gtId==0?'(1根=10克)':'(1颗=0.2克)'}}</span>
      </div>
    </div>

    <div class="goldC-score-goRecode">
      <div class="goldC-score">
        <span>椰子分余额：</span> <span class="score">{{userinfo.score}}</span>
      </div>
       <span @click="$router.push({name:'goldRecord',query:{cardId:gtId}})">兑换记录 ></span>
    </div>

    <ul class="goldC-msg">
      <li>金条价格<span>{{taxInfo.amount|toPrice}}</span></li>
      <li>服务费<span>{{taxInfo.service_fee|toPrice}}</span></li>
      <li>税费<span>{{taxInfo.tax_total|toPrice}}</span></li>
      <li>合计<span>{{taxInfo.total|toPrice}}</span></li>
    </ul>
  </div>
</template>
<script>
import { goldPrice,goldTax } from "api";
import { mapGetters,mapActions} from 'vuex';
export default {
  model: {
    prop: 'inpPrice',
    event: 'input'
  },
  props: {
    inpPrice: String
  },
  data: () => ({
    goldType: [
      {
        id: 0,
        name: "金条",
        show:true
      },
      {
        id: 1,
        name: "金砂",
        show:true
      }
    ],
    gtId: 0,
    goldPrice:undefined,
    taxInfo:{},
    timeInp:null,
    totalMoney:0,
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      userinfo: 'getUserinfo'
    }),
    type: {
      get() {
        return this.$store.state.gold.config.type
      },
      set(val) {
        return this.$store.dispatch('gold/setConfig',{type: val})
      }
    },
    barPrice:{
      get() {
        return this.$store.state.gold.config.barPrice
      },
      set(val) {
        return this.$store.dispatch('gold/setConfig',{barPrice: val})
      }
    },
    sandPrice:{
      get() {
        return this.$store.state.gold.config.sandPrice
      },
      set(val) {
        return this.$store.dispatch('gold/setConfig',{sandPrice: val})
      }
    }
  },
  watch:{
    inpPrice(val){
      if(val){
        window.clearTimeout(this.timeInp)
        this.timeInp=window.setTimeout(()=>{
          this.getTax(val);
        },500)
      }else{
        this.getTax(0);
      }
    },
    totalMoney(val){
      this.$emit('total-money',val)
    }
  },
  methods: {
    ...mapActions({
      setConfig: 'gold/setConfig'
    }),
    selectType(index) {
      this.gtId = index;
      this.getTax(0);
      this.getPrice();
      this.type=index;
      this.$emit('inp-Clean')
    },
    async getPrice() {
      let res = await goldPrice({ id: this.gtId });
      if(res.error_code!=0) return this.$toast(res.message);
      this.goldPrice = res.data.goldPrice;
      if(this.gtId==0){
          this.barPrice = this.goldPrice;
      }else{
          this.sandPrice = this.goldPrice;
      }
    },
     async getTax(val) {
      let res = await goldTax({ amount: val,id: this.gtId,token: this.getToken});
      if(res.error_code!=0) return this.$toast(res.message);
      this.taxInfo = res.data;
      this.totalMoney = res.data.total
    },
    vipCustom(){  //赢球帝
      if(this.userinfo.vendorId == 'yingqiudi'){
        this.goldType[1].show = false;
      }
    }
  },
  mounted(){
    this.getPrice();
    this.vipCustom()
  }
};
</script>
<style lang="scss" scoped>
.goldC-banner {
  background: #313340;
  border: 1px solid #313340;
  position: relative;
  padding: 44px 0 65px 0;
  .goldC-select {
    width: 88%;
    display: flex;
    margin: 0 auto;
    color: #fff;
    border: 1px solid #30ce84;
    margin-top: 0.5rem;
    border-radius: 40px;
    li {
      width: 50%;
      text-align: center;
      font-size: 15px;
      color: #30ce84;
      border-radius: 40px;
      padding: 10px 0;
    }
    .goldC-active {
      background: #30ce84;
      color: #fff;
    }
  }
}

.goldC-compare {
  width: 85%;
  color: #fff;
  margin: 0 auto;
  margin-top: 30px;
  .goldC-goldPrice {
    font-size: 14px;
    display: block;
    p {
      .goldPrice {
        font-size: 34px;
      }
      &:first-of-type {
        color: #ffffff;
        margin: 18px 0 10px 0;
        span {
          border: 1px solid;
          width: 12px;
          line-height: 12px;
          border-radius: 50%;
          display: inline-block;
          margin-top: 2px;
          margin-left: 4px;
        }
      }
      &:last-of-type {
        color: #30ce84;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.goldC-buy {
  width: 92%;
  margin: 0 auto;
  height: 60px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background: #fff;
  display: flex;
  line-height: 60px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -26px;
  border-radius: 5px;
  padding: 0 13px;
  align-items: center;
  box-sizing: border-box;


  .goldC-unit{
    font-size: 16px;
  }
  .goldC-explain{
    transform: scale(0.8);
    color: #999999;
    margin-top: 5px;
  }
}
.goldC-score-goRecode {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 52px 14px 0 14px;
  padding-bottom: 23px;
  color: #4a4a4a;
  font-size: 14px;
  .goldC-goRecode {
    text-align: center;
  }
  .score{
    color:#30ce84;
  }
   a {
      color: #666;
    }
}
.goldC-msg {
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  margin: 0.2rem;
  li {
    display: flex;
    justify-content: space-between;
    line-height: 55px;
    padding: 0 5px;
    margin: 0 10px;
    color: #4a4a4a;
    font-size: 14px;
  }
}
</style>
