<template>
  <span>
    <i :style="{'font-size': fontSize + 'px','color':color}">{{price | toDecimal2Fp}}</i>.<i :style="{'font-size': minFontSize + 'px','color':color}">{{price | toDecimal2Ap}}</i>
  </span>
</template>

<script>
export default {
  props: {
    fontSize: {
      type: Number,
      default: 30
    },
    price: {
      type: String | Number,
      default: 0
    },
    color: {
      type: String,
      default: '#30ce84'
    }
  },
  computed: {
    minFontSize() {
      return this.fontSize - 8
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

