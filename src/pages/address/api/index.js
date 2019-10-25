import fetch from '@/api/fetch'

// 获取订单列表
export const getAddressList = (data) => fetch({
  url: `/api/selectAddresses`,
  method: 'post',
  data
})

// 获取城市列表
export const getCity = (data) => fetch({
  url: `/api/selectCities`,
  method: 'post',
  data
})

