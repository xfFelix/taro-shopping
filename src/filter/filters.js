// 取小数点前的位数
const toDecimal2Fp = x => {
  let toDecimal = toDecimal2(x);
  let toDecimalSplit = toDecimal.split('.');
  let fp = toDecimalSplit[0];
  return fp
}
// 取小数点后的位数
const toDecimal2Ap = x => {
  let toDecimal = toDecimal2(x);
  let toDecimalSplit = toDecimal.split('.');
  let ap = toDecimalSplit[1];
  return ap
}

const toPrice = x => {
  let toDecimal = toDecimal2(x);
  let toDecimalSplit = toDecimal.split('.');
  let fp = toDecimalSplit[0];
  let ap = toDecimalSplit[1];
  if (!fp) fp = '0'
  if (!ap) ap = '00'
  return fp + '.' + ap
}

const toDecimal2 = x => {
  var f = parseFloat(x);
  if (isNaN(f)) {
      return '0';
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
      rs = s.length;
      s += '.';
  }
  while (s.length <= rs + 2) {
      s += '0';
  }
  return s;
}

//手机号码加**
let formatPhone = phone => {
    if(phone != undefined){
        return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
}

// 订单状态
const orderStatusOptions = [
  {label: '未使用', value: 0},
  {label: '已使用', value: 1},
  {label: '已过期', value: 2},
  {label: '已取消', value: 3},
  {label: '凭证码被替代', value: 4},
  {label: '被终端修改', value: 5},
  {label: '被终端撤销', value: 6},
  {label: '部分使用', value: 7}
]

const orderStatusOptionsKeyValue = orderStatusOptions.reduce((acc, cur) => {
  acc[cur.value] = cur.label
  return acc
}, {})

const orderStatusFilter = status =>{
  return orderStatusOptionsKeyValue[status]
}

export default {toDecimal2Fp, toDecimal2Ap,formatPhone,formatPhone, orderStatusFilter,toDecimal2, toPrice}



