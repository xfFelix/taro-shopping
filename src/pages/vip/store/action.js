import {PRODUCT_TYPE,COST_TYPE} from './constants'
export const productTypeFun = (data) => {
  return {
   type: PRODUCT_TYPE,
   data: data
  }
}
export const costTypeFun = (data) => {
  return {
   type: COST_TYPE,
   data: data
  }
}
