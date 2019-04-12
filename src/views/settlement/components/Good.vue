<template>
  <div class="main">
    <div class="good">
      <div class="good-img">
        <img v-lazy="info.uuimgpath" alt="">
      </div>
      <div class="good-detail">
        <p class="good-name">{{info.uutitle}}</p>
        <price :price="dateObj.retail_price" class="good-price"></price>
      </div>
    </div>
    <div class="swiper-title border-bottom-1px">
      <p class="title">【网红打卡景点】亚特兰蒂斯失落的空间水...</p>
      <span class="hint">预定须知<i class="cubeic-arrow"></i></span>
    </div>
    <div class="use border-bottom-1px">
      <span class="label">使用日期</span>
      <cube-scroll
        ref="scroll"
        :data="dateList"
        direction="horizontal"
        class="horizontal-scroll-list-wrap">
        <cube-checker v-model="data.checkerValue" :options="dateList" type="radio">
          <cube-checker-item v-for="item in dateList" :key="item.date" :option="item">
              <p class="day">{{item.value}}</p>
              <p class="number">{{item.price}}</p>
          </cube-checker-item>
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
        </cube-checker>
      </cube-scroll>
    </div>
    <div class="buy">
      <span class="buy-number">购票数量</span>

      <div class="count-number">
        <i class="iconfont icon-reduce"></i>
        <span class="number">{{data.number}}</span>
        <i class="iconfont icon-add"></i>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'util/moment';
import { setTimeout } from 'timers';
export default {
  components: {
    Price: () => import('components/Price')
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    info: {
      type: Object,
      default: {}
    }
  },
  data: () => ({
    data: {
      checkerValue: moment().format('YYYY-MM-DD'),
      number: 1
    },
  }),
  computed: {
    dateList () {
      let dateList = []
      let obj = {}
      for (let item of this.list) {
        obj = {
          value: item.date,
          price: item.retail_price,
          total: item.buy_price
        }
        dateList.push(obj)
      }
      return dateList
    },
    dateObj () {
      for (let item of this.list) {
        if (this.data.checkerValue === item.date) {
          this.$parent.getFeeInfo(item.retail_price, this.data.number)
          return item
        }
      }
      return {}
    }
  }
}
</script>

<style lang="scss">
.cube-checker-item{
  margin-right: 0;
  box-sizing: border-box;
}
.cube-checker-item_active{
  background: #30ce84;
  color: #fff;
  border: none;
  &::after{
    border: none;
  }
}
.horizontal-scroll-list-wrap{
  flex: 1;
}
.cube-scroll-content{
  display: inline-block;
}
.cube-checker{
  white-space: nowrap;
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

    .count-number{
      border: 1px solid #ccc;
      padding: 5px 8px;
      .number{
        padding: 0 10px;
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
      flex: 0 0 70px;
      color: #000;
      font-weight: 700;
    }
    ul{
      display: flex;
      // justify-content: flex-end;
      li{
        border: 1px dashed #30ce84;
        margin-left: 10px;
        box-sizing: border-box;
        text-align: center;
        padding: 5px 18px;
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
}
</style>

