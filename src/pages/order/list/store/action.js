import {constant} from './index'
import {getOrders} from '../api'

export const getOrdersSync = (params = {token: '', status: 0, offset: 1}) => {
  return async dispatch => {
    try {
      const {data} = await getOrders(params)
      let current = params.status == 1 ? 2 : (params.status == 2 ? 1 : params.status)
      dispatch(setOrders(data, params, current))
    } catch (e) {
      console.error(e)
    }
  }
}

export const setOrders = (data, store, current) => ({
  type: constant.GET_ORDER_LIST,
  data,
  store,
  current
})
