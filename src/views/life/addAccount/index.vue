<template>
  <div class="add-account">
    <div class="header">
      <i class="cubeic-back" @click="goHome"></i>
      新增缴费账户
      <div class="iconMoreW">
        <div class="iconMore">
          <span class="iconfont" @click="showDialog=!showDialog">&#xe80c;</span>
          <Head-tab v-if="showDialog"></Head-tab>
        </div>
      </div>
    </div>

    <ul class="account-content-wrap">
      <li class="account-margin10">
        <div>
          <span class="account-img name01"></span>电费</div>
        <div>深圳市
          <i></i>
        </div>
      </li>
      <li>
        缴费单位
        <div>深圳市
          <i></i>
        </div>
      </li>
      <li class="account-margin10">
        用户编号
        <div><input type="number" v-model="idNmu">
          <span>如何查户号</span>
        </div>
      </li>
      <li>
        分组
        <span>我家</span>
      </li>
    </ul>

    <div class="agreement">
      <cube-checkbox class="with-click" v-model="checked" shape="square">我已阅读并同意</cube-checkbox>
      <span @click="show.file=true" class="file">《椰子分兑换金币说明》</span>
    </div>

    <bg-mask v-model="showDialog" color="transparent"></bg-mask>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDialog: false,
    idNmu: '232323',
    checked: false,
    show: {
      life: false
    }
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
.add-account {
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


  .account-content-wrap {
    .account-margin10 {
      border-bottom: 10px solid #F4F4F4;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // margin: 0 15px;
      background: #fff;
      .account-img {
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
  }
}
</style>
