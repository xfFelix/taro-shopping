<template>
  <ul>
    <li v-for="item of list" :key="item.id">
      <div class="content-wrapper">
        <div class="header">
          <span class="logo">门票</span>
          <p class="order-number">订单号：{{item.idUrl}}</p>
          <span class="order-status">{{item.status | orderStatusFilter}}</span>
        </div>
        <div class="content">
          <div class="good-img">
            <img v-lazy="item.imgpath" alt="">
          </div>
          <div class="good-detail">
            <p class="good-name">{{item.cardUser}}</p>
            <div class="good-price">
              <span class="price">{{item.orderNum | toPrice}}</span>
              <span class="number cubeic-close">{{item.cardBank || 0}}</span>
            </div>
          </div>
        </div>
        <div class="footer border-bottom-1px">
          <span class="number">共{{item.cardBank || 0}}件商品</span>
          <span class="total">合计: <em class="price-color">{{item.totalAmount | toDecimal2Fp}}.{{item.totalAmount | toDecimal2Ap}}</em></span>
        </div>
        <div class="des">
          <button class="order-detail" @click="goDetail(item)">订单详情</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    goDetail(item) {
      this.$router.push({
        path: 'detail',
        query: {
          id: item.id
        }
      })
    }
  }
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
        .logo{
          color: #fff;
          font-size: 12px;
          background: #000;
          padding: 1px 5px;
          word-break: keep-all;
          white-space: nowrap;
          height: 15px;
        }
        .order-number {
          margin-left: 5px;
          font-weight: 700;
          flex: 1;
          text-align: left;
          word-break: keep-all;
          word-wrap: normal;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
