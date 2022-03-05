function throttle(fn, interval, options = { leading: true, trailing: true }) {
  const { leading, trailing } = options;

  let lastTime = 0; // 上一次开始时间
  let timer = null

  // 事件触发时执行的函数
  const _throttle = function () {
    const nowTime = new Date().getTime(); // 当前事件触发时间
    if (lastTime === 0 && !leading) lastTime = nowTime; // 第一次不执行

    const remainTime = interval - (nowTime - lastTime); // 上次间隔
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      fn.apply(this, arguments);
      lastTime = nowTime; // 保留上次触发的时间
      return
    }

    if (trailing && !timer) {
      timer = setTimeout(() => {
        timer = null
        lastTime = !leading ? 0 : new Date().getTime()
        fn.apply(this, arguments);
      }, remainTime);
    }
  }

  return _throttle;
}