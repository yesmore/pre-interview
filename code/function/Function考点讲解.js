// const test = new Function('a', 'b', 'c', 'console.log(a + b + c)')
// const test = new Function('a, b, c', 'console.log(a + b + c)')
// test(1, 2, 3)

// var a = 1,
//   b = 2

// function test() {
//   var b = 3
//   // return new Function('c', 'console.log(a + b + c)')
//   eval('!function _ (c) { console.log(a + b + c) } (4)')
// }
// test()

// var t = test()
// t(4) // c=4

/**
var t1 = new Function('console.log("t1")')
var t2 = Function('console.log("t2")')

t1()
t2()
console.log(t1.__proto__ === Function.prototype);
console.log(Function.prototype === Function.__proto__);
// console.log(t1.toString());

var code = `function anonymous(
  ) {
  console.log("t1")
  }`
eval(`!${code}()`)
 */