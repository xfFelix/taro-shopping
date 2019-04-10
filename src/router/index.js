import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: 'ticket',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页'
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
      component: () => import('views/settlement')
    }
  ]
})

