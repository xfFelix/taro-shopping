<template>
  <div class="ad-orderW">
    <p class="ad-orderTitle">门票</p>
    <ul>
      <li v-for="(item,index) in ticketListC" :key="index">
        <div class="ad-orderName">{{item.uutitle}}</div>
        <div class="ad-orderMoneyW">
          <p>{{item.uutprice|toDecimal2}}</p>
          <p>
             <router-link :to="{path:'settlement',query:{id:item.uuid}}">
               立即预订
              </router-link>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:{
    ticketListC:Array
  },
  data: () => ({

  }),
  methods: {

  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
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
      justify-content: space-between;
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
          a{
    background-color: #30ce84;
          border-radius: 30px;
          color: #ffffff;
          margin-top: 8px;
          display: inline-block;
          padding: 8px 12px;
          }

        }
      }
    }
    li:last-of-type {
      border: none;
    }
  }
}
</style>
