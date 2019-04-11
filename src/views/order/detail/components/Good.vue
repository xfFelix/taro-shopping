<template>
  <div class="good-containner">
    <div class="good-wrapper">
      <div class="header">
        <span></span>
        <span class="status price-color">{{data.status | orderStatusFilter}}</span>
      </div>
      <div class="good">
        <div class="good-img">
          <img src="" alt="">
        </div>
        <div class="good-detail">
          <p class="good-name">{{data.cardUser}}</p>
          <price :price="data.repaymentAmount" class="price"></price>
        </div>
      </div>
    </div>
    <ul>
      <li>
        <div class="item">
          <span class="label">使用日期:</span>
          <span class="value">{{data.sendDate}}</span>
        </div>
      </li>
      <li>
        <div class="item">
          <span class="label">入园地址:</span>
          <span class="value">{{data.address}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
    Price: ()=> import('components/Price')
  },
  props:{
    data:{
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.good-containner{
  padding: 10px 15px;
  .good-wrapper{
    background: #313340;
    padding: 13px 10px 10px;
    .good{
      display: flex;
      .good-img{
        flex: 0 0 125px;
        height: 90px;
        margin: 10px 0;
        box-sizing: border-box;
      }
      .good-detail{
        flex: 1;
        margin: 10px 10px;
        box-sizing: border-box;
        position: relative;
        .good-name{
          color: #858796;
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
        .price{
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
  ul{
    background: #fff;
    padding: 8px 10px;
    li{
      padding: 8px 0;
      .item{
        display: flex;
        align-items: center;
        .label{
          flex: 0 0 100px;
          font-weight: 700;
        }
        .value{
          flex: 1;
          color: #585858;
        }
      }
    }
  }
}
</style>
