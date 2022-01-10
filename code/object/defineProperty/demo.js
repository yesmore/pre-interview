// var obj = {}
// Object.defineProperty(obj, 'a', {
//   value: 1
// })

// obj.a = 2
// delete obj.a
// console.log(obj);

// for (let key in obj) {
//   console.log(key, obj[key]);
// }


// var obj = {}
// Object.prototype.b = 2
// Object.defineProperty(obj, 'a', {
//   value: 1,
//   // enumerable: true,
// })

// // delete obj.a
// // obj.a = 2
// // console.log(obj);

// for (let key in obj) {
//   console.log(key, obj[key]);
// }
// console.log(Object.keys(obj))
// console.log(Object.getOwnPropertyNames(obj)); // 

// var obj = {}
// Object.defineProperty(obj, 'a', {
//   // value: 1,
//   // 数据劫持 
//   get() {
//     console.log('get a:', 1);
//     return 1
//   },
//   set(newVal) {
//     console.log('set a:', newVal);
//   }
// })

// // console.log(obj.a);
// obj.a = 2

// var obj = {}
// Object.defineProperty(obj, 'a', {
//   value: 1,
//   writable: true,
//   // get() {
//   //   console.log('get a:', 1);
//   //   return 1
//   // },
// })

var obj = {
  a: 1,
  b: 2,
  c: 3,
}