<template>
  <div class="six-password-wrapper">
    <div class="label">
      <span class="square">{{code[0]}}</span>
      <span class="square">{{code[1]}}</span>
      <span class="square">{{code[2]}}</span>
      <span class="square">{{code[3]}}</span>
      <span class="square">{{code[4]}}</span>
      <span class="square">{{code[5]}}</span>
    </div>
    <input type="tel" class="input" autofocus="autofocus" pattern="[0-9]*" maxlength="6" :value="code" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  model: {
    prop: 'code',
    event: 'input'
  },
  props: {
    code: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.six-password-wrapper{
  width: 75%;
  height: 44px;
  line-height: 44px;
  margin: auto;
  position: relative;
  .input{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    opacity: 0;
    caret-color: transparent;
  }
  .label{
    position: absolute;
    z-index: 1;
    background: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    border: 1px solid #dedede;
    .square{
      display: block;
      flex: 1;
      font-size: 24px;
      text-align: center;
      -webkit-text-security: disc;
      text-security: disc;
      position: relative;
      &::after{
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background: #dedede;
        transform: scaleX(.5);
      }
    }
  }
}
</style>
