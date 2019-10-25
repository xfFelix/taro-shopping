import {GOLD_TYPE,BAR_PRICE,SAND_PRICE,BACK_INFO} from './constants'
export const goldTypeFun = (data) => {
  return {
   type: GOLD_TYPE,
   data: data
  }
}
export const barPriceFun = (data) => {
  return {
   type: BAR_PRICE,
   data: data
  }
}

export const sandPriceFun = (data) => {
  return {
   type: SAND_PRICE,
   data: data
  }
}

export const backInfoFun = (data) => {
  return {
   type: BACK_INFO,
   data: data
  }
}

