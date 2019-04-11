import store from 'store'

export default router => {
  router.beforeEach((to, from, next) =>{
    store.dispatch('checkUrlToken')
    next()
  })
}
