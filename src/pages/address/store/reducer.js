import { constant } from './index'

const INITIAL_STATE = {
  list: [],
  city: [],
  countryList: [],
  villageList: [],
  country: [],
  village: [],
  isAdd: true,
  address: {},
  isSelect: false
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.GET_ADDRESS_LIST:
      return {
        ...state,
        list: action.data
      }
    case constant.GET_CITY:
      return {
        ...state,
        city: action.data
      }
    case constant.CHANGE_CITY:
      return {
        ...state,
        countryList: action.countryList,
        villageList: action.villageList
      }
    case constant.GET_COUNTRY:
      return {
        ...state,
        country: action.list
      }
    case constant.GET_VILLAGE:
      return {
        ...state,
        village: action.list
      }
    case constant.SET_EMPTY:
      return {
        ...state,
        country: [],
        village: []
      }
    case constant.ADD_ADDRESS:
      return {
        ...state,
        isAdd: true
      }
    case constant.EDIT_ADDRESS:
      return {
        ...state,
        isAdd: false,
        address: action.data
      }
    case constant.TOGGLE_SELECT:
      return {
        ...state,
        isSelect: action.data
      }
    default:
      return state
  }
}
