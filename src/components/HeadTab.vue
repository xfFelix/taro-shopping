<template>
  <div class="dialog-container">
    <div class="dialog-conInner">
      <div class="arrow-top"></div>
      <div class="dialog-content">
        <a :href="getToken?(process+item.linkTo+'?token=' + getToken):(process+item.linkTo)" v-for="(item,index) in dialogList" :key="index">
          <div class="link">
            <span class="iconfont" :class="item.icon"></span>
            <span>{{item.name}}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    dialogList: [
      { name: '首页', icon: 'icon-xiazai45', linkTo: '#/layout/home'},
      // { name: '商城', icon: 'icon-shangcheng', linkTo:'#/layout/shopMall'},
      { name: '分类', icon: 'icon-fenlei', linkTo:'#/layout/classify' },
      { name: '购物车', icon: 'icon-gouwuche', linkTo:'#/layout/shopCart'},
      { name: '我的', icon: 'icon-My', linkTo:'#/layout/account'},
    ],
    process:process.env.VUE_APP_BASE_HOME_URL
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken'
    })
  },
}
</script>

<style lang="scss" scoped>
.dialog-container {
  position: absolute;
  top: 26px;
  right: -11px;
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
      right: 14px;
      top: -5px;
      border-top: 1px solid #dfdfdf;
      border-left: 1px solid #dfdfdf;
    }
    .dialog-content {
      border: 1px solid #dfdfdf;
      border-radius: 7px;
      .link {
        background: #fff;
        padding: 8px 0;
        border-bottom: 1px solid #dfdfdf;
        width: 120px;
        display: flex; // justify-content: center;
        align-items: center;
        font-size: 14px;
        span:first-of-type {
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

