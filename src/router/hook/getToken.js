import store from 'store'
import {dialog} from 'util/toast';
import {tools_uri} from 'common/tools';
import {getInfo} from 'api';

export default router => {
  router.beforeEach(async(to, from, next) =>{
    // 验证并保存token
    if (to.meta.requireAuth) {
      let token = await store.dispatch('checkUrlToken')
      if (!token) {
        dialog({type: 'confirm', content: '请先登录'}, () => {
          window.location.href = process.env.VUE_APP_INFO_URl + '#!/login?back=' + tools_uri.encode(window.location)
        })
      } else {
        let info = await getInfo({token})
        if (info.error_code) {
          store.dispatch('setToken', undefined)
          dialog({type: 'confirm', content: '请先登录'}, () => {
            window.location.href = process.env.VUE_APP_INFO_URl + '#!/login?back=' + tools_uri.encode(window.location)
          })
        }
      }
    }
    next()
  })
}
