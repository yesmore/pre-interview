## Function考点讲解

> new Function()

用 `Function` 构造一个函数：

**写法一**：

```js
const test = new Function('a', 'b', 'c', 'console.log(a + b + c)') 
test(1, 2, 3) // 6
```

**写法二**：

```js
const test = new Function('a, b, c', 'console.log(a + b + c)')
test(1, 2, 3)
```



### 面试题1

```js
var a = 1,
  b = 2

function test() {
  var b = 3
  return new Function('c', 'console.log(a + b + c)')
}

var t = test()
t(4) // c=4
```

问题：此代码分别在 **浏览器** 和 **node** 环境执行打印结果是什么？

打印结果有两种情况：7 或 8；7表示执行的`b=2`,8表示`b=3`；

#### **浏览器中**：

- 结果为 `7`

因为用构造函数创建一个函数时，这个函数仅仅是被创建在全局的，它能访问的仅是**自身作用域**的变量或方法，比如将上面的代码改写一下：

```js
return new Function('c', 'var b=4; console.log(a + b + c)')
// 其他地方不变
```

结果变成了`9`；

那如果自身作用域**找不到**，就会去全局找对应变量，而不会在 test 函数内部寻找；也就是说，用 `new Function` 声明的函数不会产生[闭包]()的，其**只能拿自身作用域变量或全局作用域变量**。

#### **node环境中**：

- 报错：`ReferenceError: a is not defined`

因为node环境的顶级作用域并不是全局作用域，而是在 `global` 下。

在 MDN 中 的解释：

#### [Difference between Function constructor and function declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#difference_between_function_constructor_and_function_declaration)

Functions created with the `Function` constructor do not create closures to their creation contexts; they always are created in the global scope. When running them, they will only be able to access their own local variables and global ones, not the ones from the scope in which the `Function` constructor was created. This is different from using [`Global_Objects/eval`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) with code for a function expression.

```
var x = 10;

function createFunction1() {
    var x = 20;
    return new Function('return x;'); // this |x| refers global |x|
}

function createFunction2() {
    var x = 20;
    function f() {
        return x; // this |x| refers local |x| above
    }
    return f;
}

var f1 = createFunction1();
console.log(f1());          // 10
var f2 = createFunction2();
console.log(f2());          // 20
```

Copy to Clipboard

While this code works in web browsers, `f1()` will produce a `ReferenceError` in Node.js, as `x` will not be found. This is because the top-level scope in Node is not the global scope, and `x` will be local to the module.

中文：

#### [Function 构造器与函数声明之间的不同](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function#function_构造器与函数声明之间的不同)

由 Function 构造器创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 Function 构造器创建时所在的作用域的变量。这一点与使用 [eval](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 执行创建函数的代码不同。

```js
var x = 10;

function createFunction1() {
    var x = 20;
    return new Function('return x;'); // 这里的 x 指向最上面全局作用域内的 x
}

function createFunction2() {
    var x = 20;
    function f() {
        return x; // 这里的 x 指向上方本地作用域内的 x
    }
    return f;
}

var f1 = createFunction1();
console.log(f1());          // 10
var f2 = createFunction2();
console.log(f2());          // 20
Copy to Clipboard
```

虽然这段代码可以在浏览器中正常运行，但在 Node.js 中 f1() 会产生一个“找不到变量 x ”的 ReferenceError。这是因为在 Node 中顶级作用域不是全局作用域（global），而 x 其实是在当前模块的作用域（本地作用域：当前模块的内部）之中。

---

#### 关于 eval：

```js
var a = 1,
  b = 2

function test() {
  var b = 3
  // return new Function('c', 'console.log(a + b + c)')
  eval('!function _ (c) { console.log(a + b + c) } (4)')
}
test() // 8 -> b = 3 可以访问到内部作用域
```



### 面试题2 

用 Function 声明两个函数：

```js
var t1 = new Function('console.log("t1")')
var t2 = Function('console.log("t2")')
```

问题：`t1` 和 `t2` 有什么区别？

观察打印结果：

```js
t1() // t1
t2() // t2
```

答案：**两者是一样的**

> MDN中[描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function#%E6%8F%8F%E8%BF%B0)：以调用函数的方式调用 `Function` 的构造函数（而不是使用 `new` 关键字) 跟以构造函数来调用是一样的。

深入一下：

```js
console.log(t1.__proto__ === Function.prototype);// true
console.log(Function.prototype === Function.__proto__);
```

> 详见：[30_原型](https://github.com/yesmore/pre-interview/blob/main/src/30_%E5%8E%9F%E5%9E%8B.md)



#### toString

```js
console.log(t1.toString());
// 打印结果：
function anonymous(
) {
console.log("t1")
}
```

假如定义一个字符串：

```js
var code = `function anonymous(
  ) {
  console.log("t1")
  }`
```

如何执行它？使用 `eval`：

```js
eval(`!${code}()`) // t1
```

> `!` 将其转换成表达式



