import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import './filter'
import './directives'
import './prototype'
import './plugins'
// 导入click事件
import FastClick from 'fastclick'
import 'common/js/rem'
import './common/css/index.scss'
import Header from 'components/Header'

// import Vconsole from 'vconsole';
// new Vconsole();

Vue.component('Header', Header)

FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
