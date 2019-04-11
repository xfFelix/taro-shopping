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

const toDecimal2 = x => {
  var f = parseFloat(x);
  if (isNaN(f)) {
      return '****';
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

export default {toDecimal2Fp, toDecimal2Ap,formatPhone,formatPhone,toDecimal2}



