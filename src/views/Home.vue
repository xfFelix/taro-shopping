<template>
  <div class="home">
    <header>
      <div>
        <img src="../common/images/banner.jpg" alt="" />
      </div>

      <div class="h-searchW">
        <div class="iconfont background-op h-searchBack">&#xe61e;</div>
        <div class="h-searchInpW background-op">
          <span class="h-searchLogo"></span>
          <span class="h-searchInp"><input type="text" /></span>
          <span class="iconfont h-searchClose">&#xe80e;</span>
        </div>
        <div class="h-searchCli background-op">搜索</div>
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
        <li>
          <div>
             <img src="../common/images/picture.jpg" alt="" />
          </div>
          <div class="h-goodsInfoW">
            <p class="h-goodsInfo">南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射</p>
            <p class="h-goodsMoneyW">
              <span class="h-goodsMoney">1944</span>
              <span>起 </span>
            </p>
          </div>
        </li>
      </ul>
    </section>

    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted() {
    console.log('helloworld')
  }
}
</script>


<style lang="scss">
.background-op {
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
}

header {
  height: 168px;
}

.h-searchW {
  position: fixed;
  top: 0;
  display: flex;
  padding: 25px 6px 8px 6px;
  width: 100%;
  box-sizing: border-box;
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
      input {
        width: 100%;
        background: transparent;
        color: #fff;
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
      font-size: 10px;
      line-height: 18px;
      margin: 8px 0 7px 0;
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
</style>

