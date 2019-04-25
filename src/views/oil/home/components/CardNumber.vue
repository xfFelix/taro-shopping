<template>
  <transition name="slideUp" mode="out-in">
    <div class="card" v-if="show">
      <div class="header">
        <ul class="clear-fix">
          <li class="item" :class="{active: type === item.value}" @click="changeType(item.value)" v-for="item of typeList" :key="item.value">{{item.label}}</li>
        </ul>
        <span class="cancel" @click="closeDialog">取消</span>
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
  padding: 20px 18px 21px;
  box-sizing: border-box;
  font-size: 13px;
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul{
      .item{
        float: left;
        width: 80px;
        padding: 9px 0;
        text-align: center;
        background: #EEEEEE;
        border-radius: 25px; /*no*/
        color: #8B8B8B;
        position: relative;
        z-index: 9;
        &:last-of-type{
          margin-left: -22px;
        }
        &.active{
          background: #30CE84;
          color: #fff;
          z-index: 10;
        }
      }
    }
    .cancel{
      color: #8B8B8B;
    }
  }
  .input-card{
    margin-top: 20px;
    border: 1px solid #DEDEDE;
    .input {
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
    margin-top: 20px;
    border: none;
    background: #30CE84;
    width: 100%;
    border-radius: 25px; /*no*/
    color: #fff;
    font-size: 18px;
    padding: 11px 0;
  }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .card{
    max-width: 384px;
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
