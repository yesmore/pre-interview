## 参数与局部作用域、全局作用域的关系

```js
// 考点：参数与局部作用域、全局作用域的关系

// 题1
var x = 1

function test(x, y = function () {
  x = 3;
  console.log('a, ', x); // 3 打印独立存储的x变量
}) {
  console.log('b, ', x) // undefined 预编译第三步：形实参相统一，实参为undefined
  var x = 2 // 局部变量赋值
  y() // 参数作用域y执行 => 更改参数作用域x -> x=3
  console.log('c, ', x); // 2 test局部作用域
}

test() // 此处实参为 undefined
console.log('d, ', x); // 1 全局作用域
```

```js
// 题2
var m = 1

function test1(m, y = function () {
  m = 3;
  console.log('a, ', m); // 3 同题1
}) {
  console.log('b, ', m) // undefined 同题1

  y() // 同题1
  console.log('c, ', m); // 3？ 参数作用域 -> 3 
  // 没有声明m，则往上找到参数作用域
}

test1() // 同题1 此处实参为 undefined
console.log('d, ', m); // 1 同题1
```

```js
// 题3
var n = 1

function test2(a, y = function () {
  n = 3;
  console.log('a, ', n); // 3 
}) {
  console.log('b, ', n) // undefined 预编译第2步：保存局部变量到AO -> undefined
  var n = 2
  y() // 全局作用域x -> 3
  console.log('c, ', n); // 局部作用域x => 2
}

test2() // 同题1 此处实参为 undefined
console.log('d, ', n); // 3 通过参数y函数执行将全局的x => 3 
```

```js
// 题4
var t = 1

function yy() {
  t = 3;
  console.log('a, ', t); //
}

function test3(t, y = yy) {
  console.log('b, ', t) // undefined 预编译第3步：形实参相统一，实参为undefined
  var t = 2
  y() // 相当于定义在全局的yy函数引用执行 -> 全局的x -> 3
  console.log('c, ', t); // 局部作用域x
}

test3() // 
console.log('d, ', t); // 3 相当于定义在全局的yy函数引用执行 -> 全局的x -> 3
```



总结：

从test内部出发到全局：

 *     test函数局部作用域 -> 
 *       局部有没有这个变量/方法 -> 没有 -> 找参数作用域
 *     test函数参数作用域 -> 
 *       参数有没有这个变量 -> 没有 -> 找全局
 *     全局作用域
