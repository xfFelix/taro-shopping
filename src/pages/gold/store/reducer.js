import { constant } from './index'
const INITIAL_STATE={
  id:0,
  barPrice:'',
  sandPrice:'',
  backInfo:{
    cardId:0,
    cardCode:'',
    type:'',
    weight:'',
    barPrice:'',
    sandPrice:''
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case constant.GOLD_TYPE:
      return {
        ...state,
        id: action.data
      }
    case constant.BAR_PRICE:
      return {
        ...state,
        barPrice: action.data
      }
    case constant.SAND_PRICE:
      return {
        ...state,
        sandPrice: action.data
      }
    case constant.BACK_INFO:
      let data = Object.assign(state.backInfo, action.data);
      return {
        ...state,
        backInfo: data
      }
    default:
      return state
  }
}
