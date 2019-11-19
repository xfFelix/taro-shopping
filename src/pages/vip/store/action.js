import {PRODUCT_TYPE,COST_TYPE,PRODUCT_ID,EXCHANGE_URL} from './constants'
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
export const productIdFun = (data) => {
  return {
   type: PRODUCT_ID,
   data: data
  }
}
export const exchangeFun = (data) => {
  return {
   type: EXCHANGE_URL,
   data: data
  }
}



