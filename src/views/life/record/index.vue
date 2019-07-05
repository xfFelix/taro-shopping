<template>
  <div class="life-record">
    <Header class="navbar" :show-more="true">兑换记录</Header>
    <div class="record-select-wrap">
      <div class="all-select">
        <div @click="showDialog=true" class="select-name">
          <span>全部费种</span>
          <i class="cubeic-back" :style="showDialog?'transform: rotate(270deg);':'transform: rotate(90deg);'"></i>
        </div>
        <ul v-show="showDialog">
          <li>水费</li>
          <li>电费</li>
          <li>燃煤费</li>
        </ul>
      </div>
    </div>

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
            <li>时间：{{item.orderTime}}</li>
            <li>充值账号：{{item.cardNum}}</li>
            <li>类型：
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
    <bg-mask v-model="showDialog" color="transparent"></bg-mask>
  </div>
</template>

<script>
import { vipOrderList } from 'api';
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    orderList: [],
    pullUpLoad: true,
    pullUpLoadThreshold: 0,
    pullUpLoadMoreTxt: '上拉加载更多...',
    pullUpLoadNoMoreTxt: '没有更多数据了~~',
    pageSize: 10,
    tenFlag: true,
    pageNum: 1,
    showDialog: false
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
      if (data.data.length >= 10) { this.tenFlag = true; }
      else { this.tenFlag = false; }
      this.orderList.push(...data.data);
    },
    onPullingUp() {
      console.log(this.tenFlag)
      if (this.tenFlag === true) {
        this.pageNum++;
        this.vipOrderList();
      }
      if (!this.tenFlag && this.orderList.length > 0) {
        this.$refs.scroll.forceUpdate();
      }
    },
  },
  mounted() {
    this.vipOrderList()
  },
  components: {
    NoData: () => import('components/NoData'),
    Header: () => import('@/components/Header'),
    BgMask: () => import("@/components/BgMask"),
  },
}
</script>

<style lang="scss" scoped>
.life-record {
  min-height: 100%;
  background: #fff;
  .navbar {
    background: #373C48;
    color: #fff;
  }
  .record-select-wrap {
    .all-select {
      padding: 25px 15px;
      font-size: 15px;
      background: #fff;
      position: relative;
      .select-name {
        width: 98px;
      }
      i {
        transform: rotate(270deg);
        display: inline-block;
        margin-left: 5px;
        transition: all 0.1s ease 0s;
      }
      ul {
        position: absolute;
        background: #666;
        color: #eee;
        width: 98px;
        font-size: 14px;
        z-index: 1;
        li {
          padding: 5px 2px 5px 5px;
          border-bottom: 1px solid #999;
          &:last-of-type {
            border: none;
          }
        }
      }
    }
  }
  .content {
    padding: 0 15px;
    box-sizing: border-box;
    .item {
      border: 1px solid rgba(222, 222, 222, 1);
      border-radius: 5px;
      margin-top: 20px;
      li {
        padding: 15px 15px 0;
        color: #4A4A4A;
        font-size: 12px;
        background: #F4F4F4;
        &.title {
          height: 43px;
          line-height: 43px;
          padding-top: 0;
          display: flex;
          justify-content: space-between;
          background: #fff;
          font-size: 13px;
        }
        &:last-of-type {
          padding-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .total {
          font-size: 15px;
        }
      }
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
}

.scroll-list-wrap {
  height: calc(100vh - 114px);
  transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
  overflow: hidden
}
</style>
