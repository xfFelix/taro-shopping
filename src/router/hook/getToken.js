import store from 'store'
import { toast } from 'util/toast';

export default router => {
  router.beforeEach(async(to, from, next) =>{
    // 验证并保存token
    let token = await store.dispatch('checkUrlToken')
    if (!token) {
      if (to.meta.requireAuth) {
        setTimeout(() => {
          return window.location.href = process.env.VUE_APP_INFO_URl + '#!/login'
        }, 1000);
        next(false)
      }
    }
    next()
  })
}
