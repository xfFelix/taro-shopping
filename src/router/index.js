import Vue from 'vue'
import Router from 'vue-router'
import getToken from './hook/getToken'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: 'ticket',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
        keepAlive:true
      },
      component: () => import('views/home')
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: () => import('views/goodsDetail')
    },
    {
      path: '/order',
      name: 'order',
      meta: {
        title: '订单'
      },
      component: () => import('views/order'),
      redirect: '/order/list',
      children:[
        {
          path: 'list',
          name: 'list',
          component: () => import('views/order/list'),
          meta: {
            title: '订单列表'
          }
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import('views/order/detail'),
          meta: {
            title: '订单详情'
          }
        }
      ]
    },
    {
      path: '/settlement',
      name: 'settlement',
      component: () => import('views/settlement'),
      meta: {
        title: '结算',
        requireAuth: true
      }
    }
  ]
})

getToken(router)

export default router

