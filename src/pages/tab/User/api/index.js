import fetch from '@/api/fetch'

// 获取默认地址
export const getDefaultAddress = (data) => fetch({
  url: `/api/selectDefaultAddresses`,
  method: 'post',
  data
})

// 获取未完成数量
export const getOrderNum = (data) => fetch({
  url: `/api/selectOrderTotals`,
  method: 'post',
  data
})
