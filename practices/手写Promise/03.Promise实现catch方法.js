/**
 * .then链式调用前提: then方法本身也是Promise对象，返回值也是一个Promise对象
 */

const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

function execFnWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch (error) {
    reject(error)
  }
}

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
          this.onFulfilledCallbacks.forEach(cb => {
            cb(this.value)
          })
        })
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedCallbacks.forEach(cb => {
            cb(this.reason)
          })
        })
      }
    }

    // executor时出错，直接reject
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    // catch 寄
    onRejected = onRejected || (reason => { throw reason })

    // 返回新的Promise对象
    return new MPromise((resolve, reject) => {
      // 调用then时已经resolve或reject过了，直接返回
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFnWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFnWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 如果没有resolve或reject过，则添加回调
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled) this.onFulfilledCallbacks.push(() => {
          execFnWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        if (onRejected) this.onRejectedCallbacks.push(() => {
          execFnWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }

  catch (onRejected) {
    return this.then(null, onRejected)
  }
}

const p = new MPromise((resolve, reject) => {
  // throw new Error('Executor error')
  // resolve(1)
  reject(2)
})

p.then(res => {
  console.log('res1:', res);
  // throw new Error('寄')
  // return 'abc'
}).catch(err => {
  console.log('catch err:', err);
})