import { dialog } from "util/toast"
import store from 'store'

export default router => {
  router.afterEach(async(to, from) =>{
    const reg = /(settlement|memberCard\/cardType|oil\/home)/
    if (reg.test(to.path)) {
      if (store.state.userinfo.payValidType === 1 && !store.state.userinfo.payPwd) {
        dialog({content: '请先设置支付密码'}, () => {
          window.location.href = `${process.env.VUE_APP_BASE_HOME_URL}/#/payPassword?path=${window.location}`
        })
      }
    }
  })
}
