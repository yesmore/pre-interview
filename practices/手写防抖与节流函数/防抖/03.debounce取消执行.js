// 取消功能

function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoke = false; // 是否执行第一次

  const _debounce = function () {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }

    if (immediate && !isInvoke) {
      fn.apply(context, args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
        isInvoke = false;
      }, delay);
    }
  }

  // 取消功能
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    isInvoke = false;
  }

  return _debounce;
}