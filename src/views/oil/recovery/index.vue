<template>
  <div class="recovery">
    <header>
      <i class="cubeic-back back" @click="$router.go(-1)"></i>
      加油卡回收
    </header>
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="list"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <div class="content-wrapper">
          <div class="item" v-for="item in list" :key="item.id">
            <h1>
              <span>产品名称：{{item.cardUser}}</span>
              <span>{{statusFilter(item.status)}}</span>
            </h1>
            <ul>
              <li>订单编号：{{item.idUrl}}</li>
              <li>时间：{{item.orderTime}}</li>
              <li>卡号：{{item.idBackUrl}}</li>
              <li>卡密：{{item.memo}}</li>
              <li>售价：{{item.orderNum|toPrice}}</li>
              <li>服务费：{{item.serviceFee|toPrice}}</li>
              <li><span>税费：{{item.taxFee|toPrice}}</span><span class="total">合计：{{item.totalAmount|toPrice}}</span></li>
            </ul>
            <button class="return-back" @click="goDetail(item.id,item.status)">回收</button>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    page: 1,
    limit: 10,
    list: [],
    pullDownRefresh: true,
    pullDownRefreshThreshold: 60,
    pullDownRefreshStop: 40,
    pullDownRefreshTxt: 'Refresh success',
    pullUpLoad: true,
    pullUpLoadThreshold: 0,
    pullUpLoadMoreTxt: 'Load more',
    pullUpLoadNoMoreTxt: 'No more data',
  }),
  computed: {
    ...mapGetters({
      token: 'getToken',
      statusList: 'oil/getStatusList'
    }),
    offset () {
      return (this.page - 1) * this.limit + 1
    },
    options() {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      }
    },
    pullDownRefreshObj() {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        txt: this.pullDownRefreshTxt
      } : false
    },
    pullUpLoadObj() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      } : false
    }
  },
  created() {
    console.log(this)
    this.getList()
  },
  methods: {
    async getList() {
      const { getRecoveryList } = await import(/* webpackPrefetch: true */ 'api')
      const { token, offset, limit } = this
      const args = JSON.parse(JSON.stringify({ token, offset, limit }).replace(/limit/g, 'rows'))
      const { code, data, message } = await getRecoveryList(args)
      if (code !== '1') this.$toast(message)
      this.list = [...this.list, ...data]
      if (data.length < this.limit) {
        return this.pullUpLoad = false
      }
    },
    initData() {
      this.list = []
      this.page = 1
      this.limit = 10
    },
    onPullingDown() {
      this.initData()
      this.getList()
    },
    onPullingUp() {
      this.getList()
    },
    goDetail(id, status) {
      if (status == 0) {
        this.$router.push({ path: '/oil/oilRecovery', query: { id: id } })
      }
    },
    statusFilter (status) {
      const statusOption = this.statusList.reduce((pre, cur) => {
        pre[cur.value] = cur.label
        return pre
      }, {})
      return statusOption[status]
    }
  }
}
</script>

<style lang="scss" scoped>
.recovery{
  min-height: 100%;
  background: #fff;
  header{
    text-align: center;
    position: relative;
    font-size: 18px;
    color: #FEFEFE;
    background: #373C48;
    line-height: 44px;
    .back{
      position: absolute;
      left: 15px;
      font-size: 29px;
    }
  }
  .scroll-list-wrap{
    height: calc(100vh - 44px);
    .cube-scroll-content{
      .cube-scroll-list-wrapper{
        .content-wrapper{
          padding-bottom: 20px;
          .item{
            margin: 20px 15px 0;
            border: 1px solid #DEDEDE;
            border-radius: 5px; /*no*/
            h1{
              padding: 0 15px 0 12px;
              font-size: 15px;
              color: #4A4A4A;
              display: flex;
              justify-content: space-between;
              line-height: 44px;
            }
            ul{
              padding: 15px 15px 15px 12px;
              background: rgba(244,244,244,1);
              li{
                margin-top: 15px;
                color: #4A4A4A;
                position: relative;
                .total{
                  position: absolute;
                  right: 0;
                  bottom: 2px;
                  font-size: 15px;
                }
                &:first-of-type{
                  margin-top: 0;
                }
              }
            }
            .return-back{
              width: 100%;
              height: 44px;
              border-radius: 0 0 5px 5px;
              background: #30CE84;
              color: #fff;
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>
