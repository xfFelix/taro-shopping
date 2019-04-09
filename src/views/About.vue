<template>
  <div class="about">
    <header>
      <div class="swiperBg">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
            <img src="../common/images/bannerD.jpg" alt="" style="width:100%;" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="ab-head" v-if="!headShow">
        <div class="iconfont background-op h-searchBack"  @click="$router.back()">&#xe61e;</div>
        <div class="iconfont background-op h-searchBack">&#xe80c;</div>
      </div>

      <div class="ab-headFixed" v-if="headShow">
        <div class="iconfont  h-searchBack"  @click="$router.back()">&#xe61e;</div>
        <div class="iconfont  h-searchBack">&#xe80c;</div>
      </div>
    </header>

    <span class="iconfont background-op goTop" @click="goTop()" v-if="headShow" >&#xe811;</span>

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
      <li v-for="(item,index) in selectList" :key="index" @click="selectIndex(index)">
        <span>{{item.name}}</span>
        <span :class="item.id==selectId?'ad-selectInt':''"></span>
      </li>
    </ul>



  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'about',
  data: () => ({
    swiperOption: {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      }
    },
    swiperSlides: [1, 2, 3, 4, 5],
    selectList: [
      {
        id: 0,
        name: '景区须知',
        selectFlag: true
      },
      {
        id: 1,
        name: '景区简介',
        selectFlag: false
      },
      {
        id: 2,
        name: '交通指南',
        selectFlag: false
      },
      {
        id: 3,
        name: '旅游主题',
        selectFlag: false
      },

    ],
    selectId: 0,
    headShow: false
  }),
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    selectIndex(index) {
      this.selectId = index;
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 0) {
        this.headShow = true;
      } else {
        this.headShow = false;
        this.showDialog = false;
      }
    },
     goTop() {
            //参数i控制速度
            document.body.scrollTop -= 500;
            document.documentElement.scrollTop  -=500;
            if (document.body.scrollTop > 0 || document.documentElement.scrollTop >0) {
                var c = setTimeout(() => this.goTop(), 16);
            } else {
                clearTimeout(c);
            }
        },
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss" scoped>
.background-op {
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
}

.ab-head,
.ab-headFixed {
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  width: 100%;
  padding: 22px 8px 4px 11px;
  box-sizing: border-box;
  z-index: 1;
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
}

.ab-headFixed {
  background: #fff;
  .h-searchBack {
    color: #000 !important;
  }
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
        text-align: center;
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

.swiperBg {
  .swiper-pagination {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    width: 14%;
    right: 7px !important;
    left: auto;
    bottom: 28px;
    border-radius: 15px;
    padding: 5px 0;
    font-size: 15px;
  }
}

.goTop {
  width: 35px;
  height: 36px;
  color: #fff;
  display: inline-block;
  font-size: 25px;
  line-height: 36px;
  text-align: center;
  bottom: 8px;
  right: 8px;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
}
</style>
