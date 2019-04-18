<template>
  <transition name="slide-left" mode="out-in">
    <div class="oilChanges">
        <div class="changeIconW">
            <span class="changeIcon iconfont">&#xe631;</span>
        </div>
        <p class="changeWord">兑换成功</p>
        <p class="changeMoney">{{data.totalAmount|toPrice}}</p>
        <ul class="changeInfo">
            <li>
                <span>商品名</span>
                <span>{{data.cardUser}}</span>
            </li>
            <li>
                <span>卡号</span>
                <span v-if="data.cardId === 1">{{data.cardNum}}</span>
                <span v-else-if="data.cardId === 2">{{data.idBackUrl}}</span>
            </li>
            <li v-if="data.cardId === 2">
                <span>卡密</span>
                <span>{{data.memo}}</span>
            </li>
            <li>
                <span>售价</span>
                <span>{{data.repaymentAmount|toPrice}}</span>
            </li>
            <li>
                <span>服务费</span>
                <span>{{data.serviceFee|toPrice}}</span>
            </li>
            <li>
                <span>税费</span>
                <span>{{data.taxFee|toPrice}}</span>
            </li>
            <li>
                <span>应付合计</span>
                <span>{{data.totalAmount|toPrice}}</span>
            </li>
        </ul>
        <router-link :to="{path:'/oil'}" class="changeConfim" v-if="data.cardId === 1">完成</router-link>
        <div class="changeGo" v-else-if="data.cardId === 2">
            <router-link :to="{path:'/oil/oilRecovery'}" class="cRecove">回收</router-link>
            <router-link :to="{path:'/oil'}" class="cConfim">完成</router-link>
        </div>
    </div>
  </transition>
</template>
<script>
import {getOilOrderDetail} from 'api';
import { mapGetters } from 'vuex';
import {isEmpty} from 'util/common';
export default {
    data: () => ({
      data: {}
    }),
    created() {
      this.getDetail()
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
        .changeIcon {
            width: 84px;
            height: 84px;
            color: #fff;
            background: #30CE84;
            border-radius: 50%;
            text-align: center;
            line-height: 84px;
            font-size: 48px;
            margin: 63px auto 20px auto;
            display: inline-block;
        }
    }
    .changeWord {
        font-size: 18px;
        color: #000000;
    }
    .changeMoney {
        font-size: 30px;
        font-weight: bold;
        color: #000000;
        padding: 10px 0 20px 0;
        margin: 0 17px;
        border-bottom: 1px solid #DEDEDE;
    }
    .changeInfo {
        padding: 20px 0;
        li {
            display: flex;
            justify-content: space-between;
            margin: 0 35px;
            font-size: 13px;
            line-height: 45px;
            span:first-of-type {
                color: #8B8B8B;
            }
            span:last-of-type {
                color: #000000;
            }
        }
    }
    .changeConfim,
    .changeGo {
        line-height: 40px;
        font-size: 18px;
        width: 340px;
        margin: 0 auto;
    }
    .changeConfim {
        background: #30CE84;
        color: #fff;
        display: inline-block;
        border-radius: 40px;
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
