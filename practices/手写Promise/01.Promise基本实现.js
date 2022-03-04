const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class MPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING // init statu
    this.value = undefined; // resolved value
    this.reason = undefined; // reject reason
    this.onFulfilledCallbacks = []; // resolved callbacks
    this.onRejectedCallbacks = []; // reject callbacks

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => { // 微任务
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          // 执行回调
          this.onFulfilledCallbacks.forEach(cb => cb(this.value))
        })
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedCallbacks.forEach(cb => cb(this.reason))
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    // 调用then时已经resolve或reject过了，直接返回
    if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
      onFulfilled(this.value)
    }
    if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
      onRejected(this.reason)
    }

    // 如果没有resolve或reject过，则添加回调
    if (this.status === PROMISE_STATUS_PENDING) {
      this.onFulfilledCallbacks.push(onFulfilled)
      this.onRejectedCallbacks.push(onRejected)
    }
  }
}

const p = new MPromise((resolve, reject) => {
  resolve(1)
  reject(2)
})

p.then(res => {
  console.log('res:', res);
  return 111
}, err => {
  console.log('err:', err);
})

p.then(res => {
  console.log('res1:', res);
}, err => {
  console.log('err1:', err);
})

setTimeout(() => {
  p.then(res => {
    console.log('res2:', res);
  }, err => {
    console.log('err2:', err);
  })
}, 1000)