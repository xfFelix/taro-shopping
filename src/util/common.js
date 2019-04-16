
export const IsMobile = mobile => {
  return IsChinaMobile(mobile) || IsHKMobile(mobile);
}

export const IsChinaMobile =  (mobile)=> {
  var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (reg.test(mobile)) {
      return true
  } else {
      return false
  }
}

export const IsHKMobile = (mobile) => {
  var reg = /^[5,6,8,9][0-9]{7}$/;
  if (reg.test(mobile)) {
    return true;
  } else {
    return false;
  }
}

// 判断对象和数组是否为空
export const isEmpty = val => val == null || !(Object.keys(val) || val).length;

export function isIDCard(IDCard) {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (reg.test(IDCard)) return true
  return false
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
  if (!Object.keys(args).length) {
    query = location.search.substring(1)
    pairs = query.split('&')
    for (var i = 0; i < pairs.length; i += 1) {
      var pos = pairs[i].indexOf('=')
      if (pos === -1) {
        continue
      }
      var argname = pairs[i].substring(0, pos)
      var value = pairs[i].substring(pos + 1)
      args[argname] = unescape(value)
    }
  }
  return args
}

