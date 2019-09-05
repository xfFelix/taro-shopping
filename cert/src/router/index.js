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
    {
      path: '/face',
      redirect: '/face/user',
      component: () => import('views/face'),
      children: [
        {
          path: 'user',
          name: 'UserFace',
          component: () => import('views/face/user'),
          meta: {
            title: '签约助手'
          }
        },
        {
          path: 'select',
          name: 'FaceSelect',
          component: () => import('views/face/select'),
          meta: {
            title: '人脸识别'
          }
        },
        {
          path: 'success',
          name: 'FaceSuccess',
          component: () => import('views/face/success'),
          meta: {
            title: '认证成功'
          }
        },
        {
          path: 'signSuccess',
          name: 'SignSuccessForFace',
          component: () => import('views/face/SignSuccess'),
          meta: {
            title: '签约成功'
          }
        }
      ]
    }
  ]
})

changeTitle(router)
export default router

