import {constant} from './index'
import {getOrders} from '../api'
import {getOrders as getOrderDetail} from '../../detail/api'
import {dialog} from "@/util/index";
import {getStream} from "@/pages/order/stream/api";

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

export const getOrderDetailSync = (params = {token: '', code: ''}) => {
  return async dispatch => {
    try {
      const {data} = await getOrderDetail(params)
      let obj = data
      obj.address = {name: data.userName, tel: data.userMobile, area: data.userAddress, id: data.addressId}
      dispatch(setDetail(obj))
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }
}

export const getStreamSync = ({token='', id = ''}={}) => {
  return async dispatch => {
    try {
      const { message } = await getStream({token, id})
      dispatch(setStream(message))
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }
}

export const setStream = (data) => ({
  type: constant.GET_ORDER_STREAM,
  data
})

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
