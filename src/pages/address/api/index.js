import fetch from '@/api/fetch'

// 获取地址列表
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

// 保存地址
export const saveAddress = (data) => fetch({
  url: `/api/updateAddress`,
  method: 'post',
  data
})

// 删除地址
export const removeAddress = (data) => fetch({
  url: `/api/removeAddress`,
  method: 'post',
  data
})


