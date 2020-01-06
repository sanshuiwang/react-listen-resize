export const throttle = function(fn, delay = 250, atleast = 250) {
  let timer = null
  let previous = null

  return function() {
    const context = this
    const args = arguments

    const now = +new Date()

    if (!previous) previous = now
    if (now - previous > atleast) {
      clearTimeout(timer)
      fn.apply(context, args)
      // 重置上一次开始时间为本次结束时间
      previous = now
    } else {
      clearTimeout(timer)
      timer = setTimeout(function() {
        fn.apply(context, args)
        previous = null
      }, delay)
    }
  }
}
