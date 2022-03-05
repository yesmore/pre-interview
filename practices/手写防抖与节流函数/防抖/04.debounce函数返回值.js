// 取消功能

function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoke = false; // 是否执行第一次

  const _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer);
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args);
        resolve(result)
        isInvoke = true;
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args);
          resolve(result)
          isInvoke = false;
          timer = null;
        }, delay);
      }
    })
  }

  // 取消功能
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    isInvoke = false;
  }

  return _debounce;
}