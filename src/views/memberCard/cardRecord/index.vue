<template>
  <div class="record-wrapper">
    <header>
      <i class="cubeic-back back" @click="$router.push({name:'memberCard'})"></i>
      兑换记录
    </header>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :data="orderList" :options="options" @pulling-up="onPullingUp" v-if="orderList.length!=0">
          <ul class="item" v-for="(item,index) in orderList" :key="index">
            <li class="title">
              <span class="order-number">
                产品名称：{{item.cardUser}}
              </span>
              <span class="status" v-if="item.status == 0">兑换中</span>
              <span class="status" v-else-if="item.status == 1">兑换成功</span>
              <span class="status" v-else>兑换失败</span>
            </li>
            <li>订单编号:&nbsp;{{item.idUrl}}</li>
            <li>时间：{{item.orderTime}}</li>
            <li v-if="item.idUrl.length==30 && item.orderNum">卡密：{{item.orderNum}} <button class="copy" @click.stop="handleCopy(item.orderNum,$event)">复制</button></li>
            <li v-if="item.idUrl.length==30 && item.idBackUrl">卡号：{{item.idBackUrl}}</li>
            <li v-if="item.idUrl.length==30 && item.cardNum">有效日期：{{item.cardNum}}</li>
            <li v-if="item.idUrl.length==30 && item.memo && item.memo!='兑换卡券成功'">兑换码：<a :href="item.memo">{{item.memo}}</a></li>
            <li v-if="item.idUrl.length==32">充值账号：{{item.cardNum}}</li>
            <li v-if="item.idUrl.length==32">类型：
              <span v-if="item.cardBank==1">周卡</span>
              <span v-else-if="item.cardBank==2">月卡</span>
              <span v-else-if="item.cardBank==3">季卡</span>
              <span v-else-if="item.cardBank==4">半年卡</span>
              <span v-else>年卡</span>
            </li>
            <li>售价：{{item.repaymentAmount|toPrice}}</li>
            <li>
              <span class="tax_fee">税费：{{item.taxFee|toPrice}}</span>
              <span class="total">合计：{{item.totalAmount|toPrice}}</span>
            </li>
          </ul>
        </cube-scroll>
        <no-data :data="orderList"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
import { vipOrderList } from 'api';
import { mapGetters } from 'vuex';
import clip from 'util/clipboard'
export default {
  data: () => ({
    orderList: [],
    pullUpLoad: true,
    pullUpLoadThreshold: 0,
    pullUpLoadMoreTxt: '上拉加载更多...',
    pullUpLoadNoMoreTxt: '没有更多数据了~~',
    pageSize: 10,
    tenFlag: true,
    pageNum: 1
  }),
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj,
      }
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      } : false
    },
    offset() {
      return (this.pageNum - 1) * this.pageSize + 1;
    },
    ...mapGetters({
      getToken: 'getToken',
    }),
  },
  methods: {
    async vipOrderList() {
      let data = await vipOrderList({ token: this.getToken, offset: this.offset, rows: this.pageSize });
      if (data.code != 1) { return this.$toast(data.message); }
      if (data.data.length >= 10){ this.tenFlag = true; }
      else { this.tenFlag = false; }
      this.orderList.push(...data.data);
    },
    onPullingUp() {
      if (this.tenFlag === true) {
        this.pageNum++;
        this.vipOrderList();
      }
      if (!this.tenFlag && this.orderList.length > 0) {
        this.$refs.scroll.forceUpdate();
      }
    },
     handleCopy(text, event) {
      clip(text, event)
    },
  },
  mounted() {
    this.vipOrderList()
  },
  components: {
    NoData: () => import('components/NoData')
  },
}
</script>

<style lang="scss" scoped>
.record-wrapper {
  background: #FFF;
  min-height: 100%;
  header{
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
    background: #373C48;
    font-size: 18px;
    color: #fff;
    .back {
      position: absolute;
      left: 15px;
      font-size: 18px;
    }
  }
  .content {
    padding: 0 15px;
    box-sizing: border-box;
    .item {
      border: 1px solid rgba(222, 222, 222, 1);
      border-radius: 5px;
      margin-top: 20px;
      border-top: none;
      li {
        padding:15px 15px 0 ;
        color: #4A4A4A;
        font-size: 12px;
        background: #F4F4F4;
        word-break: break-all;
        &.title {
          border-top: 1px solid rgba(222, 222, 222, 1);
          line-height: 43px;
          padding-top: 3px;
          display: flex;
          justify-content: space-between;
          background: #fff;
          font-size: 13px;
          border-radius: 5px 5px 0 0;
        }
        &:last-of-type {
          padding-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 0 0 5px 5px;
        }
        .total{
          font-size: 15px;
        }
        a{
          color: blue;
          text-decoration: underline;
        }
        .copy{
          background: transparent;
          border: none;
          color: #585858;
          font-size: 13px;
          padding: 1px 10px;
          border: 1px solid #585858;
          border-radius: 25px; /*no*/
          position: absolute;
          right: 24px;
        }
      }
    }
  }
}

.scroll-list-wrap {
  height: calc(100vh - 44px);
  transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
  overflow: hidden
}
</style>
