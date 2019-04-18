<template>
  <transition name="slideUp" mode="out-in">
    <ul class="info" v-if="show">
      <li class="header">
        <i class="cubeic-back" @click="$emit('handler-show-type')"></i>
        <span class="title">确认兑换</span>
      </li>
      <li class="price">
        {{data.total|toPrice}}
      </li>
      <li class="item">
        <span class="label">类型</span>
        <span class="value">{{typeListFilter(data.type)}}</span>
      </li>
      <li class="item">
        <span class="label">面值</span>
        <span class="value">{{data.faceValue}}</span>
      </li>
      <li class="item">
        <span class="label">服务费</span>
        <span class="value">{{data.service_fee | toPrice}}</span>
      </li>
      <li class="item">
        <span class="label">税费</span>
        <span class="value">{{data.tax_total | toPrice}}</span>
      </li>
      <li class="item">
        <span class="label">应付合计</span>
        <span class="value">{{data.total | toPrice}}</span>
      </li>
      <li class="footer">
        <button class="confirm" @click="handlerShowCode">确认</button>
      </li>
    </ul>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import {getCostInfo} from 'api';
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    data: {}
  }),
  computed: {
    ...mapGetters({
      config: 'oil/getConfig',
      typeList: 'oil/getTypeList'
    })
  },
  watch: {
    show(val) {
      if (val) {
        this.getCostInfo()
      }
    }
  },
  methods: {
    async getCostInfo() {
      const {faceValue, type, token} = this.config
      let res = await getCostInfo({faceValue, type, token})
      if (res.code !== '1') return this.$toast(res.message)
      this.data = res.data[0]
    },
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
  }
}
</script>
<style lang="scss" scoped>
.info{
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
  .header{
    padding: 20px 0 21px 0;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #111010;
    position: relative;
    i{
      position: absolute;
      left: 0;
    }
  }
  .price{
    padding: 40px 0 0 0;
    margin-bottom: 45px;
    font-size: 30px;
    color: #111010;
    font-weight: bold;
    text-align: center;
    position: relative;
    &::before{
      position: absolute;
      display: block;
      content: '';
      width: 100%;
      height: 1px;
      background: #DEDEDE;
      top: 0;
    }
  }
  .item{
    margin-top: 35px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 12px;
    font-weight: 400;
  }
  .footer{
    margin-top: 36px;
    .confirm{
      border: none;
      background: #30CE84;
      width: 100%;
      border-radius: 25px; /*no*/
      padding: 11px 0;
      color: #fff;
      font-size: 18px;
      font-weight: 400;
    }
  }
}
</style>

