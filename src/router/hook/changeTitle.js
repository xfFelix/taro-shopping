export default router => {
  router.beforeEach(async(to, from, next) =>{
    if (to.path.includes("oil")) {
      document.title = '加油卡'
    } else if(to.path.includes("memberCard")){
      document.title = '会员卡券'
    }else if(to.path.includes("changeCoin")){
      document.title = '兑换'
    }else if(to.path.includes("life")){
      document.title = '生活缴费'
    } else if(to.path.includes("gold")){
      document.title = '黄金兑换'
    } else if(to.path.includes("credit")){
      document.title = '信用卡'
    } else if(to.name.includes("tour")){
      document.title = '海南旅游'
    }else{
      document.title = '椰子积分商城'
    }
    next()
  })
}
