<template>
  <div class="add-account">
    <Header class="navbar" :show-more="true">新增缴费账户</Header>
    <ul class="account-content-wrap">
      <li class="account-margin10">
        <div>
          <span class="account-img name01"></span>电费</div>
        <div>深圳市
          <i class="cubeic-back"></i>
        </div>
      </li>
      <li class="displayr">
        <div class="marlr15">
          缴费单位
          <div>深圳市
            <i class="cubeic-back"></i>
          </div>
        </div>

      </li>
      <li class="account-margin10">
        用户编号
        <div><input type="number" v-model="idNmu">
          <span class="check-num">如何查户号</span>
        </div>
      </li>
      <li class="account-margin10">
        分组
        <p>我家
          <i class="cubeic-back"></i>
        </p>
      </li>
    </ul>

    <div class="agreement">
      <cube-checkbox class="with-click" v-model="checked" shape="square">我已阅读并同意</cube-checkbox>
      <span @click="show.file=true" class="file">《椰云网络生活缴费服务协议》</span>
    </div>

    <div class="next-step">下一步</div>

  </div>
</template>

<script>
export default {
  data: () => ({

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
    Header: () => import('@/components/Header'),
  }
}
</script>

<style lang="scss" scoped>
.add-account {
  width: 100%;
  min-height: 100%;
  background-color: #f2f2f2;
  color: #4A4A4A;
  .navbar {
     background: #373C48;
    color: #fff;
  }
  .account-content-wrap {
    .account-margin10 {
      border-bottom: 10px solid #F4F4F4;
      padding: 25px 15px;
      .check-num {
        color: #30CE84;
      }
    }
    li {
      display: flex;
      align-items: center;
      justify-content: space-between; // margin: 0 15px;
      background: #fff;
      font-size: 15px;
      div {
        display: flex;
        align-items: center;
        i {
          color: #D1CFCF;
          transform: rotate(-90deg);
          margin-left: 13px;
        }
      }
      p {
        i {
          color: #D1CFCF;
          margin-left: 8px;
          transform: rotate(180deg);
          display: inline-block;
        }
      }
      .account-img {
        width: 24px;
        height: 24px;
        display: inline-block;
        background-size: 100% 100%;
        background-repeat: no-repeat, repeat;
        margin-right: 8px;
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
    .displayr {
      display: block;
      padding: 0;
    }
  }
  .marlr15 {
    margin: 0 15px;
    border-bottom: 1px solid #F4F4F4;
    padding: 25px 0;
    justify-content: space-between;
  }
  .next-step {
    width: 345px;
    background: #30CE84;
    border-radius: 5px;
    font-size: 15px;
    color: #fff;
    line-height: 44px;
    text-align: center;
    margin: 0 auto;
  }
  .agreement {
    display: flex;
    align-items: center;
    .cube-checkbox {
      padding: 0 0 0 20px;
    }
    .file {
      color: #30CE84;
      margin-top: -2px;
    }
  }
}
</style>
