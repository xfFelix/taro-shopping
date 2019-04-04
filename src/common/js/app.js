'use strict'

import store from 'store'
import md5 from './md5'
export function browser () {
  let u = navigator.userAgent
  let app = navigator.appVersion
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
    qq: u.match(/QQ\//i) == 'QQ/' // 是否QQ
  }
}

export function getUrlVars (url) {
  var vars = []
  var hash
  var hashes = url.slice(url.indexOf('?') + 1).split('&')
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=')
    vars.push(hash[0])
    vars[hash[0]] = hash[1]
  }
  return vars
}

// 平台判断
export function isPlatform () {
  const platform = store.state.platform
  const lats = !!(platform == '1' || platform == '2')
  const pf = platform == '1' ? 'ios' : platform == '2' ? 'android' : ''
  return {
    lats,
    pf
  }
}

// 判断object是否有值
export function isObject (value) {
  return JSON.stringify(value) != '{}'
}

export function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.href.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

export function getParam () {
  var args = {}
  var end = location.hash.indexOf('?') + 1
  var query = location.hash.substring(end)
  var pairs = query.split('&')
  for (var i = 0; i < pairs.length; i += 1) {
    var pos = pairs[i].indexOf('=')
    if (pos === -1) {
      continue
    }
    var argname = pairs[i].substring(0, pos)
    var value = pairs[i].substring(pos + 1)
    args[argname] = unescape(value)
  }
  return args
}
