<template>
  <transition name="slideUp" mode="out-in">
    <div class="card" v-if="show">
      <div class="header border-bottom-1px">
        <i class="cubeic-back back" @click="handlerShowType"></i>
        输入加油卡卡号
      </div>
      <div class="input-card">
        <cube-input v-model.trim="cardNum" placeholder="请输入您的加油卡号" class="input">
          <span class="prepend" slot="prepend">卡号</span>
        </cube-input>
      </div>
      <button class="confirm" @click="handlerShowInfo">确认</button>
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
    }
  },
  data: () => ({
    value: undefined
  }),
  computed: {
    ...mapGetters({
      typeList: 'oil/getTypeList'
    }),
    cardNum: {
      get() {
        return this.$store.state.oil.config.cardNum
      },
      set(val) {
        return this.$store.dispatch('oil/setConfig',{cardNum: val})
      }
    },
    type: {
      get() {
        return this.$store.state.oil.config.type
      },
      set(val) {
        return this.$store.dispatch('oil/setConfig',{type: val})
      }
    }
  },
  methods: {
    changeType(val) {
      this.type = val
    },
    closeDialog() {
      this.$emit('close-dialog')
    },
    handlerShowInfo() {
      if (!this.cardNum) return this.$toast('请输入充值卡号')
      this.$emit('handler-show-info')
    },
    handlerShowType() {
      this.$emit('handler-show-type')
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  position: fixed;
  z-index: 11;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  padding-top: 20px;
  box-sizing: border-box;
  font-size: 13px;
  .header{
    position: relative;
    text-align: center;
    font-size: 15px;
    color: #4A4A4A;
    margin: 0 18px 0;
    padding-bottom: 15px;
    .back{
      position: absolute;
      color: #4A4A4A;
      font-size: 15px;
      left: 0;
    }
  }
  .input-card{
    margin: 54px 18px 0;
    box-sizing: border-box;
    border: 1px solid #DEDEDE;
    .input {
      height: 44px;
      .cube-input-prepend{
        .prepend{
          margin: 10px 0;
          padding: 0 10px;
          font-size: 13px;
          color: #000;
          border-right: 1px solid #B1B1B1;
        }
      }
    }
  }
  .confirm{
    margin-top: 54px;
    border: none;
    background: #30CE84;
    width: 100%;
    color: #fff;
    font-size: 18px;
    padding: 11px 0;
  }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .card{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
