<template>
  <div class="home">
    <header>
      <div class="swiperBg">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
            <img src="../common/images/banner.jpg" alt="" style="width:100%;" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <div class="h-searchW" v-if="!headShow">
        <div class="iconfont background-op h-searchBack"  @click="$router.back()">&#xe61e;</div>
        <div class="h-searchInpW background-op">
          <span class="h-searchLogo"></span>
          <span class="h-searchInp"><input type="text" v-model="inpConent"/></span>
          <span class="iconfont h-searchClose" @click="inpConent=''">&#xe80e;</span>
        </div>
        <div class="h-searchCli background-op">搜索</div>
      </div>

      <div class="h-searchWFixed" v-if="headShow">
        <div class="iconfont h-searchBack"  @click="$router.back()">&#xe61e;</div>
        <div class="h-searchInpW background-op">
          <span class="h-searchLogo"></span>
          <span class="h-searchInp"><input type="text" v-model="inpConent"/></span>
          <span class="iconfont h-searchClose" @click="inpConent=''">&#xe80e;</span>
        </div>
        <div class="h-searchCli">搜索</div>
      </div>
    </header>

    <section class="h-goodsSection">
      <div class="h-goodsWrap">
        <div class="h-goodsImgW">
          <img src="../common/images/picture.jpg" alt="" />
          <span class="h-goodsRec">推荐</span>
        </div>
        <div class="h-goodsInfoW">
          <p class="h-goodsInfo">南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射</p>
          <p class="h-goodsMoneyW">
            <span class="h-goodsMoney">1944</span>
            <span>起 </span>
          </p>
        </div>
      </div>
      <div class="h-goodsWrap">
        <div class="h-goodsImgW">
          <img src="../common/images/picture.jpg" alt="" />
          <span class="h-goodsRec">推荐</span>
        </div>
        <div class="h-goodsInfoW">
          <p class="h-goodsInfo">南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射</p>
          <p class="h-goodsMoneyW">
            <span class="h-goodsMoney">1944</span>
            <span>起 </span>
          </p>
        </div>
      </div>
    </section>

    <section class="h-goodsList">
      <ul>
        <li v-for="(item,index) in ticketList" :key="index">
          <div class="h-goodsimgLiW">
            <img src="" alt="" />
          </div>
          <div class="h-goodsInfoLiW">
            <p class="h-goodsInfoLi">{{item.name}}</p>
            <p class="h-goodsMoneyLiW">
              <span class="h-goodsMoneyLi">{{item.money}}</span>
              <span>起</span>
            </p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { getInfo, getScenicList } from 'api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'home',
  data: () => ({
    swiperOption: {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      }
    },
    swiperSlides: [1, 2, 3, 4, 5],
    headShow: false,
    inpConent:'',
    ticketList:[
      {
        name:"南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
        money:'1944'
      },
      {
        name:"南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
        money:'1944'
      },
      {
        name:"南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
        money:'1944'
      }
    ],
    pageNum: 1,
    pageSize: 10
  }),
  computed: {
    offset() {
      return (this.pageNum-1)*this.pageSize
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.getInfo()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async getInfo() {
      // let data = await getInfo({ token: 'f7512935295b36d9b469e672c531d4c8' })
      let data = await getScenicList({n:this.offset, m:this.pageSize})
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

header {
  height: 168px;
}

.h-searchW,
.h-searchWFixed {
  position: fixed;
  top: 0;
  display: flex;
  padding: 25px 6px 8px 6px;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  .h-searchBack {
    width: 30px;
    height: 30px;
  }
  .h-searchBack {
    text-align: center;
    line-height: 30px;
    border-radius: 40px;
    color: #fff;
  }
  .h-searchInpW {
    width: 283px;
    height: 30px;
    border-radius: 33px;
    margin: 0 9px;
    display: flex;
    align-items: center;
    width: 78%;
    .h-searchLogo {
      width: 19px;
      height: 19px;
      background-size: 19px 19px;
      display: inline-block;
      background-image: url('../common/images/logo.png');
      margin: 0 11px 0 13px;
    }
    .h-searchClose {
      width: 22px;
      height: 22px;
      font-size: 17px;
      line-height: 22px;
      text-align: center;
      border-radius: 40px;
      color: #fff;
      background: #000;
    }
    .h-searchInp {
      width: 72%;
      margin-right: 9px;
      background: transparent;
      height: 100%;
      input {
        width: 100%;
        background: transparent;
        color: #fff;
        height: 100%;
      }
    }
  }
  .h-searchCli {
    width: 30px;
    height: 30px;
    font-size: 12px;
    color: #ffffff;
    border-radius: 40px;
    line-height: 30px;
  }
}

.h-searchWFixed {
  background: #fff;
  z-index: 1;
  .h-searchBack,
  .h-searchCli {
    color: #000;
  }
  .h-searchInpW {
    background: #fff;
    border: 1px solid #dfdfdf;
    .h-searchClose {
      background: #efefef;
      color: #000;
    }
    .h-searchInp {
      input {
        color: #000;
      }
    }
  }
}

.h-goodsSection {
  padding: 10px 8px;
  display: flex;
  .h-goodsWrap:first-of-type {
    margin-right: 10px;
  }
}

.h-goodsWrap {
  width: 50%;
  box-shadow: 2px 4px 10px 0px #e1ebff;
  font-size: 10px;
  height: 200px;
  display: inline-block;
  background: #fff;
  .h-goodsImgW {
    position: relative;
    img {
      width: 100%;
      height: 119px;
    }
    .h-goodsRec {
      position: absolute;
      background: #fff;
      padding: 6px 12px 6px 6px;
      border-radius: 0px 21px 21px 0px;
      background-color: #30ce84;
      color: #fff;
      top: 14px;
      left: 0;
    }
  }
}

.h-goodsInfoW {
  text-align: left;
  margin: 0 16px 0 12px;
  .h-goodsInfo {
    color: #000000;
    font-size: 0.266667rem;
    line-height: 0.48rem;
    margin: 0.213333rem 0 0.186667rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .h-goodsMoneyW {
    .h-goodsMoney {
      color: #30ce84;
      font-size: 15px;
    }
    span:last-of-type {
      color: #999999;
    }
  }
}

.h-goodsList {
  padding: 0 8px 10px 8px;
  ul {
    li {
      display: flex;
      background: #fff;
      height: 79px;
      padding: 10px 0;
      box-shadow: 2px 4px 10px 0px #e1ebff;
      .h-goodsimgLiW {
        width: 120px;
        height: 80px;
        margin: 0 7px 0 9px;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .h-goodsInfoLiW {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0;
        text-align: left;
        .h-goodsInfoLi {
          margin: 0;
          line-height: 17px;
          color: #000;
        }
        .h-goodsMoneyLiW {
          font-size: 10px;
          color: #999999;
          .h-goodsMoneyLi {
            font-size: 15px;
            color: #30ce84;
          }
        }
      }
    }
  }
}

.swiperBg {
  .swiper-pagination {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    width: 12%;
    right: 15px !important;
    left: auto;
    bottom: 13px;
    border-radius: 10px;
    padding: 1px 0;
  }
}
</style>

