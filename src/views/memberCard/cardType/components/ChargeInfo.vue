<template>
  <transition name="slideUp" mode="out-in">
    <ul class="info" v-if="show">
      <li class="header">
        <span class="title">确认兑换</span>
        <i @click="$emit('go-back')">取消</i>
      </li>
      <li class="price">
        <span class="logoPng"></span>
        {{info.total|toPrice}}
      </li>
      <li class="item">
        <span class="label">产品名称</span>
        <span class="value">
          {{info.productName}}
        </span>
      </li>
      <li class="item">
        <span class="label">充值账号</span>
        <span class="value">
          {{info.cardNumber}}
        </span>
      </li>
      <li class="item">
        <span class="label">类型</span>
        <span class="value" v-if="info.productType==1">周卡</span>
        <span class="value" v-else-if="info.productType==2">月卡</span>
        <span class="value" v-else-if="info.productType==3">季卡</span>
        <span class="value" v-else-if="info.productType==4">半年卡</span>
        <span class="value" v-else>年卡</span>
      </li>
      <li class="item">
        <span class="label">售价</span>
        <span class="value">
          {{info.sellingPrice|toPrice}}
        </span>
      </li>
      <li class="item">
        <span class="label">税费</span>
        <span class="value">
          {{info.tax_total|toPrice}}
        </span>
      </li>
      <li class="item itemLast">
        <span class="label">应付合计</span>
        <span class="value">
          {{info.total|toPrice}}
        </span>
      </li>
      <li class="footer" @click="handlerShowCode">
        确认
      </li>
    </ul>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
    }
  },
  data: () => ({

  }),
  methods: {
    handlerShowCode() {
      this.$emit("send-sms")
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.info {
  position: fixed;
  z-index: 11;
  background: #fff;
  padding: 0 18px 36px;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  color: #8B8B8B;
  font-size: 13px;
  .header {
    line-height: 44px;
    text-align: center;
    font-size: 15px;
    color: #4A4A4A;
    position: relative;
    i {
      position: absolute;
      right: 0;
      color: #999999;
      font-size: 12px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      position: absolute;
      display: block;
      content: '';
      width: 100%;
      height: 1px;
      background: #DEDEDE;
      top: 0;
    }
    .logoPng {
      width: 27px;
      height: 27px;
      display: inline-block;
      background: url("../../../../common/images/logo.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 5px;
    }
  }
  .item {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 12px;
    font-weight: 400;
  }
  .itemLast {
    padding-bottom: 44px;
  }
  .footer {
    width: 100%;
    line-height: 44px;
    background: #30CE84;
    height: 44px;
    bottom: 0;
    position: fixed;
    color: #fff;
    font-size: 18px;
    text-align: center;
    left: 0;
    max-width: 384px;
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
