import {constant} from './index'

export const setParams = ({title= '', price = '', path={}}={}) => ({
  type: constant.SET_PARAMS,
  title,
  price,
  path
})
