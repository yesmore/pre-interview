// 第一次执行，最后一次不执行
// function throttle(fn, interval) {
//   let lastTime = 0; // 上一次开始时间
//
//   // 事件触发时执行的函数
//   const _throttle = function () {
//     const nowTime = new Date().getTime(); // 当前事件触发时间
//     const remainTime = interval - (nowTime - lastTime); // 上次间隔
//     if (remainTime <= 0) {
//       fn.apply(this, arguments);
//       lastTime = nowTime; // 保留上次触发的时间
//     }
//   }

//   return _throttle;
// }

// 第一次不执行，最后一次执行
function throttle(fn, delay) {
  let timer = null;

  const _throttled = function () {
    if (timer) return;

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  }

  return _throttled;
}