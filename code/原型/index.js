/**
 * 对应名称
 *   - prototype: 原型
 *   - __proto__: 原型链（链接点） 
 * 从属关系
 *   prototype -> 函数的一个属性、函数的一个原型属性、函数的一个prototype属性：本质就是一个对象{} 
 *   __proto__ -> 对象Object的一个属性：本质也是一个对象
 *   对象的__proto__保存着该对象的构造函数的prototype
 */

function Test() {
  this.a = 1
  this.b = 233
}

// console.log(Test.prototype);

Test.prototype.b = 2
Test.prototype.c = 10086

const test = new Test();
// console.log(test.__proto__);
// console.log(test.__proto__ === Test.prototype);
// Test.prototype -> { __proto__ }
// console.log(Test.prototype.__proto__ === Object.prototype);
// console.log(Object.prototype.__proto__); // null

Object.prototype.c = 3

// console.log(test)

// test {
//   a: 1,
//   __proto__: Test.prototype = {
//     b: 2,
//     __proto__: Object.prototype = {
//       c: 3
//     }
//   }
// }

// console.log(test.a);
// console.log(test.b);
// console.log(test.c);

console.log(Test.__proto__ === Function.prototype);

// const Test = new Function()

console.log(Function);
console.log(Function.__proto__);
console.log(Function.prototype === Function.__proto__);

const obj = {}
// const obj = new Object()
console.log(typeof Object);
console.log(Object.__proto__ === Function.prototype);
console.log(Object.__proto__ === Function.__proto__);

console.log(test.hasOwnProperty('a'));
console.log(test.hasOwnProperty('b'));
console.log(test.hasOwnProperty('c'));

console.log('a' in test);
console.log('b' in test);
console.log('c' in test);

console.log(test.constructor);
console.log(test.constructor === Test);

function Test1() {
  this.a = 111
}
test.constructor = Test1;
console.log(test);