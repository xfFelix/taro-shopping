<template>
  <transition name="slide-left" mode="out-in">
    <div class="oilChanges">
        <div class="changeIconW">
            <span class="changeIcon iconfont">&#xe631;</span>
            <p class="changeWord">提交成功</p>
        </div>
        <p class="changeMoney">{{data.totalAmount|toPrice}}</p>
        <ul class="changeInfo">
            <li>
                <span>产品名称:</span>
                <span>{{data.cardUser}}</span>
            </li>
            <li v-if="data.cardId === 1">
                <span>充值账号:</span>
                <span>{{data.cardNum}}</span>
                <!-- <span v-else-if="data.cardId === 2">{{data.idBackUrl}}</span> -->
            </li>
            <!-- <li v-if="data.cardId === 2">
                <span>卡密:</span>
                <span>{{data.memo}}</span>
            </li> -->
            <li>
                <span>售价:</span>
                <span>{{data.orderNum|toPrice}}</span>
            </li>
            <li>
                <span>服务费:</span>
                <span>{{data.serviceFee|toPrice}}</span>
            </li>
            <li>
                <span>税费:</span>
                <span>{{data.taxFee|toPrice}}</span>
            </li>
            <li>
                <span>应付合计:</span>
                <span>{{data.totalAmount|toPrice}}</span>
            </li>
        </ul>
        <div class="changeConfim" @click="goHome">确定</div>
        <span class="time"><em class="price-color">{{this.time}}s</em>后自动跳转至首页</span>
    </div>
  </transition>
</template>
<script>
import {getOilOrderDetail} from 'api';
import { mapGetters } from 'vuex';
import {isEmpty} from 'util/common';
import { clearInterval } from 'timers';
export default {
    data: () => ({
      data: {},
      time: 0
    }),
    created() {
      this.getDetail()
    },
    mounted() {
      this.countdown()
    },
    computed: {
      ...mapGetters({
        token: 'getToken'
      })
    },
    methods: {
      async getDetail() {
        if (isEmpty(this.$route.query)) return this.$toast('id is null')
        let res = await getOilOrderDetail({token: this.token, id: this.$route.query.id})
        if (res.code !== '1') return this.$toast(res.message)
        this.data = res.data
      },
      countdown () {
        this.time = 5
        this.timeout = setInterval(() => {
          if (this.time > 0) {
            this.time--
          } else {
            window.clearInterval(this.timeout)
            this.$router.push('/oil')
          }
        }, 1000);
      },
      goHome() {
        window.clearInterval(this.timeout)
        this.$router.push('/oil')
      }
    }
}
</script>
<style lang="scss" scoped>
.oilChanges {
    background: #fff;
    height: 100%;
    width: 100%;
    text-align: center;
    .changeIconW {
      display: flex;
      padding-top: 77px;
      justify-content: center;
        .changeIcon {
            width: 34px;
            height: 34px;
            line-height: 34px;
            color: #30CE84;
            background: #fff;
            border-radius: 50%;
            border: 2px solid #30CE84;
            text-align: center;
            font-size: 26px;
            display: inline-block;
            position: relative;
            &::before{
              content: '';
              display: block;
              width: 10px;
              height: 6px;
              border-radius: 50%;
              position: absolute;
              top: 0;
              left: 0;
              background: #fff;
            }
        }
        .changeWord {
            font-size: 30px;
            line-height: 38px;
            color: #30CE84;
            margin-left: 22px;
        }
    }
    .changeMoney {
        font-size: 36px;
        color: #30CE84;
        padding: 10px 0 20px 0;
        margin: 21px 15px;
        border-bottom: 1px solid #DEDEDE; /*no*/
    }
    .changeInfo {
        padding: 20px 0;
        li {
            display: flex;
            margin: 0 35px;
            font-family: PingFang-SC-Regular;
            font-size: 15px;
            line-height: 45px;
            color: rgba(74, 74, 74, 1);
            span:last-of-type{
              margin-left: 20px;
            }
        }
    }
    .changeConfim,
    .changeGo {
        line-height: 44px;
        font-size: 15px;
        width: 345px;
        margin: 0 auto;
    }
    .changeConfim {
        background: #30CE84;
        color: #fff;
        display: inline-block;
        border-radius: 5px; /*no*/
    }
    .time{
      display: block;
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
      color: #999;
    }
    .changeGo {
        display: flex;
        justify-content: space-between;
        a {
            width: 150px;
            display: inline-block;
            border-radius: 40px;
        }
        .cRecove {
            background: #fff;
            color: #30CE84;
            border: 1px solid #30CE84;
        }
        .cConfim {
            background: #30CE84;
            color: #fff;
        }
    }
}
</style>
