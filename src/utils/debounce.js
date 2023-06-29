/**
 * 防抖函数
 * @param {Function} fn
 * @param {Number} duration
 * @returns {Function}
 */
export const debounce = (fn, duration = 300) => {
  let timerId // 记录上一次的计时器id
  return function (...args) {
    const _this = this

    clearTimeout(timerId) // 把上一次的计时器清除掉
    timerId = setTimeout(() => {
      //然后再重新计时
      fn.apply(_this, args)
    }, duration)
  }
}
