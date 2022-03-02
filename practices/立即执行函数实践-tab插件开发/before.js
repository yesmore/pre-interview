/**
 * 立即执行函数(IIFE：Immediately Invoked Function Expression)
 *                     立即地      调用     函数     表达式
 * 
 *  */

// 1.区别函数声明式 与 函数表达式
// 函数声明式 !== 函数表达式
function test1() {
  console.log('Function declaration');
}

// 函数表达式：把一个(匿名)函数(函数声明式)赋值给一个变量的形式
var test2 = function () {
  console.log('Function Expression');
}

// '()'：对于函数名后面的括号，叫做执行符号
test1();
test2()
// 问题1：那么是否意味着在定义一个函数声明式后面，加上一对括号就能执行函数？
// function test2() {
//   console.log('Function declaration');
// }()
// 报错：Uncaught SyntaxError: Unexpected token ')' 
// 这是一个语法错误，它告诉我们执行符号只能跟在函数表达式后面，这就与‘IIFE’中的‘E’对应上了
// 小结：当一个函数需要立即执行的情况，该函数必须形成表达式形式

// 问题2：表达式是什么？
// 1 
// (1) 
// +1 
// !1 
// ~1 
// var a = 1 
// var b = function () {
//   console.log('b:Function Expression');
// }() // 执行

// 于是：
; + function () {
  console.log('+:Function Expression');
}(); // 执行


! function () {
  console.log('!:Function Expression');
}(); // 执行


(function () {
  console.log('():Function Expression');
}()); // W3C推荐的立即执行函数的编写规范

// 实践中：更清晰
(function () {
  console.log('(...):Function Expression');
})();

// 注意分号问题

// 传参
(function test3(a, b, c) {
  console.log(test3);
  console.log(test3.length); // 3 形参长度
  console.log(arguments.length); // 3 实参长度
  console.log(a + b + c); // 6
})(1, 2, 3);
// 在外部调用：
// test3() // 报错：Uncaught ReferenceError: test3 is not defined
// 说明IIFE有一个独立的作用域
/**
 * 小结：IIFE特点
 *   1. 可以创建一个与外界没有任何关联的作用域 - 独立作用域
 *   2. 执行完以后，自动销毁
 *   3. ES3、ES5立场上是没有模块概念（封闭作用域、抛出接口），IIFE可以模拟模块化
 *      它可以向外部抛出一系列属性和方法，或在window上保存属性和方法。
 *  */