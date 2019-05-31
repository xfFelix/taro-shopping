<template>
    <div class="code-wrapper">
        <label for="code" class="code-input-main">
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[0]}}</div>
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[1]}}</div>
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[2]}}</div>
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[3]}}</div>
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}" v-if="userinfo.payValidType === 1">{{code[4]}}</div>
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}" v-if="userinfo.payValidType === 1">{{code[5]}}</div>
        </label>
        <input class="code-input-input" id="code" autofocus="autofocus" v-model.trim="code" :maxlength="userinfo.payValidType === 1 ? 6 : 4" type="tel" autocomplete="off" pattern="[0-9]*"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "CodeInput",
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo'
    }),
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
      if (this.userinfo.payValidType === 1) {
        if (val.length === 6) {
          this.$emit('confirm')
        }
      } else {
        if (val.length === 4) {
          this.$emit('confirm')
        }
      }
    },
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
  caret-color: transparent;
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
.text-security{
  -webkit-text-security: disc;
  text-security: disc;
}
</style>
