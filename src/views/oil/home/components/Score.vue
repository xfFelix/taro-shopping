<template>
  <div class="content">
    <header>
      <i class="cubeic-back" @click="goHome"></i>
      加油卡充值
      <div class="iconMoreW">
        <div class="iconMore">
            <span class="iconfont" @click="showDialog=!showDialog">&#xe80c;</span>
            <Head-tab v-if="showDialog"></Head-tab>
        </div>
      </div>
      
    </header>
    <div class="type">
      <div class="item" :class="{active: rechargeType === 1}" @click="changeRechargeType(1)">直充</div>
      <div class="item" :class="{active: rechargeType === 2}" @click="changeRechargeType(2)">充值卡</div>
    </div>
    <div class="footer">
       <span class="score price-color">椰子分余额: <i>{{userinfo.score | toPrice}}</i></span> 
      <span class="history" @click="$router.push('/oil/oilRecord')">兑换记录 ></span>
    </div>

    <bg-mask v-model="showDialog" color="transparent"></bg-mask>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    'Header': () => import('components/Header'),
    HeadTab: () => import('components/HeadTab'),
    BgMask: () => import("@/components/BgMask"),
  },
  props: {
    rechargeType: {
      type: Number,
      default: 1
    }
  },
  data:()=>({
    showDialog:false
  }),
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo'
    })
  },
  methods: {
    ...mapActions({
      initConfig: 'oil/initConfig'
    }),
    changeRechargeType(val) {
      this.initConfig()
      this.$emit('update:rechargeType', val)
    },
    goHome() {
      window.location.href = process.env.VUE_APP_BASE_HOME_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #313340;
  color: #fff;
  font-size: 18px;
  header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 31px;
    .cubeic-back {
      position: absolute;
      left: 18px;
    }
    .iconMoreW{
      position: absolute;
      right: 18px;
      .iconMore{
          position: relative;
      }
    }
  }
  .type {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    .item {
      box-sizing: border-box;
      padding: 7px 0;
      width: 200px;
      text-align: center;
      word-break: keep-all;
      word-wrap: normal;
      border-radius: 25px;
      border: 1px solid #30CE84;
      color: #30CE84;
      &.active {
        background-color: #30CE84;
        color: #fff;
      }
      &:first-of-type {
        transform: translateX(18px);
      }
      &:last-of-type {
        transform: translateX(-18px);
      }
    }
  }
  .footer {
    padding: 26px 18px 21px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .score {
      i {
        color: #fff;
      }
    }
  }
}

</style>

