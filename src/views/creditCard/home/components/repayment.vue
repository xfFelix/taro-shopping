<template>
  <div class="repayment">
    <div class="slide-wrap">
      <cube-slide ref="slide" :data="cardsList" @change="changePage"  :auto-play="false" class="cubeSlide" :loop="false" :showDots="false"  :initial-index="initialIndex" :refreshResetCurrent='false'>
        <cube-slide-item v-for="(item, index) in cardsList" :key="index" @click.native="clickHandler(item, index)" class="cubeSlideItem">
          <div @click="$router.push({name:'CCUnbind',query:{_bank:item.id}})" class="jump-card">
            <img :src="item.img">
            <div class="item-card">
               <p class="item-bank">{{item.cardBank}}</p>
               <p class="item-num">{{item.cardNum}}</p>
            </div>
          </div>
        </cube-slide-item>
      </cube-slide>
      <div class="addCard" @click="$router.push({path:'/creditCard/manage'})">{{cardsList.length>0?'信用卡管理':'+ 添加信用卡'}}</div>
      <div class="pay-input">
        <span class="logoGreen iconImg"></span>
        <input type="number" name="amount" placeholder="请输入还款金额"  min="1"  @input="$emit('input', $event.target.value)" :value="taxPrice">
      </div>
    </div>

      <div class="card-info">
        <div class="quotaWarp">
          <p>椰子分余额：<span class="score">{{userinfo.score}}</span></p>
          <p @click="$router.push({path:'/creditCard/record'})">还款记录 ></p>
        </div>
        <ul class="tax-info">
          <li><span>服务费</span>{{taxInfo.service_fee|toPrice}}</li>
          <li><span>税费</span> {{taxInfo.tax_total|toPrice}}</li>
          <li><span>合计</span>{{taxInfo.total|toPrice}}</li>
        </ul>
      </div>
  </div>

</template>
<script>
import {mapGetters} from 'vuex';
import {cards,cardTax} from 'api';
export default {
    model: {
      prop: 'taxPrice',
      event: 'input'
    },
    props: {
      taxPrice: String
    },
    data:()=>({
      checked:true,
      cardsList:[],
      timeInp:null,
      taxInfo:{},
      initialIndex:0,
      total:0
    }),
    computed: {
      ...mapGetters({
        getToken: 'getToken',
        userinfo: 'getUserinfo'
      }),
    },
    watch:{
      taxPrice(val){
        if(val){
          window.clearTimeout(this.timeInp)
          this.timeInp=window.setTimeout(()=>{
            this.cardTax(val);
          },800)
        }else{
          this.cardTax(0);
        }
      },
      total(val){
        this.$emit('total-money',val)
      }
    },
    methods:{
      changePage(current) {
        this.$emit('current-card',this.cardsList[current].id);
      },
      clickHandler(item, index) {
        // console.log(item, index)
      },
      async cards(){
        let res = await cards({token:this.getToken});
        if(res.error_code!=0) return this.$toast(res.message);
        this.cardsList = res.data;
        if(!this.cardsList) return false;
        this.cardsList.forEach((item)=>{
          item.img = require(`../../../../common/images/banks/bank${item.bankId}.png`)
        })
        this.$emit('current-card',this.cardsList[0].id);
        this.$nextTick(()=>{
          for(let i=0;i<this.cardsList.length;i++){
            if(this.cardsList[i].id == this.$route.query.id){
                this.initialIndex = i;
                break;
            }
          }
        })
      },
      async cardTax(val){
         let res = await cardTax({token:this.getToken,amount:val});
         if(res.error_code!=0) return this.$toast(res.message);
         this.taxInfo = res.data;
         this.total = res.data.total;
      },
    },
    mounted(){
      this.cards();
    }
  }
</script>
<style lang="scss" scoped>
.repayment{
      overflow: hidden;
}
.slide-wrap{
    background: #313340;
    position: relative;
    padding: 62px 0 60px 0;
    text-align: center;
    // overflow-x: hidden;
    .addCard{
      color: #727274;
      border: 1px solid #727274;
      margin:28px auto 5px auto;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      border-radius: 30px;
      padding: 0px 20px;
      display: inline-block;
    }
    .pay-input {
      height: 60px;
      background: #fff;
      box-shadow:0px 1px 10px 0px rgba(55,60,72,0.25);
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      position: absolute;
      bottom: -30px;
      width: 88%;
      left: 0;
      right: 0;
      margin: 0 auto;
        box-shadow: 0px 1px 10px 0px rgba(55, 60, 72, 0.25);
    }
}
.cubeSlide{
  width: 310px;
  margin: 0 auto;
  overflow: visible;
  height: 126px;
  .cubeSlideItem{
    padding: 0 10px;
    .jump-card{
      position: relative;
      position: relative;
      color: #fff;
      .item-card{
          position: absolute;
          top: 0;
          text-align: left;
          top: 24px;
          text-align: left;
          left: 60px;
        .item-num{
          font-size: 18px;
              margin-top: 8px;
        }
        .item-bank{
          font-size: 14px;
        }
      }
    }
  }
}

.card-info{
    padding: 0 15px;
    color: #4A4A4A;
  .quotaWarp{
    display: flex;
    justify-content: space-between;
    padding: 50px 0 25px 0;
    border-bottom: 1px solid #DEDEDE;
    font-size: 14px;
    .score{
      color: #30CE84;
    }
  }
  .tax-info{
    line-height: 40px;
    padding: 10px 5px;
    border-bottom: 1px solid #DEDEDE;
    li{
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }
}









</style>
<style>
@media screen and (min-width: 600px) {
  .repayment{
    max-width: 384px; /*no*/
    overflow: hidden;
  }
}
</style>


