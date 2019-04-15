import store from 'store'
import {dialog} from 'util/toast';

export default router => {
  router.beforeEach(async(to, from, next) =>{
    // 验证并保存token
    let token = await store.dispatch('checkUrlToken')
    if (!token) {
      if (to.meta.requireAuth) {
        dialog({type: 'confirm', content: '请先登录'}, () => {
          return window.location.href = process.env.VUE_APP_INFO_URl + '#!/login'
        })
        next(false)
      }
    }
    next()
  })
}
