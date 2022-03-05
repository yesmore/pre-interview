// 立即执行：第一次请求立即执行，后面的请求再延迟执行

function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoke = false; // 是否执行第一次

  return function () {
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
}