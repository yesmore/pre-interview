function throttle(fn, interval, options = { leading: true, trailing: true }) {
  const { leading, trailing } = options;

  let lastTime = 0; // 上一次开始时间

  // 事件触发时执行的函数
  const _throttle = function () {
    const nowTime = new Date().getTime(); // 当前事件触发时间
    if (lastTime === 0 && !leading) lastTime = nowTime; // 第一次不执行

    const remainTime = interval - (nowTime - lastTime); // 上次间隔
    if (remainTime <= 0) {
      fn.apply(this, arguments);
      lastTime = nowTime; // 保留上次触发的时间
    }
  }

  return _throttle;
}