<template>
  <div class="life-changeS">
    <Header class="navbar" :show-more="true">缴费成功</Header>
    <img src="~common/images/chenggong.png" alt="wu" class="img-success">
    <p class="price-color">提交成功!</p>
    <div class="price-wrapper">
      <span class="price">{{$route.query.price}}</span>
    </div>
    <div class="btn-wrapper">
      <button class="btn-home" @click="$router.replace('home')">返回首页</button>
      <button class="btn-order" @click="$router.replace('record')">查看订单</button>
    </div>
    <div class="timer"><i class="price-color">{{countDown}}s</i>后自动回到首页</div>
    <img src="~common/images/guanggaowei.png" alt="banner" class="banner">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from 'components/Header'
export default {
  data: () => ({
    timer: null,
    countDown: 5
  }),
  components: {
    Header
  },
  methods: {

  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
    })
  },
  mounted() {
    this.timer = setInterval(() => {
      this.countDown--
      if (this.countDown === 0) {
        clearInterval(this.timer);
        this.$router.push({ name: 'lifeHome' })
      }
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.life-changeS {
  height: 100%;
  background: #fff;
  .navbar{
    background: #000;
    color: #fff;
  }
  .img-success{
    width: 57px;
    height: 57px;
    margin: 68px auto 0;
  }
  p{
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
  }
  .price-wrapper{
    margin-top: 26px;
    display: flex;
    justify-content: center;
    .price{
      font-size: 24px;
      font-weight: bold;
      position: relative;
      &::before{
        content: '';
        display: block;
        position: absolute;
        left: -25px;
        top: 3px;
        width: 21px;
        height: 21px;
        background: url('../../../common/images/yezifen.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .btn-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 47px 0 35px;
    .btn-home{
      font-size: 15px;
      background: #fff;
      color: #30ce84;
      border-radius: 5px;
      border: 1px solid #30ce84;
      height: 44px;
      width: 130px;
    }
    .btn-order{
      background: #30CE84;
      color: #fff;
      border-radius: 5px;
      border: none;
      height: 44px;
      width: 130px;
      margin-left: 20px;
      font-size: 15px;
    }
  }
  .timer{
    text-align: center;
    padding-bottom: 20px;
    font-size: 12px;
    color: #666;
    border-bottom: 1px solid #F4F4F4;
  }
  .banner{
    width: 345px;
    height: 93px;
    margin: 15px auto;
  }
}
</style>
