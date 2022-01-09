'use strict';

// var arr = [1, 2, 3]

// function* generator(arr) {
//   for (let v of arr) {
//     yield v;
//   }
// }

// const iterator = generator(arr)
// console.log(iterator.next()); // {value: 1, done: false}
// console.log(iterator.next()); // {value: 2, done: false}
// console.log(iterator.next()); // {value: 3, done: false}
// console.log(iterator.next()); // {value: undefined, done: true}


// function generator(arr) {
//   let nextIndex = 0;

//   return {
//     next() {
//       return nextIndex < arr.length ? {
//         value: arr[nextIndex++],
//         done: false
//       } : {
//         value: undefined,
//         done: true
//       }
//     }
//   }
// }
// const iterator = generator(arr)
// console.log(iterator.next()); // {value: 1, done: false}
// console.log(iterator.next()); // {value: 2, done: false}
// console.log(iterator.next()); // {value: 3, done: false}
// console.log(iterator.next()); // {value: undefined, done: true}




// Object.defineProperty(window, 'undefined', {
//   enumerable: true,
//   writable: true,
//   configurable: true
// })

// var a;
// console.log(a);
// console.log(typeof a);

// function test(a) {
//   console.log(typeof a);
//   return a
// }
// console.log(test());

// function test1() {
//   console.log(123);
// }
// console.log(test1());

// var undefined = 1
// console.log(undefined);



// function test() {
//   var undefined = 1
//   console.log(undefined);
// }

// test() // 1


// var a = null;
// if (a === undefined) {
//   console.log(true);
// } else {
//   console.log(false);
// }

// console.log(undefined === null); // false
// console.log(undefined == null); // true

// var a;

// if (typeof a === 'undefined') {
//   console.log(true);
// } else {
//   console.log(false);
// }

// true

// console.log(typeof b);

// var a;

// if ('a' in window) {
//   console.log(true);
// } else {
//   console.log(false);
// }

// void(0) === undefined

var a, b, c

a = void(b = 1, c = 2)
console.log(a, b, c);

function test() {
  var undefined = 1

  console.log(undefined); // 1
  console.log(void(0)); // undefined
  console.log(undefined === void(0)); // false
}

test()