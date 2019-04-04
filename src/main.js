import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './directives'
// 导入click事件
import FastClick from 'fastclick'
import 'lib-flexible'
<<<<<<< HEAD
import './common/css/index.scss'
=======
import {toast} from '@/util/toast'
>>>>>>> 97f451246a4d047a363b84cac604cfb628013845

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$toast = toast

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
