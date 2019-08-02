import Vue from 'vue'
import Router from 'vue-router'
import changeTitle from './hook/changeTitle';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/memberCard/signHelper'
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   meta: {
    //     title: '首页',
    //     keepAlive:true
    //   },
    //   component: () => import(/* webpackChunkName: "group-ticket" */ 'views/home')
    // },
    {
      path: '/memberCard/signHelper',
      name: 'signHelper',
      component: () => import('views/memberCard/signHelper'),
      meta: {
        title: '签约助手',
      }
    },
    {
      path: '/memberCard/signHelps',
      name: 'signHelps',
      component: () => import('views/memberCard/signHelps'),
      meta: {
        title: '签约助手',
      }
    },
    {
      path: '/memberCard/signHelpFile',
      name: 'signHelpFile',
      component: () => import('views/memberCard/signHelpFile'),
      meta: {
        title: '在线签约用户协议',
      }
    },
  ]
})

changeTitle(router)
export default router

