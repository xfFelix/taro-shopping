import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './filter'
import './directives'
import './lazyload'
import './prototype'
import './plugins'
// 导入click事件
import FastClick from 'fastclick'
import 'common/js/rem'
import './common/css/index.scss'
import 'swiper/dist/css/swiper.css'

import Vconsole from 'vconsole';
new Vconsole();

FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
