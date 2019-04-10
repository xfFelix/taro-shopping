<template>
  <div class="list">
    <Header>预订记录</Header>
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      show-slider
      @click="clickHandler"
      @change="changeHandler">
    </cube-tab-bar>
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="list"
        :options="scrollOptions"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <list :list="list"></list>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import {getOrderList} from 'api'
import {mapGetters} from 'vuex'
const statusList = [
  {label: '全部', value: 8},
  {label: '未使用', value: 0},
  {label: '已使用', value: 1},
  {label: '已过期', value: 2},
  {label: '取消', value: 3}
]
export default {
  components: {
    'Header': () => import('components/Header'),
    List: () => import('./components/List')
  },
  data: () => ({
    selectedLabelDefault: '全部',
    tabs: [{label: '全部'}, {label: '未使用'}, {label: '已使用'}, {label: '已过期'}, {label: '取消'}],
    pageNum: 1,
    pageSize: 10,
    list: [],
    pullDownRefresh: true,
    pullDownRefreshThreshold: 60,
    pullDownRefreshStop: 40,
    pullDownRefreshTxt: '刷新成功',
    pullUpLoad: true,
    pullUpLoadThreshold: 0,
    pullUpLoadMoreTxt: '加载更多',
    pullUpLoadNoMoreTxt: '没有更多数据了~~',
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken'
    }),
    offset() {
      return (this.pageNum-1)*this.pageSize + 1
    },
    scrollOptions() {
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
    this.getList()
  },
  methods: {
    onPullingDown() {
      this.initData()
      this.getList()
    },
    initData() {
      this.pageNum = 1
      this.list = []
      this.pullDownRefresh = true
      this.pullUpLoad = true
    },
    onPullingUp() {
      this.getList()
    },
    async getList() {
      let status = this.statusFilter()
      let data = await getOrderList({token: this.getToken,offset: this.offset,rows: this.pageSize, status})
      if (data.code !== '1') {
        this.$toast(data.message)
      }
      this.list.push(...data.data)
      this.pullUpLoad = data.data.length === this.pageSize
      if (!this.pullUpLoad) return this.$refs.scroll.forceUpdate()
      this.pageNum ++
    },
    statusFilter(label) {
      let statusOptionsKeyValue = statusList.reduce((acc, cur) => {
        acc[cur.label] = cur.value
        return acc
      }, {})
      console.log(this.selectedLabelDefault)
      return statusOptionsKeyValue[this.selectedLabelDefault]
    },
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
      this.initData()
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.cube-tab{
  div{
    font-size: 14px;
  }
}
.cube-tab_active {
    color: #30ce84;
}
.cube-tab-bar-slider{
  background-color: #30ce84;
}
.cube-tab-bar{
  background-color: #fff;
}
</style>


<style lang="scss" scoped>
.scroll-list-wrap{
  height: calc(100vh - 79px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
  overflow: hidden;
}
</style>
