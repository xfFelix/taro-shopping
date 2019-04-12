<template>
  <div class="ab-tkInfoW">
    <div class="ab-circle"></div>
    <div class="ab-tkInfo">
      <div class="ab-tkName">{{sceneInfoC.uutitle}}</div>
      <div class="ab-tkMoneyW">
        <p>{{sceneInfoC.uutprice|toDecimal2}}起</p>
        <p>门市价</p>
      </div>
    </div>
    <!-- <div class="ab-tkMarket one-bottom-px">
      <span>门市价</span>
      <span>900</span>
    </div> -->
    <div class="ab-tkTimeAd">
      <p class="ab-tkTime">
        <span>营业时间</span>
        <span>{{sceneInfoC.uuruntime}}</span>
      </p>
      <p class="ab-tkAddress">
        <span>详细地址</span>
        <span>{{sceneInfoC.uuaddress}}</span>
      </p>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    sceneInfoC: Object
  },
  data: () => ({
    sceneInfo: {}
  }),
  methods: {

  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.ab-tkInfoW {
  background: #fff;
  position: relative;
  .ab-circle {
    width: 100%;
    height: 25px;
    top: -20px;
    z-index: 4;
    background: #fff;
    border-radius: 20px 20px 0px 0px;
    position: absolute;
  }
  .ab-tkInfo {
    display: flex;
    align-items: center;
    padding: 0 10px 0 20px;
    justify-content: space-between;
    .ab-tkName {
      font-size: 15px;
      color: #333333;
      text-align: left;
      line-height: 23px;
    }
    .ab-tkMoneyW {
      text-align: center;
      padding: 13px;
      background-color: #ffffff;
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin: 0px 0 0 29px;
      flex-shrink: 0;
      p:first-of-type {
        font-size: 18px;
        line-height: 30px;
        color: #fe5a4c;
      }
      p:last-of-type {
        border: solid 1px #000000;
        display: inline-block;
        padding: 0 2px;
      }
    }
  }
  .ab-tkMarket {
    color: #333333;
    font-size: 12px;
    margin: 0 10px 0 20px;
    text-align: left;
    padding: 3px 0 11px 0px;
    span:last-of-type {
      text-decoration: line-through;
    }
  }
  .ab-tkTimeAd {
    padding: 0 0 0 20px;
    text-align: left;
    font-size: 12px;
    p {
      span:first-of-type {
        color: #999999;
      }
      span:last-of-type {
        color: #333333;
      }
    }
    .ab-tkTime {
      padding: 10px 0 13px 0;
    }
    .ab-tkAddress {
      padding-bottom: 18px;
    }
  }
}
</style>
