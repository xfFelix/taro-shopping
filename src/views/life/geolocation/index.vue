<template>
  <div class="geolocation">
    <Header class="navbar" :show-more="true">切换城市</Header>
    <div class="search-wrapper">
      <div class="search">
        <img src="~common/images/search.png" alt="搜索" class="search-icon">
        <input type="text" placeholder="北京/beingjing/bj" class="search-input">
      </div>
      <div class="address">
        当前定位:
        <img src="~common/images/dizhi.png" alt="地址" class="address-icon">
        <span class="price-color">{{address}}</span>
      </div>
    </div>
    <div class="item">
      <h1 class="title">最近访问</h1>
      <ul class="content">
        <li>深圳市</li>
        <li>深圳市</li>
        <li>深圳市</li>
        <li>深圳市</li>
        <li>深圳市</li>
        <li>深圳市</li>
      </ul>
    </div>
    <div class="item">
      <h1 class="title">A</h1>
      <ul class="content">
        <li>阿北藏族羌族水水水水水水水水</li>
        <li>深圳市</li>
        <li>深圳市</li>
        <li>深圳市</li>
        <li>深圳市</li>
        <li>深圳市</li>
      </ul>
    </div>
    <div id="allmap"></div>
  </div>
</template>

<script>
import Header from 'components/Header'
import Geolocation from 'util/geolocation'
export default {
  components: {
    Header
  },
  data: () => ({
    address: ''
  }),
  mounted() {
    this.getGeolocation()
  },
  methods: {
    async getGeolocation() {
      let geolocation = new Geolocation()
      let result = await geolocation.getIP()
      this.address = result.name
    }
  }
}
</script>

<style lang="scss" scoped>
.geolocation{
  .navbar{
    background: #000;
    color: #fff;
  }
  .search-wrapper{
    height: 116px;
    padding: 25px 15px;
    box-sizing: border-box;
    background: #fff;
    .search{
      display: flex;
      align-items: center;
      border: 1px solid #DEDEDE;
      height: 45px;
      border-radius: 5px;
      .search-icon{
        width: 20px;
        height: 20px;
        margin: 0 10px 0 17px;
      }
      .search-input{
        height: 100%;
        width: 100%;
        font-size: 15px;
        &::input-placeholder{
          color: #999999;
        }
      }
    }
    .address{
      display: flex;
      align-items: flex-end;
      margin-top: 7px;
      color: #4A4A4A;
      font-size: 12px;
      .address-icon{
        width: 20px;
        height: 20px;
      }
    }
  }
  .item {
    .title{
      height: 50px;
      line-height: 50px;
      color: #4A4A4A;
      font-size: 15px;
      font-weight: bold;
      padding: 0 15px;
    }
    .content{
      background: #fff;
      padding-bottom: 15px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      li{
        margin: 15px 10px 0 ;
        padding: 12px 5px;
        text-align: center;
        border: 1px solid #dedede;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 12px;
        color: #4A4A4A;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
