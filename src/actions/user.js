import {
  SET_TOKEN,
  GET_INFO,
  LOGIN_OUT
} from '../constants/user'
import {login, getInfo} from "@/api"

export const setTokenAsync = (params) => {
  return async dispatch => {
    let { data } = await login(params)
    dispatch(setToken(data.token))
  }
}

export const getInfoSync = (token) => {
  return async dispatch => {
    const { data } = await getInfo({token})
    dispatch(getUserInfo(data))
  }
}

export const setToken = (token) => ({
  type: SET_TOKEN,
  token
})

export const getUserInfo = (data) => ({
  type: GET_INFO,
  data
})

export const loginOut = (data) => ({
  type: LOGIN_OUT,
  data
})
