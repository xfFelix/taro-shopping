<template>
  <div class="group">
    <Header class="navbar" :show-more="true">选择分组</Header>
    <ul class="content">
      <li v-for="item of list" :key="item.id" @click="group = item.label">
        {{item.label}}
        <span class="circle" :class="group === item.label && 'active'"></span>
      </li>
    </ul>
    <button class="next" @click="goNext">下一步</button>
  </div>
</template>

<script>
import Header from 'components/Header'
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    Header
  },
  data: () => ({
    list: [
      { label: '我家', value: '1', id: 0 },
      { label: '父母', value: '2', id: 1 },
      { label: '朋友', value: '3', id: 2 },
      { label: '其他', value: '4', id: 3 }
    ],
    group: '我家'
  }),
  computed: {
    ...mapGetters({
      config: 'life/getConfig'
    })
  },
  mounted() {
    this.group = this.config.group
  },
  methods: {
    ...mapActions({
      setConfig: 'life/setConfig'
    }),
    goNext() {
      this.setConfig({ group: this.group })
      this.$router.back()
    }
  }
}
</script>

<style scoped lang='scss'>
.group{
  .navbar{
    background: #000;
    color: #fff;
  }
  .content{
    background: #fff;
    li{
      color: #4A4A4A;
      font-size: 14px;
      height: 64px;
      line-height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 15px;
      border-bottom: 1px solid #dedede;
      &:last-of-type{
        border-bottom: 0;
      }
      .circle {
        border: 1px solid #dedede;
        border-radius: 50%;
        display: block;
        width: 19px;
        height: 19px;
        &.active{
          background: url('~common/images/choice.png');
          background-size: 20px 20px;
          background-repeat: no-repeat;
        }
      }
    }
  }
  .next{
    display: block;
    width: 345px;
    margin: 15px auto;
    border-radius: 5px;
    border: none;
    box-sizing: border-box;
    height: 44px;
    background: #30CE84;
    color: #fff;
    font-size: 15px;
  }
}
</style>
