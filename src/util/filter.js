//保留两位小数
export const toDecimal2 = x => {
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
