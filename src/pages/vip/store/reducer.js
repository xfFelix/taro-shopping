import { constant } from './index'
const INITIAL_STATE={
  productType:'',
  costType:'',
  productId:'',
  exchangeUrl:''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case constant.PRODUCT_TYPE:
      return {
        ...state,
        productType: action.data
      }
    case constant.COST_TYPE:
      return {
        ...state,
        costType: action.data
      }
    case constant.PRODUCT_ID:
      return {
        ...state,
        productId: action.data
      }
    case constant.EXCHANGE_URL:
      return {
        ...state,
        exchangeUrl: action.data
      }
    default:
      return state
  }
}
