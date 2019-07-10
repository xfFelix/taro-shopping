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
        requireAuth: true
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
        },
        {
          path: 'recovery',
          name: 'recoveryList',
          component: () => import(/* webpackPrefetch: true */ 'views/oil/recovery'),
          meta: {
            title: '加油卡回收列表',
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/memberCard',
      name: 'memberCard',
      component: () => import('views/memberCard'),
      meta: {
        title: '会员卡券',
        requireAuth: true
      },
      redirect: '/memberCard/home',
      children: [
        {
          path: 'home',
          name: 'memberHome',
          component: () => import('views/memberCard/home'),
          meta: {
            title: '会员卡券首页',
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/memberCard/cardType',
      name: 'cardType',
      component: () => import('views/memberCard/cardType'),
      meta: {
        title: '充值类型',
        requireAuth: true
      }
    },
    {
      path: '/memberCard/cardRecord',
      name: 'cardRecord',
      component: () => import('views/memberCard/cardRecord'),
      meta: {
        title: '兑换记录',
        requireAuth: true
      }
    },
    {
      path: '/memberCard/cardChangeS',
      name: 'cardChangeS',
      component: () => import('views/memberCard/cardChangeS'),
      meta: {
        title: '充值成功',
        requireAuth: true
      }
    },
    {
      path: '/changeCoin',
      name: 'changeCoin',
      component: () => import('views/changeCoin'),
      meta: {
        title: '兑换金币',
        requireAuth: true
      },
      redirect: '/changeCoin/home',
      children: [
        {
          path: 'home',
          name: 'coinHome',
          component: () => import('views/changeCoin/home'),
          meta: {
            title: '兑换金币',
            requireAuth: true
          }
        },
        {
          path: 'recovery',
          name: 'coinList',
          component: () => import(/* webpackPrefetch: true */ 'views/changeCoin/recovery'),
          meta: {
            title: '兑换金币列表',
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/life',
      name: 'life',
      component: () => import('views/life'),
      meta: {
        title: '生活缴费',
        requireAuth: true
      },
      redirect: '/life/home',
      children: [
        {
          path: 'home',
          name: 'lifeHome',
          component: () => import('views/life/home'),
          meta: {
            title: '生活缴费首页',
            requireAuth: true
          }
        },
        {
          path: 'geolocation',
          name: 'lifeGeolocation',
          component: () => import(/* webpackPrefetch: true */ 'views/life/geolocation'),
          meta: {
            title: '选择城市',
            requireAuth: true
          }
        },
        {
          path: 'account',
          name: 'lifeAccount',
          component: () => import(/* webpackPrefetch: true */ 'views/life/addAccount'),
          meta: {
            title: '新增缴费账户',
            requireAuth: true
          }
        },
        {
          path: 'record',
          name: 'lifeRecord',
          component: () => import(/* webpackPrefetch: true */ 'views/life/record'),
          meta: {
            title: '兑换记录',
            requireAuth: true
          }
        },
        {
          path: 'changeS',
          name: 'lifeChangeS',
          component: () => import(/* webpackPrefetch: true */ 'views/life/changeS'),
          meta: {
            title: '兑换成功',
            requireAuth: true
          }
        },
        {
          path: 'paymentUnit',
          name: 'paymentUnit',
          component: () => import(/* webpackPrefetch: true */ 'views/life/paymentUnit'),
          meta: {
            title: '选择缴费单位',
            requireAuth: true
          }
        },
        {
          path: 'group',
          name: 'group',
          component: () => import(/* webpackPrefetch: true */ 'views/life/group'),
          meta: {
            title: '选择分组',
            requireAuth: true
          }
        },
        {
          path: 'fail',
          name: 'fail',
          component: () => import(/* webpackPrefetch: true */ 'views/life/fail'),
          meta: {
            title: '缴费失败',
            requireAuth: true
          }
        },
        {
          path: 'payment',
          name: 'LifePayment',
          component: () => import(/* webpackPrefetch: true */ 'views/life/payment'),
          meta: {
            title: '缴费账户',
            requireAuth: true
          }
        },
        {
          path: 'userNumber',
          name: 'LifeFindNumber',
          component: () => import(/* webpackPrefetch: true */ 'views/life/userNumber'),
          meta: {
            title: '如何查户号',
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

