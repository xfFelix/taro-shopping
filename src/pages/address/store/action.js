import {constant} from './index'
import {getAddressList} from "@/pages/address/api"

export const getAddressListSync = (params = {token: ''}) => {
  return async dispatch => {
    try {
      const {data} = await getAddressList(params)
      dispatch(setAddressList(data))
    } catch (e) {
      console.error(e)
    }
  }
}

export const setAddressList = (data) => ({
  type: constant.GET_ADDRESS_LIST,
  data
})

