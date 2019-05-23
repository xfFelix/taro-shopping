<template>
  <div class="recovery">
    <header>
      <i class="cubeic-back back" @click="$router.go(-1)"></i>
      加油卡回收
    </header>
    <div class="scroll-list-wrap" v-if="list.length > 0">
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
              <li>卡密：{{item.memo}} <em class="see" @click="dialogPwd(item.idUrl)">查看</em></li>
              <li>售价：{{item.orderNum|toPrice}}</li>
              <li>服务费：{{item.serviceFee|toPrice}}</li>
              <li><span>税费：{{item.taxFee|toPrice}}</span><span class="total">合计：{{item.totalAmount|toPrice}}</span></li>
            </ul>
            <button class="return-back" @click="goDetail(item.id,item.status)">回收</button>
          </div>
        </div>
      </cube-scroll>
    </div>
    <no-data :data="list"></no-data>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  components: {
    NoData: () => import(/* webpackPrefetch: true */ 'components/NoData')
  },
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
    btnDisabledCode: false,
    time: 0,
    code: ''
  }),
  computed: {
    ...mapGetters({
      token: 'getToken',
      statusList: 'oil/getStatusList',
      userinfo: 'getUserinfo'
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
      this.pullUpLoad = !(data.length < this.limit)
      if (this.pullUpLoad) this.page++
    },
    dialogPwd(id) {
      this.$createDialog({
        type: 'alert',
        confirmBtn: {
          text: '提交',
          active: true
        },
        onConfirm: () => { this.handerConfirm(id) },
        showClose: true,
        onClose: () => {}
      }, (h) => {
        if (this.userinfo.payValidType === 1) {
          return [
            h('div', { class: { 'title-wrapper': true }, slot: 'title' }, [h('p',{ class: { text: true }}, '请输入支付密码')]),
            h('div', { class: { 'content-wrapper': true }, slot: 'content' }, [h('cube-input', { class: { 'input-code': true }, attrs: {type: 'password', eye: {open: true, reverse: true} , autofocus: true, maxlength: 6, placeholder: '请输入验证码' , pattern: '[0-9]*'},
              on: { input: (val) => { this.code = val.trim() }}
            })])
          ]
        } else {
          return [
            h('div', { class: { 'title-wrapper': true }, slot: 'title' }, [h('p',{ class: { text: true }}, '请输入验证码')]),
            h('div', { class: { 'content-wrapper': true }, slot: 'content' },
            [
              h('cube-input', { class: { 'input-code': true }, attrs: {type: 'tel', autofocus: true, maxlength: 4, placeholder: '请输入验证码' , pattern: '[0-9]*', value: this.code},
                on: { input: (val) => { this.code = val.trim() }}
              }),
              h('button', { class:{ 'sms-code': true }, on: { click: this.handlerSendCode }, attrs: { disabled: this.btnDisabledCode } }, this.time > 0? this.time + 's': '发送验证码')
            ])
          ]
        }
      }).show()
    },
    async handlerSendCode() {
      const { sendSmsCode } = await import(/* webpackPrefetch: true */ 'api')
      const { error_code, data, message } = await sendSmsCode({token: this.token})
      if (error_code) return this.$toast(message)
      this.$toast('验证码已发送')
      this.btnDisabledCode = true
      this.time = 60
      this.interval = window.setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          this.btnDisabledCode = false
          window.clearInterval(this.interval)
        }
      }, 1000)
    },
    async handerConfirm(id) {
      if (!this.code) return this.$toast('请输入数字')
      const { getPayPassword } = await import(/* webpackPrefetch: true */ 'api')
      const { code, data, message } = await getPayPassword({ token: this.token, code: this.code, orderNo: id})
      this.code = ''
      if (code !== '1') return this.$toast(message)
      this.$dialog({content: `卡密:${data}`},() => {})
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
                .see{
                  color: #30CE84;
                  text-decoration: underline;
                  margin-left: 10px;
                }
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
<style lang="scss">
.cube-dialog-main{
  .cube-dialog-alert{
    .cube-dialog-title{
      .title-wrapper{
        .text{
          padding: 15px 0;
        }
      }
    }
    .cube-dialog-content{
      .content-wrapper{
        padding: 0 15px;
        position: relative;
        .sms-code{
          position: absolute;
          right: 17px;
          top: 0;
          background: transparent;
          border: none;
          font-size: 12px;
          color: #30CE84;
          height: 100%;
        }
      }
    }
  }
}
</style>
