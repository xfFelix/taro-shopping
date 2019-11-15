import {constant} from './index'

export const setDetail = (data) => ({
  type: constant.GET_ORDER_DETAIL,
  data
})

export const setOrders = (data, store, current) => ({
  type: constant.GET_ORDER_LIST,
  data,
  store,
  current
})
