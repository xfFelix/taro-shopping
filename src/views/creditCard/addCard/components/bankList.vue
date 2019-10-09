<template>
  <div class="bankList" v-if="show">
    <div class="head-wrap">
      <header><i class="cubeic-back back" @click="$emit('hand-init',false)"></i>选择银行</header>
      <div class="search-inp">
        <i class="cubeic-search"></i><input type="input" placeholder="查找银行" v-model="bankInp"/>
      </div>
    </div>

      <ul>
        <li v-for="(item,index) in filterList" :key="index" @click="selectBank(item,index)">
          {{item.name}}
          <span class="cubeic-ok" v-if="selectIndex==index"></span>
        </li>
      </ul>

  </div>
</template>
<script>
  export default {
    props:{
      show:{
        type:Boolean,
        default:false
      },
      cardBankC:{
        type:String
      }
    },
      data:()=>({
        banks: [
            {
                id: '1',
                name: '中国工商银行',
            }
            , {
                id: '2',
                name: '中国农业银行',
            }
            , {
                id: '3',
                name: '中国建设银行',
            }
            , {
                id: '4',
                name: '中国银行',
            }
            , {
                id: '5',
                name: '中国交通银行',
            }
            , {
                id: '6',
                name: '招商银行',
            }
            , {
                id: '7',
                name: '中信银行',
            }
            , {
                id: '8',
                name: '浦发银行',
            }
            , {
                id: '9',
                name: '民生银行',
            }
            , {
                id: '10',
                name: '光大银行',
            }
            , {
                id: '11',
                name: '广发银行',
            }
            , {
                id: '12',
                name: '兴业银行',
            }
            , {
                id: '13',
                name: '华夏银行',
            }
            , {
                id: '14',
                name: '上海银行',
            }
            , {
                id: '15',
                name: '北京银行',
            }
            , {
                id: '17',
                name: '平安银行',
            }, {
                id: '20',
                name: '广州银行',
            }, {
                id: '23',
                name: '邮政储蓄银行',
            }
        ],
        selectIndex:0,
        bankInp:'',
        timeInp:null,
        filterList:[]
      }),
      watch:{
        bankInp(val){
          if(val){
            window.clearTimeout(this.timeInp)
            this.timeInp=window.setTimeout(()=>{
              this.filterList =this.banks.filter((item)=>{
                  return item.name.includes(val)
              })
            },800)
          }else{
            this.filterList=this.banks;
          }
        },
        cardBankC(val){
          if(val){
            for(let i=0;i<this.banks.length;i++){
              if (this.banks[i].name.indexOf(val) >= 0){
                this.$emit('bank-name',this.banks[i]);
              }
            }
          }
        }
      },
      methods:{
        selectBank(item,index){
          this.selectIndex = index;
          this.$emit('bank-name',item);
          this.$emit('hand-init',false);
        }
      },
      mounted(){
        this.filterList = this.banks;
        console.log(this.cardBankC)
      }
  }
</script>
<style lang="scss" scoped>
.bankList {
  background: #FFF;
  min-height: 100%;
  .head-wrap{
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
  }
  header{
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
    background: #373C48;
    font-size: 18px;
    color: #fff;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 0.4rem;
      font-size: 18px;
    }
  }
  .search-inp{
    padding: 0 15px;
    box-sizing: border-box;
    border-radius: 8px;
    color: #000;
    font-size: 17px;
    font-weight: normal;
    background-color: #e8e8ea;
    margin: 10px auto;
    line-height: 44px;
    height: 44px;
    width: 92%;
    display: flex;
    input{
        background-color: #e8e8ea;
        width: 100%;
        height: 100%;
        flex: 1;
        margin-left: 5px;
    }
  }
  ul{
    //  border-top: 1px solid #ccc;
     padding-top: 98px;
    li{
      line-height: 44px;
      font-size: 14px;
      padding: 0 15px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .head-wrap{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
