import {constant} from './index'
import {getAddressList, getCity} from "@/pages/address/api"

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

export const getCitySync = ({id = 1}) => {
  return async dispatch => {
    try {
      const {data} = await getCity({id})
      let city = Object.entries(data.cities)
      let list = []
      let countryObj = {}
      let countryList = []
      let villageList = []
      for (const [id, name] of city) {
        // 获取城市列表
        let obj = {}
        if (Array.isArray(name)) {
          obj = { id, name: name[0]}

          // 获取县乡级列表
          let list1 = []
          getCountryList(name[1], list1, villageList)
          countryObj = {id, name: list1}
          countryList.push(countryObj)
        } else {
          obj = { id, name: name}
        }
        list.push(obj)
      }
      dispatch(setCity(list))
      dispatch(changeCity({countryList, villageList}))
      dispatch(getCountrySync({id: list[0].id, countryList, villageList}))
    } catch (e) {
      console.error(e)
    }
  }
}

export const getCountrySync = ({id, countryList, villageList}) => {
  return async dispatch => {
    dispatch(getCountry({list: []}))
    dispatch(getVillage({list: []}))
    for (let item of countryList) {
      if (item.id === id) {
        dispatch(getCountry({list: item.name}))
        dispatch(getVillageSync({id: item.name[0].id, list: villageList}))
      }
    }
  }
}

export const getVillageSync = ({id, list}) => {
  return async dispatch => {
    dispatch(getVillage({list: []}))
    for (let item of list) {
      if (item.id === id) {
        dispatch(getVillage({list: item.name}))
      }
    }
  }
}

export const setEmpty = () => ({
  type: constant.SET_EMPTY
})

export const getVillage = ({list}) => ({
  type: constant.GET_VILLAGE,
  list
})

export const getCountry = ({list}) => ({
  type: constant.GET_COUNTRY,
  list
})

export const changeCity = ({countryList, villageList}) => ({
  type: constant.CHANGE_CITY,
  countryList,
  villageList
})

export const setCity = (data) => ({
  type: constant.GET_CITY,
  data
})

export const setAddressList = (data) => ({
  type: constant.GET_ADDRESS_LIST,
  data
})


export const getCountryList = (data, countryList, villageList) => {
  for (const [key, value] of Object.entries(data)) {
    let countyObj = {}
    let villageObj = {}
    let res = Object.prototype.toString.call(value).slice(8,-1)
    if (res === 'String') {
      countyObj = {id: key, name: value}
    } else if (res === 'Array') {
      countyObj = {id: key, name: value[0]}
      let list = getVillageList(value[1], [])
      villageObj = { id: key, name: list}
    }
    if (Object.keys(villageObj).length) {
      villageList.push(villageObj)
    }
    countryList.push(countyObj)
  }
}

export const getVillageList = (data, list) => {
  for (const [key, value] of Object.entries(data)) {
    let obj = {}
    obj = {id: key, name: value}
    list.push(obj)
  }
  return list
}

