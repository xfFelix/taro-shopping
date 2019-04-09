<template>
  <ul>
    <li>
      <div class="content-wrapper">
        <div class="header">
          <span></span>
          <p class="order-number">订单号：201803051548941</p>
          <span class="order-status">未使用</span>
        </div>
        <div class="content">
          <div class="good-img">
            <img src="" alt="">
          </div>
          <div class="good-detail">
            <p class="good-name">商品名称</p>
            <div class="good-price">
              <span class="price">652.00</span>
              <span class="number cubeic-close">3</span>
            </div>
          </div>
        </div>
        <div class="footer border-bottom-1px">
          <span class="number">共3件商品</span>
          <span class="total">合计: <em class="price-color">2054.22</em></span>
        </div>
        <div class="des">
          <button class="order-detail" @click="$router.push('detail')">订单详情</button>
        </div>
      </div>
    </li>
    <li>
      <div class="content-wrapper">
        <div class="header">
          <span></span>
          <p class="order-number">订单号：201803051548941</p>
          <span class="order-status">未使用</span>
        </div>
        <div class="content">
          <div class="good-img">
            <img src="" alt="">
          </div>
          <div class="good-detail">
            <p class="good-name">商品名称</p>
            <div class="good-price">
              <span class="price">652.00</span>
              <span class="number cubeic-close">3</span>
            </div>
          </div>
        </div>
        <div class="footer border-bottom-1px">
          <span class="number">共3件商品</span>
          <span class="total">合计: <em class="price-color">2054.22</em></span>
        </div>
        <div class="des">
          <button class="order-detail">订单详情</button>
        </div>
      </div>
    </li><li>
      <div class="content-wrapper">
        <div class="header">
          <span></span>
          <p class="order-number">订单号：201803051548941</p>
          <span class="order-status">未使用</span>
        </div>
        <div class="content">
          <div class="good-img">
            <img src="" alt="">
          </div>
          <div class="good-detail">
            <p class="good-name">商品名称</p>
            <div class="good-price">
              <span class="price">652.00</span>
              <span class="number cubeic-close">3</span>
            </div>
          </div>
        </div>
        <div class="footer border-bottom-1px">
          <span class="number">共3件商品</span>
          <span class="total">合计: <em class="price-color">2054.22</em></span>
        </div>
        <div class="des">
          <button class="order-detail">订单详情</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
ul{
  background-color: #f3f4f6;
  padding: 10px 0;
  font-size: 14px;
  height: 100%;
  li{
    background: #fff;
    padding: 0 10px;
    margin: 10px 0;
    box-sizing: border-box;
    &:last-of-type{
      margin-bottom: 0;
    }
    &:first-of-type{
      margin-top: 0;
    }
    .content-wrapper{
      .header{
        display: flex;
        padding: 15px 0;
        font-weight: 900;
        color: #000;
        .order-number {
          font-weight: 700;
          flex: 1;
          text-align: left;
        }
        .order-status{
          font-weight: 700;
        }
      }
      .content{
        display: flex;
        background-color: #f3f4f6;
        padding: 10px 10px;
        .good-img{
          flex: 0 0 120px;
          height: 80px;
        }
        .good-detail{
          flex: 1;
          padding: 0 10px;
          position: relative;
          .good-name{
            position:relative;
            line-height:1.5em;
            height:3em;
            overflow:hidden;
            word-break: break-all;
            word-wrap: break-word;
            &::after{
              content:"";
              position:absolute;
              bottom:0;
              right:0;
              padding: 0 5px;
              background-color: #fff;
            }
          }
          .good-price{
            position: absolute;
            bottom: 0;
            display: flex;
            width: 100%;
            justify-content: space-between;
            .number{
              margin-right: 10px;
              box-sizing: border-box;
              &::before{
                font-size: 15px;
              }
            }
          }
        }
      }
      .footer{
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
      }
      .des{
        padding: 5px 0;
        text-align: right;
        .order-detail{
          background-color: transparent;
          font-size: 15px;
          padding: 5px 15px;
          border: 1px solid #ccc;
          border-radius: 10px; /* no */
        }
      }
    }
  }
}
</style>
