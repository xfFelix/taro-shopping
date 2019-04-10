<template>
  <ul class="main">
    <li class="item border-bottom-1px">
      <span class="label">凭证码:</span>
      <span class="value">{{data.idBackUrl}}</span>
      <button class="copy" @click="handleCopy(data.idBackUrl,$event)">复制</button>
      <i class="cubeic-arrow"></i>
    </li>
  </ul>
</template>

<script>
import clip from 'util/clipboard'
export default {
  props:{
    data:{
      type: Object,
      required: true
    }
  },
  methods:{
    handleCopy(text, event) {
      clip(text, event)
    },
  }
}
</script>

<style lang="scss" scoped>
ul{
  background: #fff;
  padding: 8px 25px;
  .item{
    padding: 8px 0;
    display: flex;
    align-items: center;
    position: relative;
    .label{
      font-weight: 700;
      flex: 0 0 70px;
    }
    .value{
      color: #585858;
    }
    .copy{
      background: transparent;
      border: none;
      color: #585858;
      font-size: 13px;
      padding: 1px 10px;
      border: 1px solid #585858;
      border-radius: 25px; /*no*/
      position: absolute;
      right: 24px;
    }
    .cubeic-arrow{
      position: absolute;
      right: 0;
    }
  }
}
</style>

