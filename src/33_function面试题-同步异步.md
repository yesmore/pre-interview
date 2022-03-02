## 考点：同步化解决方案

> 深刻理解 Promise、async

### 原题

期望效果：执行代码首先打印 `start` ，计时1秒后打印 `1` ，重新计时2秒后打印 `2`，重新计时3秒后打印 `end`。

```js
fun([
  () => console.log("start"),
  () => sleep(1000),
  () => console.log("1"),
  () => sleep(2000),
  () => console.log("2"),
  () => sleep(3000),
  () => console.log("end"),
])
```



### 简述 ajax同步问题 以及 Promise的解决方案

分别从 异步ajax、同步ajax、Promise解决方案了解。

#### 异步ajax场景

假设一个场景，需要从后端中拿到数据（data），使用 `ajax` 调用接口：

```js
const data = ajax('http://localhost:8080/getData', (data) => {
  return data
})

console.log(data); // undefined
```

在执行第5行代码时，由于ajax请求是异步执行，所以打印肯定为 `undefined`，但**不影响后面语句执行**，为了解决这个问题，ajax提出了同步解决方法。

#### 同步ajax场景

只需要添加一行代码即可：

```js
const data = ajax('http://localhost:8080/getData',{
  async: false,
}, (data) => {
  return data
})

console.log(data); // data与请求为同步关系
console.log(123);  // 被阻断
```

通过设置 `async: false` 后，此时的ajax就变成**同步**请求，`data`与请求为同步关系（绑在一起），但是问题又出现了：后续语句（第8行）与此ajax请求也会成为同步关系，相当于**阻塞**了ajax请求后面的代码执行，必须拿到data后才会继续执行，而打印123与此请求没有关系，应该保持**异步**的关系才对，所以，Promise就是解决这个问题的。

#### Promise场景

```js
// 代码块1
function test() {
  return new Promise((resolve, reject) => {
    ajax('http://localhost:8080/getData', (data) => {
      resolve(data)
    })
  })
}
// 代码块2
test().then((res) => {
  console.log(res)
})

console.log(123);
```

通过Promise，把`代码块1`和`代码块2`绑定在一起（同步关系），并且不影响异步执行的后续代码。

上面的代码也可以使用 async/await 改写，效果也是一样的：

```js
function test() {
  return new Promise((resolve, reject) => {
    ajax('http://localhost:8080/getData', (data) => {
      resolve(data)
    })
  })
}

async function getData() {
  const data = await test()
  return data
}
getData() // 与后面的代码保持异步关系

console.log(123);
```

> 与 .then() 一样的效果，可以看作是其语法糖。

### 解题

现在回过头来，看看原题，首先实现 `sleep` 函数：

```js
fun([
  () => console.log("start"),
  () => sleep(1000),
  () => console.log("1"),
  () => sleep(2000),
  () => console.log("2"),
  () => sleep(3000),
  () => console.log("end"),
])

// 思路：同步Promise：等待sleep执行完了再继续
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}
```

接着实现 `fun` 函数：

```js
async function fun(arr) {
  for (let i = 0; i < arr.length; i++) {
    await arr[i]() // 每次执行完了再执行下一个
  }
}
```

此时代码执行达到预期效果。

**提问**：为什么下面的代码不能实现预期效果？

> 期望效果：执行代码首先打印 `start` ，计时1秒后打印 `1` ，重新计时2秒后打印 `2`，重新计时3秒后打印 `end`。

```js
async function fun(arr) {
  arr.forEach(async (fn) => {
    await fn()
  })
}
// 立即执行，打印所有结果：
start
1
2
end
```

`forEach` 每执行一次，都要重新执行一次其第一个参数，即回调函数（async），也就是**每一次都执行了一个async/await**，而不是只执行一次async，多次await，这种效果就相当于下面的代码一样：

```js
async function test() {}
async function test1() {}
...
```

它们执行的关系是什么？**异步关系**！而非所预想的同步执行；

而同步化处理方案是需要在同一个函数，一次执行后内部执行多个await才能形成同步化方案。

**进一步提问**，能否重写一个 `forEach` 实现预期效果？

> 目标：让每一个回调函数有同步化解决方案
>
> 方法：把myForEach封装成与 for 循环一样的，且myForEach是一个异步函数，在里面用await（callback）同步化执行多任务。

```js
Array.prototype.myForEach = async function (cb, thisArg) {
  const _arr = this
  const _isArray = Array.isArray(_arr)
  const _thisArg = thisArg ? Object(thisArg) : window

  if (!_isArray) {
    throw new TypeError('The caller of myForEach must be the type "Array".')
  }

  for (let i = 0; i < _arr.length; i++) {
    await cb.call(_thisArg, _arr[i], i, _arr)
  }
}
```

测试：

```js
async function fun(arr) {
  arr.myForEach(async (fn) => {
    await fn()
  })
}
```

结果与预期效果**一致**。

