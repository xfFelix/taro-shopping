<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f3f4f6;
}
#app{
  height: 100%;;
}
</style>
