import Vue from 'vue'
import Router from 'vue-router'
import getToken from './hook/getToken'
import changeTitle from './hook/changeTitle';


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
            title: '订单列表',
            requireAuth: true
          }
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import('views/order/detail'),
          meta: {
            title: '订单详情',
            requireAuth: true
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
    },
    {
      path: '/oil/oilRecovery',
      name: 'oilRecovery',
      component: () => import('views/oilRecovery'),
      meta: {
        title: '加油卡回收',
        // requireAuth: true
      }
    },
    {
      path: '/oil/oilRecord',
      name: 'oilRecord',
      component: () => import('views/oilRecord'),
      meta: {
        title: '加油卡充值',
        // requireAuth: true
      }
    },
    {
      path: '/oil/oilChangeS',
      name: 'oilChangeS',
      component: () => import('views/oilChangeS'),
      meta: {
        title: '兑换成功',
        // requireAuth: true
      }
    },
    {
      path: '/oil/oilRecoveryS',
      name: 'oilRecoveryS',
      component: () => import('views/oilRecoveryS'),
      meta: {
        title: '回购成功',
        // requireAuth: true
      }
    },
    {
      path: '/oil',
      name: 'oil',
      component: () => import('views/oil'),
      meta: {
        title: '加油卡',
        requireAuth: true
      },
      redirect: '/oil/home',
      children: [
        {
          path: 'home',
          name: 'oilHome',
          component: () => import('views/oil/home'),
          meta: {
            title: '加油卡首页',
            requireAuth: true
          }
        }
      ]
    }
  ]
})

getToken(router)
changeTitle(router)
export default router

