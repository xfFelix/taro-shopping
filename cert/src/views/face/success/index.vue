<template>
  <div class="success-wrapper">
    <Header :show-back="false">{{type == 1 ? '认证成功' : '认证失败'}}</Header>
    <div class="img-wrapper">
      <img :src="require(`common/images/${type==1 ? 'chenggong': 'fail'}.png`)" alt=" ">
    </div>
    <p class="title">{{type == 1 ? '您本次的个人认证已通过，点击进行电子合同签章！' : '个人认证失败，请重新认证！'}}</p>
    <button class="btn-next" v-if="type == 1" :class="!showTime && 'actived'" :disabled="showTime" @click="getSign">立即签约<i v-if="type == 1 && showTime">（{{time}}S）</i></button>
    <button class="btn-next actived" v-else @click="goUser">返回首页</button>
  </div>
</template>
<script>
import { getParam } from '@/util/common'
import { mapGetters, mapActions } from 'vuex';
import Loading from 'util/loading'
export default {
  data: () => ({
    type: 1,
    time: 5,
    showTime: true
  }),
  async beforeRouteEnter(to, from ,next) {
    let result = getParam()['result']
    let accountId = getParam()['accountId']
    let loading = new Loading(`跳转签章页面...`)
    if (!result) {
      result = to.query.result
      accountId = to.query.accountId
    }
    try {
      if (result == 1) {
        loading.show()
        const { getSignByFace } = await import('api')
        const { code, data, msg } = await getSignByFace({accountId})
        loading.hide()
        window.location.href = data.url
        next(false)
      } else {
        next()
      }
    } catch (e) {
      this.$toast(e)
    }
  },
  async created() {
    const result = getParam()['result']
    const accountId = getParam()['accountId']
    this.setConfig({accountId})
    this.type = result
    if (result != 1) {
      // this.getTimeout()
    } else {

    }
  },
  computed: {
    ...mapGetters({
      config: 'face_config'
    })
  },
  methods: {
    ...mapActions({
      setConfig: 'face/setConfig'
    }),
    goUser() {
      this.$router.push('user')
    },
    getTimeout() {
      clearInterval(this.timeout)
      this.timeout = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          this.showTime = false
        }
      }, 1000);
    },
    async getSign() {
      let loading = new Loading(`跳转签章页面...`)
      try {
        loading.show()
        const { getSignByFace } = await import('api')
        const { code, data, msg } = await getSignByFace({accountId: this.config.accountId})
        loading.hide()
        window.location.href = data.url
      } catch (e) {
        this.$toast(e)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.success-wrapper{
  font-family:PingFang SC;
  .img-wrapper{
    img{
      display: block;
      width: 68px;
      height: 68px;
      border: none;
      margin: 91px auto 0;
    }
  }
  .title{
    margin-top: 30px;
    font-size:14px;
    font-weight:bold;
    color:rgba(78,78,78,1);
    text-align: center;
  }
  .btn-next{
    margin-top: 66px;
    width:185px;
    height:40px;
    background:rgba(98,98,98,.3);
    border-radius:5px;
    border: none;
    margin-left: auto;
    margin-right: auto;
    display: block;
    font-size:16px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:15px;
    &.actived{
      background: rgba(48,206,132,1);
    }
  }
}
</style>
