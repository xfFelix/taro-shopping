import Vue from 'vue'
import Router from 'vue-router'
// import getToken from './hook/getToken'
import changeTitle from './hook/changeTitle';

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: 'ticket',
  routes: [
    {
      path: '/',
      redirect: '/memberCard/signHelper'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
        keepAlive:true
      },
      component: () => import(/* webpackChunkName: "group-ticket" */ 'views/home')
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: () => import(/* webpackChunkName: "group-ticket" */ 'views/goodsDetail')
    },
    {
      path: '/order',
      name: 'order',
      meta: {
        title: '订单'
      },
      component: () => import(/* webpackChunkName: "group-ticket" */ 'views/order'),
      redirect: '/order/list',
      children:[
        {
          path: 'list',
          name: 'list',
          component: () => import(/* webpackChunkName: "group-ticket" */ 'views/order/list'),
          meta: {
            title: '订单列表',
            requireAuth: true
          }
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import(/* webpackChunkName: "group-ticket" */ 'views/order/detail'),
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
      component: () => import(/* webpackChunkName: "group-ticket" */ 'views/settlement'),
      meta: {
        title: '结算',
        requireAuth: true
      }
    },
    {
      path: '/oil/oilRecovery',
      name: 'oilRecovery',
      component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilRecovery'),
      meta: {
        title: '加油卡回收',
        requireAuth: true
      }
    },
    {
      path: '/oil/oilRecord',
      name: 'oilRecord',
      component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilRecord'),
      meta: {
        title: '加油卡充值',
        // requireAuth: true
      }
    },
    {
      path: '/oil/oilChangeS',
      name: 'oilChangeS',
      component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilChangeS'),
      meta: {
        title: '兑换成功',
        // requireAuth: true
      }
    },
    {
      path: '/oil/oilRecoveryS',
      name: 'oilRecoveryS',
      component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilRecoveryS'),
      meta: {
        title: '回购成功',
        // requireAuth: true
      }
    },
    {
      path: '/oil',
      name: 'oil',
      component: () => import(/* webpackChunkName: "group-oil" */ 'views/oil'),
      meta: {
        title: '加油卡',
        requireAuth: true
      },
      redirect: '/oil/home',
      children: [
        {
          path: 'home',
          name: 'oilHome',
          component: () => import(/* webpackChunkName: "group-oil" */ 'views/oil/home'),
          meta: {
            title: '加油卡首页',
            requireAuth: true
          }
        },
        {
          path: 'recovery',
          name: 'recoveryList',
          component: () => import(/* webpackChunkName: "group-oil" */ 'views/oil/recovery'),
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
      component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCard'),
      meta: {
        title: '会员卡券',
        requireAuth: true
      },
      redirect: '/memberCard/home',
      children: [
        {
          path: 'home',
          name: 'memberHome',
          component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCard/home'),
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
      component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCard/cardType'),
      meta: {
        title: '充值类型',
        requireAuth: true
      }
    },
    {
      path: '/memberCard/cardRecord',
      name: 'cardRecord',
      component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCard/cardRecord'),
      meta: {
        title: '兑换记录',
        requireAuth: true
      }
    },
    {
      path: '/memberCard/cardChangeS',
      name: 'cardChangeS',
      component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCard/cardChangeS'),
      meta: {
        title: '充值成功',
        requireAuth: true
      }
    },
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
    {
      path: '/changeCoin',
      name: 'changeCoin',
      component: () => import(/* webpackChunkName: "group-coin" */ 'views/changeCoin'),
      meta: {
        title: '兑换金币',
        requireAuth: true
      },
      redirect: '/changeCoin/home',
      children: [
        {
          path: 'home',
          name: 'coinHome',
          component: () => import(/* webpackChunkName: "group-coin" */ 'views/changeCoin/home'),
          meta: {
            title: '兑换金币',
            requireAuth: true
          }
        },
        {
          path: 'recovery',
          name: 'coinList',
          component: () => import(/* webpackChunkName: "group-coin" */ 'views/changeCoin/recovery'),
          meta: {
            title: '兑换金币列表',
            requireAuth: true
          }
        }
      ]
    },
    // {
    //   path: '/life',
    //   name: 'life',
    //   component: () => import(/* webpackChunkName: "group-life" */'views/life'),
    //   meta: {
    //     title: '生活缴费',
    //     requireAuth: true
    //   },
    //   redirect: '/life/home',
    //   children: [
    //     {
    //       path: 'home',
    //       name: 'lifeHome',
    //       component: () => import(/* webpackChunkName: "group-life" */'views/life/home'),
    //       meta: {
    //         title: '生活缴费首页',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'geolocation',
    //       name: 'lifeGeolocation',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/geolocation'),
    //       meta: {
    //         title: '选择城市',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'account',
    //       name: 'lifeAccount',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/addAccount'),
    //       meta: {
    //         title: '新增缴费账户',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'record',
    //       name: 'lifeRecord',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/record'),
    //       meta: {
    //         title: '兑换记录',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'changeS',
    //       name: 'lifeChangeS',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/changeS'),
    //       meta: {
    //         title: '兑换成功',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'paymentUnit',
    //       name: 'paymentUnit',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/paymentUnit'),
    //       meta: {
    //         title: '选择缴费单位',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'group',
    //       name: 'group',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/group'),
    //       meta: {
    //         title: '选择分组',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'fail',
    //       name: 'fail',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/fail'),
    //       meta: {
    //         title: '缴费失败',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'payment',
    //       name: 'LifePayment',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/payment'),
    //       meta: {
    //         title: '缴费账户',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'userNumber',
    //       name: 'LifeFindNumber',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/userNumber'),
    //       meta: {
    //         title: '如何查户号',
    //         requireAuth: true
    //       }
    //     }
    //   ]
    // }
  ]
})

// getToken(router)
changeTitle(router)
export default router

