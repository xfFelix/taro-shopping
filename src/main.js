import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filter'
import './directives'
// 导入click事件
import FastClick from 'fastclick'
import 'lib-flexible'
import './common/css/index.scss'
import {toast} from '@/util/toast'
import 'swiper/dist/css/swiper.css'

<<<<<<< HEAD

=======
>>>>>>> d1e2394391776b9785c701814bf43655b82882f0
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

FastClick.attach(document.body);

Vue.config.productionTip = false

<<<<<<< HEAD
Vue.prototype.$toast = toast      
=======
Vue.prototype.$toast = toast
>>>>>>> d1e2394391776b9785c701814bf43655b82882f0

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
