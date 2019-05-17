<template>
    <div class="code-wrapper">
        <label for="code" class="code-input-main">
          <div class="code-input-main-item">{{code[0]}}</div>
          <div class="code-input-main-item">{{code[1]}}</div>
          <div class="code-input-main-item">{{code[2]}}</div>
          <div class="code-input-main-item">{{code[3]}}</div>
        </label>
        <input class="code-input-input" id="code" v-model.trim="code" maxlength="4" type="tel" autocomplete="off" pattern="[0-9]*"/>
    </div>
</template>

<script>
export default {
  name: "CodeInput",
  computed: {
    code: {
      get() {
        return this.$store.state.oil.config.code
      },
      set(val) {
        this.$store.dispatch('oil/setConfig', {code: val})
      }
    }
  },
  watch: {
    code (val) {
      if (val.length === 4) {
        this.$emit('confirm')
      }
    }
  }
}
</script>
<style scoped>
.code-input-input {
  height: 50px;
  position: absolute;
  outline: none;
  color: transparent;
  text-shadow: 0 0 0 transparent;
  width: 100%;
  top: 0;
  z-index: -1;
  opacity: 0;
}
.code-input-main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.code-wrapper{
  position: relative;
}
.code-input-main-item {
  width: 50px;
  height: 50px;
  opacity: 0.8;
  border-bottom: solid #000 1px;
  margin: 0 .05rem;
  text-align: center;
  padding-bottom: 0;
  font-size: 30px;
  color: #000;
}
</style>
