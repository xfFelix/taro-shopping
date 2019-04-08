<template>
  <div class="about">
    <header>
      <div>
        <img src="../common/images/bannerD.jpg" alt="" style="width:100%;" />
      </div>
      <div class="ab-head">
        <div class="iconfont background-op h-searchBack">&#xe61e;</div>
        <div class="iconfont background-op h-searchBack">&#xe80c;</div>
      </div>
    </header>

    <section class="ab-tkInfoW">
      <div class="ab-circle"></div>
      <div class="ab-tkInfo">
        <div class="ab-tkName">南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火锅+射箭+摩托艇+香蕉船)</div>
        <div class="ab-tkMoneyW">
          <p>8200</p>
          <p>兑换价</p>
        </div>
      </div>
      <div class="ab-tkMarket one-bottom-px">
        <span>门市价</span>
        <span>900</span>
      </div>
      <div class="ab-tkTimeAd">
        <p class="ab-tkTime">
          <span>营业时间</span>
          <span>9:00~22:00</span>
        </p>
        <p class="ab-tkAddress">
          <span>详细地址</span>
          <span>海南省三亚市陵水县新村镇南湾猴岛</span>
        </p>
      </div>
    </section>

    <section class="ad-orderW">
      <p class="ad-orderTitle">门票</p>
      <ul>
        <li>
          <div class="ad-orderName">【网红打卡景点】亚特兰蒂斯失落的空间水族馆成人门票</div>
          <div class="ad-orderMoneyW">
            <p>8200.00</p>
            <p>立即预订</p>
          </div>
        </li>
        <li>
          <div class="ad-orderName">【网红打卡景点】亚特兰蒂斯失落的空间水族馆成人门票</div>
          <div class="ad-orderMoneyW">
            <p>8200.00</p>
            <p>立即预订</p>
          </div>
        </li>
      </ul>
    </section>

    <ul class="ad-introduceW ont-bottom-px">
      <li>
        <span>景区须知</span>
        <span class="ad-selectInt"></span>
      </li>
      <li>
        <span>景区须知</span>
        <span></span>
      </li>
      <li>
        <span>景区须知</span>
        <span></span>
      </li>
      <li>
        <span>景区须知</span>
        <span></span>
      </li>
    </ul>

  </div>
</template>
<script>
export default {
  data: () => ({
    test: ''
  })
}
</script>

<style lang="scss" scoped>
.background-op {
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
}

.ab-head {
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  width: 100%;
  padding: 22px 8px 0px 11px;
  box-sizing: border-box;
}

.h-searchBack {
  width: 36px;
  height: 36px;
}

.h-searchBack {
  text-align: center;
  line-height: 36px;
  border-radius: 50%;
  color: #fff;
}


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
    .ab-tkName {
      font-size: 15px;
      color: #333333;
      text-align: left;
      line-height: 23px;
    }
    .ab-tkMoneyW {
      padding: 13px;
      background-color: #ffffff;
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin: 0px 0 0 29px;
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


.ad-orderW {
  background: #fff;
  margin: 10px 0;
  padding: 21px 0 15px 0;
  .ad-orderTitle {
    margin: 0 0 16px 19px;
    color: #000000;
    font-size: 15px;
    text-align: left;
  }
  ul {
    margin: 0 19px;
    border-top: #dfdfdf;
    border-bottom: #dfdfdf;
    li {
      background-color: #f3f4f6;
      display: flex;
      padding: 17px 10px 8px 10px;
      border-bottom: 1px dashed #999;
      .ad-orderName {
        font-size: 13px;
        color: #333333;
        text-align: left;
        margin-right: 50px;
        line-height: 20px;
      }
      .ad-orderMoneyW {
        flex-shrink: 0;
        p:first-of-type {
          font-size: 13px;
          color: #000000;
        }
        p:last-of-type {
          background-color: #30ce84;
          border-radius: 30px;
          color: #ffffff;
          margin-top: 8px;
          display: inline-block;
          padding: 8px 12px;
        }
      }
    }
    li:last-of-type {
      border: none;
    }
  }
}

.ad-introduceW {
  background: #fff;
  display: flex;
  justify-content: space-around;
  padding-top: 22px;
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 32px;
    span:first-of-type {
      color: #000000;
      font-size: 15px;
    }
    .ad-selectInt {
      width: 28px;
      height: 3px;
      background-color: #30ce84;
      display: block;
          margin: 0 auto;
    }
  }
}
</style>
