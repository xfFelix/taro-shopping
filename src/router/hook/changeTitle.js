export default router => {
  router.beforeEach(async(to, from, next) =>{
    if (to.path.includes("oil")) {
      document.title = '加油卡'
    }else if(to.path.includes("memberCard")){
      document.title = '会员卡券'
    }else if(to.path.includes("changeCoin")){
      document.title = '兑换金币'
    } else {
      document.title = '海南旅游'
    }
    next()
  })
}
