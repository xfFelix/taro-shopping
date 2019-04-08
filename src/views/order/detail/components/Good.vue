<template>
  <div class="good-containner">
    <div class="good-wrapper">
      <div class="header">
        <span></span>
        <span class="status price-color">已使用</span>
      </div>
      <div class="good">
        <div class="good-img">
          <img src="" alt="">
        </div>
        <div class="good-detail">
          <p class="good-name">商品名称</p>
          <span class="price price-color">2944.00</span>
        </div>
      </div>
    </div>
    <ul>
      <li>
        <div class="item">
          <span class="label">使用日期</span>
          <span class="value">20190305 15:01:24</span>
        </div>
      </li>
      <li>
        <div class="item">
          <span class="label">使用方式</span>
          <span class="value">20190305 15:01:24</span>
        </div>
      </li>
      <li>
        <div class="item">
          <span class="label">入园时间</span>
          <span class="value">20190305 15:01:24</span>
        </div>
      </li>
      <li>
        <div class="item">
          <span class="label">入园地址</span>
          <span class="value">20190305 15:01:24</span>
        </div>
      </li>
      <li>
        <div class="item">
          <span class="label">入园方式</span>
          <span class="value">20190305 15:01:24</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
.good-containner{
  padding: 10px 15px;
  font-size: 16px;
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
        border: 1px solid #ccc;
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
}
</style>
