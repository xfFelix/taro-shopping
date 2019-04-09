<template>
  <div class="main">
    <div class="good">
      <div class="good-img">
        <img src="" alt="">
      </div>
      <div class="good-detail">
        <p class="good-name">商品名称</p>
        <price :price="2944.00"></price>
      </div>
    </div>
    <div class="swiper-title border-bottom-1px">
      <p class="title">【网红打卡景点】亚特兰蒂斯失落的空间水...</p>
      <span class="hint">预定须知<i class="cubeic-arrow"></i></span>
    </div>
    <div class="buy border-bottom-1px">
      <span class="buy-number">购票数量</span>
      <ul class="old-day">
        <li class="item">
          <p class="day">今天</p>
          <p class="number">2914</p>
        </li>
        <li class="item">
          <p class="day">明天</p>
          <p class="number">2914</p>
        </li>
        <li class="item">
          <p class="day">更多日期</p>
          <p class="number">2914</p>
        </li>
      </ul>
    </div>
    <div class="use">
      <span class="label">使用日期</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Price: () => import('components/Price')
  },
  data: () => ({

  })
}
</script>

<style lang="scss" scoped>

</style>

