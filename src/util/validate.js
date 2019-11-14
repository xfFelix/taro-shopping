/**
 * 香港，大陆手机号一起判断
 * @param {*} mobile 手机号
 */
export const IsMobile = mobile => {
  return IsChinaMobile(mobile) || IsHKMobile(mobile);
}

/**
 * 判断大陆手机号
 * @param {*} mobile 手机号
 */
export const IsChinaMobile =  (mobile)=> {
  var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (reg.test(mobile)) {
      return true
  } else {
      return false
  }
}

/**
 * 判断香港手机号
 * @param {*} mobile 手机号
 */
export const IsHKMobile = (mobile) => {
  var reg = /^[5,6,8,9][0-9]{7}$/;
  if (reg.test(mobile)) {
    return true;
  } else {
    return false;
  }
}
