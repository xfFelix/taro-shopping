<template>
  <div class="life-record">
    <Header class="navbar" :show-more="true">缴费记录</Header>
    <div class="record-select-wrap">
      <div class="all-select">
        <div @click="showPicker" class="select-name">
          <span>{{typeName}}</span>
          <i class="cubeic-back" :style="showDialog?'transform: rotate(270deg);':'transform: rotate(90deg);'"></i>
        </div>
        <!-- <ul v-show="showDialog">
          <li>水费</li>
          <li>电费</li>
          <li>燃煤费</li>
        </ul> -->
      </div>
    </div>

    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :data="orderList" :options="options" @pulling-up="onPullingUp" v-if="orderList.length!=0">
          <ul class="item" v-for="(item,index) in orderList" :key="index">
            <li class="title">
              <span class="order-number">
                产品名称：{{item.cardBank + '元' + findNameByType(item.cardSubBank) + '直充'}}
              </span>
              <span class="status" v-if="item.status == 0">兑换中</span>
              <span class="status" v-else-if="item.status == 1">兑换成功</span>
              <span class="status" v-else>兑换失败</span>
            </li>
            <li>时间：{{item.addDate}}</li>
            <li>充值账号：{{item.cardNum}}</li>
            <li>售价：{{(item.repaymentAmount + item.serviceFee)|toPrice}}</li>
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
import { getLogsByLife } from 'api';
import { mapGetters } from 'vuex';
import mixin from '../mixin'
export default {
  mixins: [mixin],
  data: () => ({
    orderList: [],
    pullUpLoad: true,
    pullUpLoadThreshold: 0,
    pullUpLoadMoreTxt: '上拉加载更多...',
    pullUpLoadNoMoreTxt: '没有更多数据了~~',
    pageSize: 10,
    tenFlag: true,
    pageNum: 1,
    showDialog: false,
    type: 0,
    typeName: '全部',
    list: [
      {text: '全部', value: 0},
      {text: '电费', value: 13},
      {text: '水费', value: 12},
      {text: '燃煤费', value: 14},
    ]
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
      return (this.pageNum - 1) * this.pageSize;
    },
    ...mapGetters({
      getToken: 'getToken',
    }),
  },
  methods: {
    async getList() {
      const { error_code, data } = await getLogsByLife({ token: this.getToken, start: this.offset, type: this.type || undefined });
      if (error_code) return
      if (data.length >= 10) { this.tenFlag = true; }
      else { this.tenFlag = false; }
      this.orderList.push(...data);
    },
    onPullingUp() {
      console.log(this.tenFlag)
      if (this.tenFlag === true) {
        this.pageNum++;
        this.getList();
      }
      if (!this.tenFlag && this.orderList.length > 0) {
        this.$refs.scroll.forceUpdate();
      }
    },
    initData() {
      this.orderList = []
      this.pageSize = 10,
      this.tenFlag = true,
      this.pageNum = 1,
      this.showDialog = false
    },
    showPicker() {
      this.showDialog=true
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '选择类型',
          data: [this.list],
          onSelect: (val, i, text) => {
            this.initData()
            this.type = +val.join('')
            this.typeName = text.join('')
            this.getList()
          },
          onCancel: () => { this.showDialog = false}
        })
      }
      this.picker.show()
    },
    // selectHandle(selectedVal, selectedIndex, selectedText) {
    //   this.$createDialog({
    //     type: 'warn',
    //     content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
    //     icon: 'cubeic-alert'
    //   }).show()
    // }
  },
  mounted() {
    this.getList()
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
      padding: 15px;
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
