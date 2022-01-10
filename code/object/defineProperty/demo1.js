// 题目1：怎样才能打印出 'You win!' ？

// var _default = 0
// Object.defineProperty(window, 'a', {
//   get() {
//     return ++_default
//   }
// })

// // if (a === 1 && a === 2 && a === 3) {
// //   console.log(a); // 4
// //   console.log('You win!');
// // }

// if (a > 0 && a > 1 && a > 2) {
//   console.log('You win!');
// }

/*********************************************** */
// 题目2
// 定义一个变量


// 希望打印出如下效果：
/**
 * {
 *   type: 'Object',
 *   length: 6
 * }
 */
// var _default = null
// Object.defineProperty(window, 'a', {
//   get() {
//     return _default
//   },
//   set(newVal) {
//     switch (newVal) {
//       case 'Object':
//       case 'Array':
//         _default = {
//           type: newVal,
//           length: newVal.length,
//         }
//         break
//       default:
//         throw new TypeError('This type is invalid.')
//     }
//   }
// })

// a = 'Object'
// console.log(a); // > {type: 'Object', length: 6}

// a = 'Array'
// console.log(a); // > {type: 'Object', length: 6}

// a = '123'
// console.log(a); // > Uncaught TypeError: This type is invalid.


// 题3
// console.log(_ + _ + _); // abcd...z

Object.defineProperty(window, '_', {
  get() {
    this._c = this._c || 'a'.charCodeAt(0);
    var _ch = String.fromCharCode(this._c);

    if (this._c >= 'a'.charCodeAt(0) + 26) return;

    this._c++
    return _ch
  }
})

console.log(_ + _ + _ + _ + _ + _ + _)
console.log(_ + _ + _ + _ + _);

// 题4

var _obj = {
  a: 1,
  b: 2,
  c: 3,
};
/**
 * {
 *   a: 3,
 *   b: 3,
 *   c: 5
 * }
 */

var obj = {}

for (var k in _obj) {
  Object.defineProperty(obj, k, {
    enumerable: true,
    writable: k === 'b' ? false : true,
    configurable: true,
    value: ++_obj[k]
  })
}

for (var k in obj) {
  obj[k] += 1
}
delete obj.a

console.log(obj);