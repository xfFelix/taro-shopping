import fetch from '@/api/fetch'

// 获取默认地址
export const getDefaultAddress = (data) => fetch({
  url: `/api/selectDefaultAddresses`,
  method: 'post',
  data
})
