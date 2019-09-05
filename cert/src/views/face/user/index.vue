<template>
  <div class="user-wrapper">
    <Header :show-back="false">{{$route.meta.title}}</Header>
    <div class="content">
      <div class="icon-wrapper">
        <span class="iconfont icon-user"><i class="iconfont icon-success"></i></span>
        <h1>真实身份认证</h1>
      </div>
      <div class="input-item">
        <div class="pre">真实姓名</div>
        <input type="text" placeholder="请输入姓名" v-model="name">
      </div>
      <div class="input-item">
        <div class="pre">证件号码</div>
        <input type="text" placeholder="请输入证件号码" v-model="idcard">
      </div>
      <button class="btn-next" @click="validate">下一步</button>
      <div class="hint">
        <h2>温馨提示：</h2>
        <p>您本次代征合同电子签约一共需要分三步完成：1.身份验证通过  2. 实人刷脸认证通过   3.电子合同签约完成。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Loading from '@/util/loading'
export default {
  data: () => ({
    name: '',
    idcard: ''
  }),
  methods: {
    ...mapActions({
      setConfig: 'face/setConfig'
    }),
    validate() {
      if (!this.name) return this.$toast('请输入姓名')
      if (!this.idcard) return this.$toast('请输入证件号码')
      this.goNext()
    },
    async goNext() {
      let loading = new Loading('身份验证中...')
      try {
        loading.show()
        const { checkInfoByFace } = await import('api')
        const { data, code, msg } = await checkInfoByFace({idNo: this.idcard, name: this.name})
        this.setConfig({name: this.name, idcard: this.idcard, accountId: data.accountId})
        loading.hide()
        this.$router.push('select')
      } catch (e) {
        this.$toast(e)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.user-wrapper{
  font-family: PingFang SC;
  .content{
    padding: 0 15px;
    .icon-wrapper{
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon-user{
        font-size: 50px;
        color: #30CE84;
        position: relative;
        .icon-success{
          position: absolute;
          bottom: 0;
          right: -10px;
          color: #FEB009;
          background: #fff;
          border-radius: 50%;
          font-size: 20px;
        }
      }
      h1{
        font-size: 15px;
        color: #333333;
        font-weight:500;
        margin-top: 5px;
      }
    }
    .input-item{
      display: flex;
      height: 60px;
      align-items: center;
      border-bottom: 1px solid rgba(246,246,246,1);
      font-size: 15px;
      .pre{
        flex: 0 0 100px;
        color: #666666;
      }
      input{
        flex: 1;
        color: #333333;
        font-weight: bold;
      }
    }
    .btn-next{
      height:44px;
      font-size: 15px;
      background:rgba(48,206,132,1);
      box-shadow:0px 1px 7px 0px rgba(48,206,132,0.68);
      border-radius:5px;
      border: none;
      width: 100%;
      color: #fff;
      margin-top: 20px;
      letter-spacing: 3px;
    }
    .hint{
      margin-top: 28px;
      h2{
        font-size:13px;
        font-weight:500;
        color:rgba(102,102,102,1);
      }
      p{
        margin-top: 11px;
        font-size:12px;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:15px;
      }
    }
  }
}
</style>
