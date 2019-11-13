import {constant} from './index'
import {getCostInfo, submit, getOrderInfo} from '../home/api'
import { dialog } from '@/util/index'
import {getOrderList} from "@/pages/oil/order/api";
import {getRecoveryList} from "@/pages/oil/recovery/api";

export const getCostInfoSync = (params = {faceValue: 100, rechargeType: 1, token: '', type: 1}) => {
  return async dispatch => {
    try {
      const {data} = await getCostInfo(params)
      let obj = data[0]
      dispatch(setCostInfo(obj))
    } catch (e) {
      await dialog.toast({title: e.message})
    }
  }
}

export const submitSync = ({ faceValue= 100, rechargeType= 1, oilCardType= 1, code= '', cardNum= '', token= ''}={}) => {
  return async dispatch => {
    try {
      const { data } = await submit({ faceValue, rechargeType, oilCardType, code, cardNum, token})
      let res = await getOrderInfo({id: data, token})
      dispatch(setPrice(res.data.totalAmount))
    } catch (e) {
      await dialog.toast({title: e.message})
      throw new Error(e.message)
    }
  }
}

export const getOrderListSync = ({ token= '', offset= 1, rows= 10, type= 1}={}) => {
  return async dispatch => {
    try {
      const { data } = await getOrderList({ token, offset, rows, type})
      dispatch(setOrderList(data))
    } catch (e) {
      await dialog.toast({title: e.message})
      throw new Error(e.message)
    }
  }
}

export const loadMoreList = ({ token= '', offset= 1, rows= 10, type= 1}={}) => {
  return async dispatch => {
    try {
      const { data } = await getOrderList({ token, offset, rows, type})
      dispatch(loadMore(data))
    } catch (e) {
      await dialog.toast({title: e.message})
      throw new Error(e.message)
    }
  }
}

export const getRecoveryListSync = ({ token= '', offset= 1, rows= 10}={}) => {
  return async dispatch => {
    try {
      const { data } = await getRecoveryList({ token, offset, rows})
      dispatch(setRecoveryList(data))
    } catch (e) {
      await dialog.toast({title: e.message})
      throw new Error(e.message)
    }
  }
}

export const loadMoreRecoveryListSync = ({ token= '', offset= 1, rows= 10}={}) => {
  return async dispatch => {
    try {
      const { data } = await getRecoveryList({ token, offset, rows})
      dispatch(loadMoreRecoveryList(data))
    } catch (e) {
      await dialog.toast({title: e.message})
      throw new Error(e.message)
    }
  }
}

export const setRecoveryList = (data) => ({
  type: constant.GET_RECOVERY_LIST,
  data
})

export const loadMoreRecoveryList = (data) => ({
  type: constant.LOAD_MORE_RECOVERY_LIST,
  data
})

export const setOrderList = (data) => ({
  type: constant.GET_ORDER_LIST,
  data
})

export const loadMore = (data) => ({
  type: constant.LOAD_MORE_LIST,
  data
})

export const setCostInfo = (data) => ({
  type: constant.GET_COST_INFO,
  data
})

export const setPrice = (price) => ({
  type: constant.SUBMIT,
  price
})
