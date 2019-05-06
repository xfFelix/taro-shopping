<template>
  <div class="success-wrapper">
    <div class="banner">
      <div class="success">
        <i class="iconfont ok">&#xe631;</i>
        <span class="text">提交成功</span>
      </div>
      <div class="price">142.56</div>
    </div>
    <ul>
      <li>产品名称：爱奇艺VIP黄金会员年卡</li>
      <li>充值账号：185*****9918</li>
      <li>售价：142.56</li>
      <li>税费：3.00</li>
      <li>合计：145.56</li>
    </ul>
    <button class="confirm">确定</button>
    <span class="time"><em>3s</em>后自动跳转</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.success-wrapper{
  padding: 0 15px;
  background: #fff;
  min-height: 100%;
  letter-spacing: 1px;
  .banner{
    height: 215px;
    border-bottom: 1px solid #DEDEDE;
    .success{
      padding-top: 84px;
      font-size: 30px;
      color: #30CE84;
      text-align: center;
      .ok{
        font-size: 24px;
        border: 2px solid #30CE84;
        border-radius: 50%;
        padding: 4px;
        margin-right: 18px;
        position: relative;
        z-index: 0;
        &::before{
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
    .price{
      font-size: 36px;
      color: #30CE84;
      font-weight: 500;
      text-align: center;
      margin-top: 34px;
    }
  }
  ul{
    margin-top: 42px;
    color: #4A4A4A;
    padding-left: 15px;
    box-sizing: border-box;
    li{
      font-size: 15px; /*no*/
      margin-top: 35px;
      &:first-of-type{
        margin-top: 0;
      }
    }
  }
  .confirm{
    margin-top: 38px;
    border: none;
    width: 100%;
    height: 44px;
    color: #fff;
    background: #30CE84;
    border-radius: 5px;
  }
  .time{
    font-size: 12px; /*no*/
    margin-top: 15px;
    display: block;
    text-align: center;
    color: #999999;
    em{
      color: #30CE84;
    }
  }
}
</style>
