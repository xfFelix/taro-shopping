import fetch from '@/api/fetch'
import {MALL_URL, INFO_URL} from "@/api/config"

// 获取轮播图列表
export const getSwiperList= (data) => fetch({
  url: `${INFO_URL}/news/newsList`,
  method: 'post',
  data
})

// 获取旅游列表
export const getTravelList= (data) => fetch({
  url: `${MALL_URL}/api/ticket/getScenicSpotList`,
  method: 'get',
  data
})

// 获取搜索列表
export const searchTravelList= (data) => fetch({
  url: `${MALL_URL}/api/ticket/search`,
  method: 'get',
  data
})
