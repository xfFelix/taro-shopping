import fetch from '@/api/fetch'
import {SEARCH_URL} from "@/api/config";

// 获取默认地址
export const getDefaultAddress = (data) => fetch({
  url: `/api/selectDefaultAddresses`,
  method: 'post',
  data
})

// 获取购物车列表
export const getCartList = (data) => fetch({
  url: `/api/selectCarts`,
  method: 'post',
  data
})

// 获取猜你喜欢列表
export const getGuessLike = (data) => fetch({
  url: `${SEARCH_URL}/query/guessLike`,
  method: 'post',
  data
})

// 更新购物车
export const updateCart = (data) => fetch({
  url: `/api/updateCart`,
  method: 'post',
  data
})

// 删除购物车订单
export const removeCart = (data) => fetch({
  url: `/api/removeCarts`,
  method: 'post',
  data
})
