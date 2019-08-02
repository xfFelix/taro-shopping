// api地址公用前缀
export const INFO_URL = (() => {
  if (process.env.NODE_ENV === 'development') {
    return `/api`
  }
  return process.env.VUE_APP_INFO_URl
})()
