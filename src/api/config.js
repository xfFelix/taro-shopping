const isDev = process.env.NODE_ENV === 'development'

export const INFO_URL = isDev ? 'https://api.cocotc.cn' : 'https://api.cocotc.cn'

export const BASE_URL = isDev ? 'https://shop.cocotc.cn' : 'https://shop.cocotc.cn'

export const SEARCH_URL = isDev ? 'https://search.cocogc.cn' : 'https://search.cocogc.cn'

export const SHOP_URL = isDev ? 'https://shop.cocogc.cn' : 'https://shop.cocogc.cn'

export const MALL_URL = isDev ? 'https://mall.cocotc.cn': 'https://mall.cocotc.cn'

export const MINX_URL = (url) => {
  const reg = /(https?:|\/\/)/
  if (reg.test(url)) {
    return url
  }
  return BASE_URL + url
}
