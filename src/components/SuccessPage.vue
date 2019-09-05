<template>
<div class="vipS-session">
      <div class="vipS-InfoW">
        <p class="vipS-suImg"></p>
        <p class="vipS-word">提交成功！</p>
        <p class="vips-info">
          <span class="vipS-logo"></span>
          <span class="vipS-money">{{moneyC|toPrice}}</span>
        </p>
      </div>
      <div class="vipS-jump">
        <p class="jump-home" @click="goHome()">返回首页</p>
        <p class="jump-order"
           @click="$router.push(pathC.query==0?{name:pathC.name}:{name:pathC.name,query:{cardId:pathC.cardId}})">
           查看订单</p>
      </div>
      <div class="jump-page">
        <p class="jump-more">更多兑换</p>
        <div class="jump-a" v-for="(item,index) in list" :key="index"  :style="logoIdC.indexOf(item.id)!=-1?'dispaly:inline-block':'display:none'">
            <a :href="`${item.path}?token=${getToken}`" v-if="logoIdC.indexOf(item.id)!=-1">
              <img :src="item.jumpLogo" alt="">
              <span class="jump-hot" :style="`background-image:url(${item.smallLogo})`" v-if="item.smallLogo"></span>
              <span class="jump-name">{{item.name}}</span>
            </a>
        </div>
      </div>
      <p class="countDown"><span>{{countDown}}S</span>后自动跳转至充值页</p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  props:{
    pathC:{
      type:Object,
    },
    moneyC:{
      type:Number,
      default:0
    },
    pathHomeC:{
      type:String
    },
    logoIdC:{
      type:Array,
      default:()=>[1,2,3,4]
    }
  },
  data(){
    return{
      countDown:5,
      timer: null,
      list:[
        {
          id:1,
          path:`${process.env.VUE_APP_FRAMWORK_URL}goldChange`,
          jumpLogo:require('../common/images/su-gold.png'),
          smallLogo:require('../common/images/hot.png'),
          name:'黄金兑换',
        },
        {
          id:2,
          path:`${process.env.VUE_APP_FRAMWORK_URL}phoneBill`,
          jumpLogo:require('../common/images/su-tel.png'),
          smallLogo:false,
          name:'话费充值'
        },
        {
          id:3,
          path:`${process.env.VUE_APP_BASE_HOME_URL}/ticket/oil/home`,
          jumpLogo:require('../common/images/su-oil.png'),
          smallLogo:false,
          name:'加油卡充值'
        },
        {
          id:4,
          path:`${process.env.VUE_APP_BASE_HOME_URL}/ticket/life/home`,
          jumpLogo:require('../common/images/su-life.png'),
          smallLogo:require('../common/images/new.png'),
          name:'生活缴费'
        },
        {
          id:5,
          path:`${process.env.VUE_APP_BASE_HOME_URL}/ticket/memberCard/home`,
          jumpLogo:require('../common/images/su-vip.png'),
          smallLogo:false,
          name:'会员卡券'
        }
      ]
    }
  },
    computed: {
    ...mapGetters({
      getToken: 'getToken',
    })
  },
  methods:{
    goHome(){
      window.location.href=`${process.env.VUE_APP_BASE_HOME_URL}?token=${this.getToken}`
    }
  },
  mounted(){
    this.timer = setInterval(() => {
      this.countDown--
      if (this.countDown == 0) {
        clearInterval(this.timer);
        this.$router.push({ name: this.pathHomeC })
      }
    }, 1000)
  },
  components: {
    Header:()=>import('components/Header')
  },
}
</script>
<style lang="scss">
.vipS-session{
    .vipS-InfoW{
    width:345px;
    height:272px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 11px 1px rgba(175,175,175,0.25);
    border-radius:25px;
    margin: 15px auto;
    text-align: center;
    .vipS-logo,.vipS-suImg{
      background-repeat: no-repeat;
      display: inline-block;
      background-size:100% 100%;
    }
    .vipS-suImg{
      width: 57px;
        height: 57px;
        background-image: url('~common/images/chenggong.png');
        margin: 66px 0 13px 0;
    }
    .vips-info{
      margin-top: 27px;
      .vipS-logo{
        width: 16px;
        height: 16px;
        background-image: url('~common/images/logo.png');
        margin-right: 7px;
      }
      .vipS-money{
        color: #4A4A4A;
        font-size: 24px;
      }
    }
    .vipS-word{
      color: #666666;
      font-size:14px;
    }
  }
  .vipS-jump{
    text-align: center;
    margin: 41px 0 54px 0;
    .jump-home,.jump-order{
      border-radius:5px;
      padding: 15px 35px;
      border:1px solid rgba(48,206,132,1);
      font-size: 15px;
      display: inline-block;
    }
    .jump-home{
      color: #30CE84;
      margin-right: 20px;
    }
    .jump-order{
      background:rgba(48,206,132,1);
      color: #fff;
    }
  }
  .jump-page{
  .jump-more{
    font-size: 16px;
    color: #333;
    font-weight: bold;
    &::before{
      content: '';
      width: 4px;
      height: 16px;
      background: #30CE84;
      display: inline-block;
      margin: -2px 5px -2px 10px;
    }
  }
  .jump-a{
    width: 25%;
    display: inline-block;
    text-align: center;
    a{
        display: inline-block;
        text-align: center;
        margin: 15px 0;
        position:relative;
        img{
          width: 40px;
          height: 40px;
          margin: 0 auto;
        }
        .jump-name{
          font-size: 14px;
          color: #666666;
          margin-top: 10px;
        }
        .jump-hot{
            background-repeat: no-repeat;
            display: inline-block;
            background-size:100% 100%;
            width: 21px;
            height: 10px;
            position: absolute;
            right: 0;
            top: 0;
        }
      }
    }
  }
  .countDown{
    text-align: center;
    font-size:12px;
    color: #999;
    padding:45px 0 15px 0;
    span{
      color: #31CF85;
    }
  }
}
</style>
