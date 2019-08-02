<template>
<transition mode="out-in" name="fadeIn">
  <div class="keyboard-wrapper" v-if="show">
    <div class="close-wrapper" @click="$emit('update:show', false)">
      <i class="cubeic-select"></i>
    </div>
    <ul @click.stop="handleKeyPress">
      <li><a href="javascript:void(0);" :data-num="1">1</a></li>
      <li><a href="javascript:void(0);" :data-num="2">2</a></li>
      <li><a href="javascript:void(0);" :data-num="3">3</a></li>
      <li><a href="javascript:void(0);" :data-num="4">4</a></li>
      <li><a href="javascript:void(0);" :data-num="5">5</a></li>
      <li><a href="javascript:void(0);" :data-num="6">6</a></li>
      <li><a href="javascript:void(0);" :data-num="7">7</a></li>
      <li><a href="javascript:void(0);" :data-num="8">8</a></li>
      <li><a href="javascript:void(0);" :data-num="9">9</a></li>
      <li><a href="javascript:void(0);" :data-num="'C'">清空</a></li>
      <li><a href="javascript:void(0);" :data-num="0">0</a></li>
      <li><a href="javascript:void(0);" :data-num="'D'">删除</a></li>
    </ul>
  </div>
  <!-- <keyboard v-model="code" :show.sync="showKeyboard"></keyboard> -->
</transition>
</template>

<script>
export default {
  model: {
    prop: 'code',
    event: 'click'
  },
  props: {
    code: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleKeyPress(e) {
      let num = e.target.dataset.num
      switch (num) {
        case 'C':
          this.handleClearKey()
          break;
        case 'D':
          this.handleDeleteKey()
          break
        default:
          this.handleNumberKey(+num)
          break;
      }
    },
    //处理数字
    handleNumberKey(num) {
      if (this.code.length === 6) return
      let S = this.code;
      this.$emit('click', S + num)
    },
    handleDeleteKey() {
      let S = this.code
      //如果没有输入，直接返回
      if (!S.length) return false;
      //否则删除最后一个
      this.$emit('click', S.substring(0, S.length - 1))
    },
    //处理清空键
    handleClearKey() {
      this.$emit('click', '')
    },
  }
}
</script>

<style lang="scss" scoped>
.keyboard-wrapper{
  position: absolute;
  z-index: 10;
  background: #f5f5f5;
  width: 100%;
  bottom: 0px;
  .close-wrapper{
    line-height: 26px;
    text-align: center;
    border-top: 1px solid #dadada;
  }
  ul{
    overflow: hidden;
    border-bottom: none;
    border-top: 1px solid #dadada;
    border-right: 1px solid #dadada;
    li{
      width: calc(100% / 3);
      box-sizing: border-box;
      border-bottom: 1px solid #dadada;
      border-left: 1px solid #dadada;
      float: left;
      text-align: center;
      font-size: 22px;
      a{
        display: block;
        color: #000;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
      }
    }
  }
}
</style>
