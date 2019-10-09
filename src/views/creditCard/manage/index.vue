<template>
<div class="ccManage">
    <header><i class="cubeic-back back" @click="$router.back()"></i>信用卡管理</header>
    <div class="card-wrap" v-for="(item,index) in cardList" :key="index">
      <div class="card-img" :style="`background-image:url(${item.img})`">
        <div class="item-info">
          <p class="item-bank">{{item.cardBank}}</p>
          <p class="item-num">{{item.cardNum}}</p>
          <p :class="`bank-status bank-status-${item.status}`"></p>
        </div>
      </div>
      <p v-if="item.status==2" class="card-memo">{{item.memo}}</p>
      <div class="card-oper" v-if="item.status==1">
        <p class="card-unbind" @click="unBind(item.id)">解绑</p><span class="divide"></span>
        <p class="card-pay" @click="$router.push({name:'CCHome',query:{id:item.id}})">立即还款</p>
      </div>
      <div class="card-delete" v-else>
          <div class="delete" @click="unBind(item.id)">删除</div>
      </div>
    </div>
    <div class="add-card" @click="$router.push({name:'CCAddCard'})"><span>+</span>&nbsp;添加信用卡</div>
</div>
</template>
<script>
import {allcards,unbindCard} from 'api';
import {mapGetters} from 'vuex';
export default {
    data:()=>({
      cardList:[]
    }),
    computed: {
      ...mapGetters({
        getToken: 'getToken'
      }),
    },
    methods:{
      async allcards(){
        let res = await allcards({token:this.getToken});
        if(res.error_code!=0) return this.$toast(res.message);
        this.cardList = res.data;
        this.cardList.forEach((item)=>{
          item.img = require(`../../../common/images/banks/bank${item.bankId}.png`)
        })
      },
      async unbindCard(id){
        let res = await unbindCard({token:this.getToken,cardId:id});
        if (res.error_code == 0) {
          this.$dialog({content:'解绑成功！'},()=>{
            this.cardList = this.cardList.filter((item)=>{
              return item.id !=id
            })
          })
        }else{
          this.$dialog({content: '解绑失败，请联系客服！'},() => {})
        }
      },
      unBind(id){
        this.$dialog({type: 'confirm',content: '您确定要解绑该信用卡？'},() => {
          this.unbindCard(id)
        })
      }
    },
    mounted(){
      this.allcards()
    }
  }
</script>
<style lang="scss" scoped>
.ccManage {
  background: #FFF;
  min-height: 100%;
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
  .card-wrap{
    background: #fff;
    position: relative;
    border-radius: 4px;
    font-size: 14px;
    width: 318px;
    // height: 130px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    margin: 30px auto;
    .card-memo{
      font-size: 12px;
      border-bottom: 1px solid #efefef;
      padding: 0 2px;
      color: red;
    }
    .card-img{
        height: 90px;
        position: relative;
        color: #fff;
        border-radius: 3px 3px 0 0;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center top;
        .item-info{
          padding: 27px 0 0 66px;
          .item-bank{
            font-size: 14px;
                margin-bottom: 6px;
          }
          .item-num{
            font-size: 18px;
          }
        }
    }
    .card-oper{
      display: flex;
      justify-content: space-between;
      text-align: center;
      color: #333;
      border-radius: 0 0 4px 4px;
      font-size: 14px;
      height: 40px;
      align-items: center;
      .divide{
        width: 1px;
        height: 15px;
        display: inline-block;
        background: #727274 ;
      }
      p{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    }
    .card-delete{
      .delete{
        margin: 0 auto;
        height: 100%;
        line-height: 40px;
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
      }
    }
  }
  .add-card{
    background: #F4F4F4;
    text-align: center;
    color: #9B9B9B;
    font-size: 18px;
    width: 318px;
    margin: 25px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    span{
      font-size: 30px;
    }
  }

.card-img{
  .bank-status {
    position: absolute;
    top: 5px;
    right: 0px;
    height: 23px;
    border-radius: 0px 4px 4px 0;
    display: inline-block;
  }
  .bank-status-0 {
    background: url("../../../common/images/credit_0.png") no-repeat center top;
    background-size: 100%;
    width: 57px;
  }
  .bank-status-1 {
    display: none;
  }
  .bank-status-2 {
    background: url("../../../common/images/credit_2.png") no-repeat center top;
    background-size: 100%;
    width: 186px;
  }
}




}
</style>
