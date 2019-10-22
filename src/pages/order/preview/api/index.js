import fetch from '@/api/fetch'

// 获取预览订单信息
export const getPreviewOrder = (data) => fetch({
  url: `/api/previewOrderByCart`,
  method: 'post',
  data
})

// 保存订单
export const saveOrder = (data) => fetch({
  url: `/api/saveOrderByCart`,
  method: 'post',
  data
})
