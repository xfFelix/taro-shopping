<template>
  <div class="life-changeS">
    <div class="banner">
      <div class="success">
        <i class="iconfont ok">&#xe631;</i>
        <span class="text">提交成功</span>
      </div>
      <div class="price"></div>
    </div>
    <ul>
      <li>产品名称：</li>
      <li>充值账号：</li>
      <li>类型：
        <span >周卡</span>
        <span >月卡</span>
        <span >季卡</span>
        <span >半年卡</span>
        <span >年卡</span>
      </li>
      <li>售价：</li>
      <li>税费：</li>
      <li>合计：</li>
    </ul>
     <button class="confirm" @click="$router.push({name:'memberHome'})">确定</button>
    <span class="time">
      <em>{{countDown}}s</em>后自动跳转至首页</span>
  </div>
</template>

<script>
import { vipCostInfo } from 'api';
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    timer: null,
    countDown: 5,
    infoList: {}
  }),
  methods: {
    async vipCostInfo() {
      let data = await vipCostInfo({ token: this.getToken, productId: this.$route.query.productId });
      if (data.code != 1 && data.code != 4 && data.code != 6) return this.$toast(data.message);
      this.infoList = data.data;
    },
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
    })
  },
  mounted() {
    this.vipCostInfo()
    this.timer = setInterval(() => {
      this.countDown--
      if (this.countDown == 0) {
        clearInterval(this.timer);
        this.$router.push({ name: 'lifeHome' })
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.life-changeS {
  padding: 0 15px;
  background: #fff;
  min-height: 100%;
  letter-spacing: 1px;
  .banner {
    height: 215px;
    border-bottom: 1px solid #DEDEDE;
    .success {
      padding-top: 84px;
      font-size: 30px;
      color: #30CE84;
      text-align: center;
      .ok {
        font-size: 24px;
        border: 2px solid #30CE84;
        border-radius: 50%;
        padding: 4px;
        margin-right: 18px;
        position: relative;
        z-index: 0;
        &::before {
          content: '';
          display: block;
          position: absolute;
          width: 6px;
          height: 10px;
          top: 0;
          left: 3px;
          background: #fff;
          z-index: 1;
        }
      }
    }
    .price {
      font-size: 36px;
      color: #30CE84;
      font-weight: 500;
      text-align: center;
      margin-top: 34px;
    }
  }
  ul {
    margin-top: 42px;
    color: #4A4A4A;
    padding-left: 15px;
    box-sizing: border-box;
    li {
      font-size: 15px;
      /*no*/
      margin-top: 25px;
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  .confirm {
    margin: 38px 0 10px 0;
    border: none;
    width: 100%;
    height: 44px;
    color: #fff;
    background: #30CE84;
    border-radius: 5px;
  }
  .time {
    font-size: 12px;
    /*no*/
    padding: 15px 0 10px 0;
    display: block;
    text-align: center;
    color: #999999;
    em {
      color: #30CE84;
    }
  }
}
</style>
