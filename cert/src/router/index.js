import Vue from 'vue'
import Router from 'vue-router'
import changeTitle from './hook/changeTitle';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/sign'
    },
    {
      path: '/sign',
      name: 'signHelper',
      component: () => import('views/sign/signHelper'),
      meta: {
        title: '签约助手',
        keepAlive:true
      }
    },
    {
      path: '/sign/signHelps',
      name: 'signHelps',
      component: () => import('views/sign/signHelps'),
      meta: {
        title: '签约助手',
      }
    },
    {
      path: '/sign/signHelpFile',
      name: 'signHelpFile',
      component: () => import('views/sign/signHelpFile'),
      meta: {
        title: '在线签约用户协议',
      }
    },
  ]
})

changeTitle(router)
export default router

