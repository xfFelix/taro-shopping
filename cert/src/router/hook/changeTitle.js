export default router => {
  router.beforeEach(async(to, from, next) =>{
    if (to.path.includes("signHelp")) {
      document.title = '签约助手'
    }else {
      document.title = '代征系统'
    }
    next()
  })
}
