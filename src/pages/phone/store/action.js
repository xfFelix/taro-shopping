import {PHONE_TYPE,DIR_PRICE,CARD_PRICE} from './constants'
export const phoneTypeFun = (data) => {
  return {
   type: PHONE_TYPE,
   data: data
  }
}
export const dirPriceFun = (data) => {
  return {
   type: DIR_PRICE,
   data: data
  }
}

export const cardPriceFun = (data) => {
  return {
   type: CARD_PRICE,
   data: data
  }
}



