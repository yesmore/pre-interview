function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this; // 绑定上下文对象/Dom对象
    let args = arguments; // 事件对象
    if (timer) { // 控制只执行一次(取消上一次调用)
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }
}