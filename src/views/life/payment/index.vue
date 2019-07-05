<template>
  <div class="payment">
    <Header class="navbar" :show-more="true">缴费账户</Header>
    <div class="type-wrapper">
      <div class="type">
        <img src="~common/images/dianfei.png" alt="">
        电费
      </div>
      <div class="score">
        椰子分余额:&nbsp;<span class="price-color">105.2</span>
      </div>
    </div>
    <div class="content-wrapper">
      <ul class="info">
        <li>
          缴费单元<span class="value">国家电网供电公司</span>
        </li>
        <li>
          用户编号<span class="value">5800282069</span>
        </li>
        <li>
          户名<span class="value">*成刚</span>
        </li>
        <li>
          户号余额<span class="value">-1.23</span>
        </li>
      </ul>
      <div class="input-wrapper">
        <span class="point">充值金额:</span>
        <input type="number">
      </div>
      <ul class="info">
        <li>
          售价：<span class="value">2.32</span>
        </li>
        <li>
          税费：<span class="value">0.00</span>
        </li>
        <li>
          应付合计：<span class="value">2.42</span>
        </li>
      </ul>
      <button class="payment">立即充值</button>
    </div>
  </div>
</template>

<script>
import Header from 'components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
.payment{
  height: 100%;
  .navbar{
    background: #000;
    color: #fff;
  }
  .type-wrapper{
    height: 65px;
    line-height: 65px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    .type{
      font-size: 15px;
      color: #4A4A4A;
      font-weight: bold;
      display: flex;
      align-items: center;
      img{
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }
    }
    .score{
      font-size: 12px;
      color: #4A4A4A;
    }
  }
  .content-wrapper {
    margin-top: 10px;
    background: #fff;
    padding-bottom: 40px;
    .info{
      padding: 24px 0;
      margin: 0 15px;
      border-bottom: 1px solid #dedede;
      li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;
        color: #4A4A4A;
        font-size: 14px;
        font-weight: bold;
        &:first-of-type{
          margin-top: 0;
        }
        .value{
          font-weight: 400;
        }
      }
    }
    .input-wrapper{
      margin: 20px 18px 0;
      box-sizing: border-box;
      border: 1px solid #dedede;
      border-radius: 5px;
      height: 44px;
      line-height: 44px;
      display: flex;
      .point{
        flex: 0 0 80px;
        text-align: center;
        font-size: 15px;
        color: #999999;
      }
      input {
        color: #000;
        font-size: 15px;
        height: 100%;
        flex: 1;
      }
    }
    .payment{
      width: 345px;
      height: 44px;
      background: #30CE84;
      color: #fff;
      margin: 45px auto 0;
      font-size: 15px;
      border: none;
      border-radius: 5px;
      display: block;
    }
  }
}
</style>
