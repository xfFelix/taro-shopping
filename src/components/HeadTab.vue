<template>
  <div class="dialog-container">
      <div class="dialog-conInner">
        <div class="arrow-top"></div>
        <div class="dialog-content">
          <router-link :to="{path: '/layout/home'}">
            <div class="link">
              <span class="iconfont">&#xe61a;</span>
              <span>首页</span>
            </div>
          </router-link>
          <router-link :to="{path: '/layout/shopMall'}">
            <div class="link">
              <span class="iconfont">&#xe62b;</span>
              <span>商城</span>
            </div>
          </router-link>
          <router-link :to="{path: '/layout/classify'}">
            <div class="link">
              <span class="iconfont">&#xe606;</span>
              <span>分类</span>
            </div>
          </router-link>
          <router-link :to="{path: '/layout/shopCart'}">
            <div class="link">
              <span class="iconfont">&#xe625;</span>
              <span>购物车</span>
            </div>
          </router-link>
          <router-link :to="{path: '/layout/account'}">
            <div class="link">
              <span class="iconfont">&#xe615;</span>
              <span>我的</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.dialog-container {
  position: fixed;
  top: 50px;
  right: 10px;
  z-index: 102;
  .dialog-conInner {
    position: relative;
    .arrow-top {
      width: 10px;
      height: 10px;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      background: #fff;
      display: inline-block;
      position: absolute;
      right: 9px;
      top: -5px;
      border-top: 1px solid #dfdfdf;
      border-left: 1px solid #dfdfdf;
    }
    .dialog-content {
      border: 1px solid #dfdfdf;
      border-radius: 5px;
      .link {
        background: #fff;
        padding: 8px 0;
        border-bottom: 1px solid #dfdfdf;
        width: 100px;
        display: flex; // justify-content: center;
        align-items: center;
        font-size: 14px;
        span:first-of-type{
            margin: 0 12px;
            font-size: 18px;
        }
      }
      a:first-of-type {
        .link {
          border-radius: 5px 5px 0 0;
          border-top: none;
        }
      }
      a:last-of-type {
        .link {
          margin-bottom: 0;
          border-bottom: none;
          border-radius: 0 0 5px 4px;
        }
      }
      .navGo {}
    }
  }
}
</style>

