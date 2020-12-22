/**
 * 防抖函数
 */
export function debounce(func /*待执行函数 */, delay = 50 /*等待时间 */) {
  //防抖函数debounce
  let timer = null; //记录是否有定时器
  return function(...args /*待执行函数的参数传递*/) {
    // if (timer) {clearTimeout(timer)}//如果有计时器，则清除计时器
    clearTimeout(timer); //清除计时器
    timer = setTimeout(() => {
      //设置新计时器
      func.apply(this, args);
      //待执行函数执行
    }, delay);
  };
}

/**
 * 格式化时间戳
 */
export function formatDate(date, fmt) {
  // fmt为格式化 eg:'yyyy-MM-dd hh:mm:ss'
  if (/(y+)/.test(fmt)) {
    //获取年份
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "H+": date.getHours(),
    //h:12 H:24
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
