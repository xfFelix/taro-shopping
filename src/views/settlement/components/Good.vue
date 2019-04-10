<template>
  <div class="main">
    <div class="good">
      <div class="good-img">
        <img src="" alt="">
      </div>
      <div class="good-detail">
        <p class="good-name">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p>
        <price :price="2944.00" class="good-price"></price>
      </div>
    </div>
    <div class="swiper-title border-bottom-1px">
      <p class="title">【网红打卡景点】亚特兰蒂斯失落的空间水...</p>
      <span class="hint">预定须知<i class="cubeic-arrow"></i></span>
    </div>
    <div class="buy border-bottom-1px">
      <span class="buy-number">购票数量</span>
      <!-- <ul class="old-day clear-fix">
        <li class="item">
          <p class="day">更多日期</p>
          <p class="number">2914</p>
          <i class="cubeic-arrow"></i>
        </li>
        <li class="item">
          <p class="day">明天</p>
          <p class="number">2914</p>
        </li>
        <li class="item active">
          <p class="day">今天</p>
          <p class="number">2914</p>
        </li>
      </ul> -->
      <cube-checker v-model="checkerList" :options="options" type="radio">
        <cube-checker-item v-for="item in options" :key="item.value" :option="item">
            <p class="day">{{item.text}}</p>
            <p class="number">{{item.number}}</p>
        </cube-checker-item>
      </cube-checker>
    </div>
    <div class="use">
      <span class="label">使用日期</span>
      <div class="count-number">
        <i class="iconfont icon-reduce"></i>
        <span class="number">3</span>
        <i class="iconfont icon-add"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Price: () => import('components/Price')
  },
  data: () => ({
    checkerList: 0,
    options: [
      {value: 0, text: '今天', number: 2914},
      {value: 1, text: '明天', number: 2914},
      {value: 2, text: '更多日期', number: 2914}
    ]
  }),
  watch:{
    checkerList(val) {
      console.log(val)
    }
  }
}
</script>

<style>
.cube-checker-item{
  margin-right: 0;
}
.cube-checker-item_active{
  background: #30ce84;
  color: #fff;
  border: none;
}
</style>


<style lang="scss" scoped>
.main{
  background: #fff;
  padding: 10px 10px 0;
  .swiper-title{
    padding: 10px 0;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .title{
      color: #989898;
    }
    .hint{
      color: #000;
      font-weight: 600;
    }
  }
  .buy{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    .buy-number{
      color: #000;
      font-weight: 700;
      font-size: 15px;
    }
    ul{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      li{
        border: 1px dashed #30ce84;
        margin-left: 10px;
        box-sizing: border-box;
        width: 80px;
        text-align: center;
        padding: 5px 0;
        font-size: 12px;
        border-radius: 15px; /*no*/
        position: relative;
        &.active{
          background: #30ce84;
          color: #fff;
        }
        .cubeic-arrow{
          position: absolute;
          right: 1px;
          top: 14px;
        }
      }
    }
  }
  .use{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    .label{
      font-size: 15px;
      color: #000;
      font-weight: 700;
    }
    .count-number{
      border: 1px solid #ccc;
      padding: 5px 8px;
      .number{
        padding: 0 10px;
      }
    }
  }
}
</style>

