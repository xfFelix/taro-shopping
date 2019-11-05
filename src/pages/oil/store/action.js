import {constant} from './index'
import {getCostInfo, submit, getOrderInfo} from '../home/api'
import { dialog } from '@/util/index'

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

export const submitSync = (params = { faceValue: 100, rechargeType: 1, oilCardType: 1, code: '', cardNum: '', token: ''}) => {
  return async dispatch => {
    try {
      const { data } = await submit(params)
      let res = await getOrderInfo({id: data, token: params.token})
      dispatch(setPrice(res.data.totalAmount))
    } catch (e) {
      await dialog.toast({title: e.message})
      throw new Error(e.message)
    }
  }
}

export const setCostInfo = (data) => ({
  type: constant.GET_COST_INFO,
  data
})

export const setPrice = (price) => ({
  type: constant.SUBMIT,
  price
})
