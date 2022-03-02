// 考点：同步化解决方案

// 深刻理解 Promise、async

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

async function fun(arr) {
  arr.myForEach(async (fn) => {
    await fn()
  })

  // for (let i = 0; i < arr.length; i++) {
  //   await arr[i]()
  // }
}

async function test() {}
async function test1() {}



/**
 * 
 */


// 关于 ajax同步问题 以及 Promise的解决方案

// 假设一个场景

// const data = ajax('http://localhost:8080/getData', {
//   async: false,
// }, (data) => {
//   return data
// })

// console.log(data); // undefined
// console.log(123);

// function test() {
//   return new Promise((resolve, reject) => {
//     ajax('http://localhost:8080/getData', (data) => {
//       resolve(data)
//     })
//   })
// }
// test().then((res) => {
//   console.log(res)
// })

// async function getData() {
//   const data = await test()
//   return data
// }
// getData()

// console.log(123);