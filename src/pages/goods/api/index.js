import fetch from '@/api/fetch'
import { SEARCH_URL, SHOP_URL } from '@/api/config'

// 获取商品列表
export const getList = (data) => fetch({
  url: `${SEARCH_URL}/query/keyword`,
  method: 'post',
  data
})

// 获取商品详情
export const getDetail = (data) => fetch({
  url: `/api/goodsDetailInfo`,
  method: 'post',
  data
})

// 获取购物车列表数量
export const getCartListNum = (data) => fetch({
  url: `/api/totalCarts`,
  method: 'post',
  data
})

// 添加到购物车
export const addCart = (data) => fetch({
  url: `/api/add2Cart`,
  method: 'post',
  data
})
