import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home.vue'

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
      component: Home,
      meta:{
        title: '首页'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ 'views/About.vue')
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

