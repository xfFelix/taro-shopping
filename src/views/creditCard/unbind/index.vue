<template>
<div class="ccUnbind">
  <header><i class="cubeic-back back" @click="$router.back()"></i>解绑信用卡</header>
  <div class="card-wrap">
    <div class="jump-card">
      <img :src="unbindInfo.img">
      <div class="item-card">
          <p class="item-bank">{{unbindInfo.cardBank}}</p>
          <p class="item-num">{{unbindInfo.cardNum}}</p>
      </div>
    </div>
  </div>

  <p class="unbindBnt" @click="unBind()">解除绑定</p>
</div>
</template>
<script>
import {cardInfo,unbindCard} from 'api';
import {mapGetters} from 'vuex';
export default {
    data:()=>({
      unbindInfo:{}
    }),
    computed: {
      ...mapGetters({
        getToken: 'getToken',
        userinfo: 'getUserinfo'
      }),
    },
    methods:{
      async cardInfo(){
        let res = await cardInfo({token:this.getToken,id:this.$route.query._bank});
         if (res.error_code != 0)  return this.$toast(res.message);
          this.unbindInfo =res.data[0];
          let img = {img:require(`../../../common/images/banks/bank${res.data[0].bankId}.png`)}
          this.unbindInfo = Object.assign(this.unbindInfo,img);
      },
      async unbindCard(){
        let res = await unbindCard({token:this.getToken,cardId:this.$route.query._bank});
        if (res.error_code == 0){
          this.$dialog({content: '解绑成功！'},() => {
            this.$router.push({name:'CCHome'});
          })
        }else{
            this.$dialog({content: '解绑失败，请联系客服！'},() => {})
        }
      },
      unBind(){
        this.$dialog({type: 'confirm',content: '您确定要解绑该信用卡？'},() => {
          this.unbindCard()
        })
      }
    },
    created(){
      this.cardInfo()
    }
  }
</script>
<style lang="scss" scoped>
.ccUnbind {
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
  .unbindBnt{
    width: 92%;
    margin: 63px auto;
    background: #373C48;
    line-height: 44px;
    border-radius: 5px;
    color: #fff;
    font-size: 15px;
    text-align: center;
    border: none;
    display: block;
  }
}
.card-wrap{
  background: #373C48;
  padding:30px 0 44px 0;
    .jump-card{
      position: relative;
      color: #fff;
      width: 290px;
      margin: 0 auto;
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

</style>
