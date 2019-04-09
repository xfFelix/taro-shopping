<template>
  <div class="list">
    <Header title="预订记录"></Header>
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      show-slider
      @click="clickHandler"
      @change="changeHandler">
    </cube-tab-bar>
    <list></list>
  </div>
</template>

<script>
export default {
  components: {
    'Header': () => import('components/Header'),
    List: () => import('./components/List')
  },
  data: () => ({
    selectedLabelDefault: '全部',
    tabs: [{
      label: '全部',
    }, {
      label: '未使用',
    }, {
      label: '已使用',
    }, {
      label: '已过期',
    }, {
      label: '取消',
    }]
  }),
  created() {
    console.log('oo')
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
      console.log('111')
    }
  }
}
</script>

<style lang="scss">
.cube-tab{
  div{
    font-size: 14px;
  }
}
.cube-tab_active {
    color: #30ce84;
}
.cube-tab-bar-slider{
  background-color: #30ce84;
}
</style>


<style lang="scss" scoped>
.list{
  height: 100%;
}
</style>
