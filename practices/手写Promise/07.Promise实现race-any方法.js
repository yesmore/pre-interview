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
  };

  then(onFulfilled, onRejected) {
    // catch 寄
    const defaultOnRejected = reason => { throw reason }
    onRejected = onRejected || defaultOnRejected

    const defaultOnFulfilled = value => value
    onFulfilled = onFulfilled || defaultOnFulfilled

    // 返回新的Promise对象
    return new MPromise((resolve, reject) => {
      // 调用then时已经resolve或reject过了，直接返回
      if (this.status === PROMISE_STATUS_FULFILLED) {
        execFnWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED) {
        execFnWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 如果没有resolve或reject过，则添加回调
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFulfilledCallbacks.push(() => {
          execFnWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        this.onRejectedCallbacks.push(() => {
          execFnWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  };

  catch (onRejected) {
    return this.then(null, onRejected);
  };

  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }

  static resolve(value) {
    return new MPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new MPromise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    return new MPromise((resolve, reject) => {
      const values = []
      let count = 0
      promises.forEach((promise, index) => {
        promise.then(value => {
          values[index] = value
          count++
          if (count === promises.length) {
            resolve(values)
          }
        }, reason => {
          reject(reason)
        })
      })
    })
  }

  static allSettled(promises) {
    return new MPromise(resolve => {
      const values = []
      let count = 0
      promises.forEach((promise, index) => {
        promise.then(value => {
          values[index] = { status: 'fulfilled', value }
          count++
          if (count === promises.length) {
            resolve(values)
          }
        }, reason => {
          values[index] = { status: 'rejected', reason }
          count++
          if (count === promises.length) {
            resolve(values)
          }
        })
      })
    })
  }

  static race(promises) {
    return new MPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject)
      })
    })
  }

  static any(promises) {
    // resolve有一个成功就返回
    // reject所有失败才执行reject
    const reasons = []
    return new MPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, err => {
          reasons.push(err)
          if (reasons.length === promises.length) {
            reject(new AggregateError(reasons))
          }
        })
      })
    })
  }
}

const p1 = new MPromise((resolve, reject) => {
  // setTimeout(() => resolve('焯'), 2000)
  setTimeout(() => reject('焯'), 1000)
})

const p2 = new MPromise((resolve, reject) => {
  // setTimeout(() => resolve('我先来'), 1000)
  setTimeout(() => reject('我先寄'), 2000)
})

const p0 = new MPromise((resolve, reject) => {
  // setTimeout(() => resolve('我先来'), 1000)
  setTimeout(() => reject('我也寄'), 3000)
})

const p3 = new MPromise((resolve, reject) => {
  // setTimeout(() => resolve('没我的事?'), 4000)
  setTimeout(() => reject('没我的事?'), 4000)
})

// MPromise.race([p1, p2, p3]).then(value => {
//   console.log('来', value)
// }).catch(err => {
//   console.log('寄', err)
// });

MPromise.any([p0, p1, p2, p3]).then(value => {
  console.log('来', value)
}).catch(err => {
  console.log('寄', err.errors)
});