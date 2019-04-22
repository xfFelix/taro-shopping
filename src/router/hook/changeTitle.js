export default router => {
  router.beforeEach(async(to, from, next) =>{
    if (to.path.includes("oil")) {
      document.title = '加油卡'
    } else {
      document.title = '海南旅游'
    }
    next()
  })
}
