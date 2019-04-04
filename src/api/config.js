// api地址公用前缀
import { parse } from 'psl'
export const version = '1.0.3'
export const DEV_HOST = (() => {
  const { subdomain, sld, tld } = parse(document.domain)
  if (process.env.NODE_ENV === 'development') {
    return `${location.protocol}//api-test.v3.tuhaobaobei6.com`
  }
  return `${location.protocol}//api.v3.tuhaobaobei6.com`
})()
