export default {
  // 获取用户信息
  getUserinfo: state => {
    return state.userinfo
  },
  // 获取配置信息
  getToken: state => {
    return state.token
  },
  getGoodsList: state => {
    return state.goodsList
  }
}
