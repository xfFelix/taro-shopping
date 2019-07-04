<template>
  <div class="life-home">
    <div class="header">
      <i class="cubeic-back" @click="goHome"></i>
      生活缴费
      <div class="iconMoreW">
        <div class="iconMore">
          <span class="iconfont" @click="showDialog=!showDialog">&#xe80c;</span>
          <Head-tab v-if="showDialog"></Head-tab>
        </div>
      </div>
    </div>

    <div class="home-content-wrap">
      <div class="home-pay-my">我的缴费
        <span>兑换记录</span>
      </div>
      <ul class="home-pay-wrap">
        <li class="home-pay-title">我家</li>
        <li class="home-pay-item">
          <div class="home-pay-left">
            <p class="home-pay-img">
              <img src="~common/images/shuifeic.png" alt="">
            </p>
            <div class="home-pay-name">
              <p>电费</p>
              <p>84912331</p>
            </div>
          </div>
          <div class="cubeic-back home-pay-go"></div>
        </li>
      </ul>

      <div class="home-pay-my">新增缴费
        <p>椰子分余额：
          <span>105.2</span>
        </p>
      </div>
      <ul class="home-pay-wrap">
        <li class="home-add-pay" v-for="(item,index) in addList" :key="index" @click="$router.push({name:'lifeGeolocation'})">
          <p class="home-add-img" :class="item.nameImg"></p>
          <p>{{item.name}}</p>
        </li>
      </ul>
      <p class="home-help">帮助中心</p>
    </div>

    <bg-mask v-model="showDialog" color="transparent"></bg-mask>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDialog: false,
    addList: [
      {
        name: '电费',
        nameImg: 'name01',
        type: 1
      },
      {
        name: '水费',
        nameImg: 'name02',
        type: 2
      },
      {
        name: '燃煤费',
        nameImg: 'name03',
        type: 3
      }
    ],
  }),
  computed: {

  },
  methods: {
    goHome() {
      window.location.href = process.env.VUE_APP_BASE_HOME_URL;
    },
  },
  components: {
    HeadTab: () => import('@/components/HeadTab'),
    BgMask: () => import("@/components/BgMask"),
  }
}
</script>

<style lang="scss" scoped>
.life-home {
  width: 100%;
  min-height: 100%;
  background-color: #f2f2f2;
  .header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 14px 0;
    font-size: 18px;
    background: #373C48;
    color: #fff;
    .cubeic-back {
      position: absolute;
      left: 18px;
      top: 12px;
    }
    .iconMoreW {
      position: absolute;
      right: 18px;
      top: 12px;
      .iconMore {
        position: relative;
      }
    }
  }
  .home-content-wrap {
    padding: 30px 16px;
    .home-pay-my {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      color: #4A4A4A;
      p {
        color: #999;
        font-size: 12px;
      }
      span {
        font-size: 14px;
        color: #30CE84;
      }
    }
    .home-pay-wrap {
      color: #4A4A4A;
      background: #fff;
      margin: 21px 0 28px 0;
      border-radius: 5px;

      .home-pay-title {
        font-size: 12px;
        padding: 13px;
        border-bottom: 1px solid #DEDEDE;
      }
      .home-pay-item {
        font-size: 15px;
        margin: 0 15px;
        border-bottom: 1px solid #DEDEDE;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px 0;
        .home-pay-left {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .home-pay-img {
            width: 39px;
            height: 39px;
            border-radius: 50%;
            margin-right: 21px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .home-pay-name {
            p {
              &:first-of-type {
                margin-bottom: 8px;
              }
            }
          }
        }
        .home-pay-go {
          transform: rotate(180deg);
          font-size: 19px;
          color: #999999;
        }
        &:last-of-type {
          border: none;
        }
      }
    }
    .home-add-pay {
      padding: 27px 0 25px 0;
      width: 33.3%;
      display: inline-block;
      text-align: center;
      .home-add-img {
        width: 24px;
        height: 24px;
        display: inline-block;
        background-size: 100% 100%;
        background-repeat: no-repeat, repeat;
        margin-bottom: 9px;
      }
      .name01 {
        background-image: url("../../../common/images/dianfei.png");
      }
      .name02 {
        background-image: url("../../../common/images/shuifei.png");
      }
      .name03 {
        background-image: url("../../../common/images/ranqifei.png");
      }
    }
    .home-help {
      color: #30CE84;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
