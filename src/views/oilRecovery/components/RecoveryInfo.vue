<template>
  <transition name="slideUp" mode="out-in">
    <ul class="info" v-if="show">
      <li class="header">
        <i class="cubeic-back" @click="$emit('go-back-init')"></i>
        <span class="title">确认申请表</span>
      </li>
      <li class="priceTitle">回收价</li>
      <li class="price">
        {{recoveryListC.disPrice|toPrice}}
      </li>
      <li class="item">
        <span class="label">商品</span>
        <span class="value">{{recoveryListC.cardUser}}</span>
      </li>
      <li class="item">
        <span class="label">回收价</span>
        <span class="value">{{recoveryListC.disPrice|toPrice}}</span>
      </li>
      <li class="item">
        <span class="label">收款人</span>
        <span class="value">{{recoveryListC.payeeName}}</span>
      </li>
      <li class="item">
        <span class="label">银行</span>
        <span class="value">{{recoveryListC.openBank[0]}}</span>
      </li>
      <li class="item">
        <span class="label">银行卡号</span>
        <span class="value">{{recoveryListC.bankNum}}</span>
      </li>
      <li class="footer">
        <button class="confirm" @click="handlerShowCode">提交</button>
      </li>
    </ul>
  </transition>
</template>

<script>
import { getCostInfo } from 'api';
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    recoveryListC: {
      type: Object
    }
  },
  data: () => ({
    data: {}
  }),
  watch: {
    recoveryListC(val) {
      console.log(val)
    }
  },
  methods: {
    typeListFilter(val) {
      if (val) {
        const filter = this.typeList.reduce((previous, current) => {
          previous[current.value] = current.label
          return previous
        }, {});
        return filter[val]
      }
    },
    handlerShowCode() {
      this.$emit('handler-show-code')
    }
  },
  mounted() {
    console.log(this.show)
  }
}
</script>
<style lang="scss" scoped>
.info {
  position: fixed;
  z-index: 101;
  background: #fff;
  padding: 0 18px 36px;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  color: #8B8B8B;
  font-size: 13px;
  .header {
    padding: 20px 0 20px 0;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #111010;
    position: relative;
    border-bottom: 1px solid #DEDEDE;
    i {
      position: absolute;
      left: 0;
      top: 22px;
    }
  }
  .priceTitle {
    text-align: center;
    margin-top: 20px;
  }
  .price {
    font-size: 30px;
    color: #111010;
    font-weight: bold;
    text-align: center;
    position: relative;
  }
  .item {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 12px;
    font-weight: 400;
  }
  .footer {
    margin-top: 36px;
    .confirm {
      border: none;
      background: #30CE84;
      width: 100%;
      border-radius: 25px;
      /*no*/
      padding: 11px 0;
      color: #fff;
      font-size: 18px;
      font-weight: 400;
    }
  }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .info{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
