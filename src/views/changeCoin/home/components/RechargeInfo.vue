<template>
  <transition name="slideUp" mode="out-in">
    <div class="info-wrapper" v-if="show">
      <ul class="info">
        <li class="header">
          <i class="cubeic-back" @click="$emit('go-back')"></i>
          <span class="title">确认兑换</span>
        </li>
        <li class="price">
          {{coinInfo.total|toPrice}}
        </li>
         <li class="item">
          <span class="label">商品名称</span>
          <span class="value">{{coinInfo.moneyNum}}椰子分兑换{{coinInfo.num|toDecimal2Fp}}金币</span>
        </li>
        <li class="item">
          <span class="label">充值账号</span>
          <span class="value">{{userinfo.userName}}</span>
        </li>
        <li class="item">
          <span class="label">服务费</span>
          <span class="value">{{coinInfo.service_fee | toPrice}}</span>
        </li>
        <li class="item">
          <span class="label">税费</span>
          <span class="value">{{coinInfo.tax_total | toPrice}}</span>
        </li>
        <li class="item">
          <span class="label">应付合计</span>
          <span class="value">{{coinInfo.total | toPrice}}</span>
        </li>
      </ul>
      <div class="footer">
        <button class="confirm" @click="handlerShowCode">确认</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    coinInfo: {
      type: Object
    }
  },
  computed: {
  ...mapGetters({
    userinfo: 'getUserinfo',
  }),
  },
  data: () => ({
    data: {},
    confirmBtn: false
  }),
  watch: {
    show(val) {
      if (val) {
        // this.getCostInfo()
      }
    }
  },
  methods: {
    handlerShowCode() {
      this.$emit('handler-show-code');
    }
  }
}
</script>
<style lang="scss" scoped>
.info-wrapper {
  position: fixed;
  z-index: 11;
  background: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  .info {
    padding: 0 18px 0;
    color: #8B8B8B;
    font-size: 13px;
    .header {
      padding: 20px 0 21px 0;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #111010;
      position: relative;
      i {
        position: absolute;
        left: 0;
      }
    }
    .price {
      padding: 40px 0 0 0;
      margin-bottom: 45px;
      font-size: 30px;
      color: #111010;
      font-weight: bold;
      text-align: center;
      position: relative;
      &::before {
        position: absolute;
        display: block;
        content: '';
        width: 100%;
        height: 1px;
        background: #d3d3d3;
        top: 0;
      }
    }
    .item {
      margin-top: 35px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px 0 12px;
      font-weight: 400;
      .label {
        color: #999;
      }
      .value {
        color: #4a4a4a;
      }
    }
  }
  .footer {
    margin-top: 36px;
    .confirm {
      border: none;
      background: #30CE84;
      width: 100%;
      padding: 11px 0;
      color: #fff;
      font-size: 15px;
      font-weight: 400;
    }
  }
}
</style>
<style>
@media screen and (min-width: 600px) {
  .info {
    max-width: 384px;
    /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
