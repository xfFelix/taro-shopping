import store from 'store'
import { toast } from 'util/toast';

export default router => {
  router.beforeEach(async(to, from, next) =>{
    let token = await store.dispatch('checkUrlToken')
    if (!token) toast('无效的token')
    next()
  })
}
