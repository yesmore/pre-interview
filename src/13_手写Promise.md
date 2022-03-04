## 手写 Promise

### 一、Promise规范

> https://promiseaplus.com

### 二、Promise类设计

```js
class MyPromise{} // 本次实践使用

function MyPromise() {}
```

### 三、构造函数规划

- 源码: [01.Promise 基本实现](https://github.com/yesmore/pre-interview/blob/master/practices/手写Promise/01.Promise基本实现.js)

```js
class MyPromise {
  constructor(executor) {
    // 定义状态、resolve/reject回调
    // resolve执行微任务队列、改变状态、获取value、执行then传入成功回调  
    // reject执行微任务队列、改变状态、获取reason、执行then传入失败回调 
      
    // try catch   
    executor(resolve, reject)  
  }
}  
```

### 四、then方法实现

- 源码: [02.Promise链式调用实现](https://github.com/yesmore/pre-interview/blob/master/practices/手写Promise/02.Promise链式调用实现.js)

```js
class MyPromise {
  then(onFulfilled, onRejected) {
    // 1.判断onFulfilled, onRejected是否传值，无则赋默认值
      
    // 2.返回Promise resolve/reject
      
    // 3.判断之前的Promise状态是否确定
    // onFulfilled/onRejected直接执行(捕获异常)
      
    // 4.添加数据到数组中
    push(() => {
      执行 onFulfilled/onRejected 代码
    })  
      
  }
}
```

### 五、catch方法

- 源码: [03.Promise实现catch方法](https://github.com/yesmore/pre-interview/blob/master/practices/手写Promise/03.Promise实现catch方法.js)

```js
class MyPromise {
  catch (onRejected) {
    return this.then(null, onRejected)
  }
}
```

### 六、finally

- 源码: [04.Promise实现finally方法](https://github.com/yesmore/pre-interview/blob/master/practices/手写Promise/04.Promise实现finally方法.js)

```js
finally(onFinally) {
  this.then(() => {
    onFinally()
  }, () => {
    onFinally()
  })
}
```

### 七、其他静态方法

- [05.Promise实现resolve-reject方法](https://github.com/yesmore/pre-interview/blob/master/practices/手写Promise/05.Promise实现resolve-reject方法.js)
- [06.Promise实现all-allSettled方法](https://github.com/yesmore/pre-interview/blob/master/practices/手写Promise/06.Promise实现all-allSettled方法.js)
- [07.Promise实现race-any方法](https://github.com/yesmore/pre-interview/blob/master/practices/手写Promise/07.Promise实现race-any方法.js)

