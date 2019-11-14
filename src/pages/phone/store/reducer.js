import { constant } from './index'
const INITIAL_STATE={
  phoneType:0,
  dirPrice:{
    facePrice:'',
    realPrice:''
  },
  cardPrice:{
    facePrice:'',
    realPrice:''
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case constant.PHONE_TYPE:
      return {
        ...state,
        phoneType: action.data
      }
    case constant.DIR_PRICE:
      return {
        ...state,
        dirPrice: action.data
      }
    case constant.CARD_PRICE:
      return {
        ...state,
        cardPrice: action.data
      }
    default:
      return state
  }
}
