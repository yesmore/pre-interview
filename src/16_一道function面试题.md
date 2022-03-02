## 原题

> 源码：[01_一道function面试题.js](https://github.com/yesmore)

```js
function Foo() {
  getName = function () {
    console.log(1);
  }
  console.log(this);
  return this
}

Foo.getName = function () {
  console.log(2);
}

Foo.prototype.getName = function () {
  console.log(3);
}

var getName = function () {
  console.log(4);
}

function getName() {
  console.log(5);
}

Foo.getName() // 2
getName() // 5 -> 4 this=>window
Foo().getName(); // 5 -> 1
getName(); // 1

new Foo.getName(); // 2
new Foo().getName() // 3
new new Foo().getName() // 3
```

## 分析

### Foo.getName() - 2

本质：**执行Foo函数上的静态方法**

```js
// 函数Foo的静态方法 -> 函数对象上的方法/属性
Foo.getName = function () {
  console.log(2);
}
```

### getName() - 4

执行：

```js
// 给全局变量赋值为一个匿名函数
// GO {}
/**
 * 全局预编译
 * GO {
 *   getName: undefined -> 
 *   function getName () {} ->
 *   function () { console.log(4); } 
 * }
 */
var getName = function () {
  console.log(4);
}

// 函数声明
function getName() {
  console.log(5);
}
```

> [JS预编译及全局对象GO和活动对象AO](https://blog.csdn.net/qq_42667613/article/details/118212614)



### Foo().getName() - 1

```js
// 构造函数
function Foo() {
  // 全局变量赋值
  // 若Foo没有执行，下面的赋值不会进行
  getName = function () {
    console.log(1);
  }
  // 直接执行Foo，this -> window
  // new Foo， this -> Foo object
  console.log(this);
  return this // window
}

```

执行过程：

*Foo() -> this -> window -> window.getName() 重新赋值成 1*

### getName() * 2 - 1

被重新赋值了: window.getName() = 1 => getName() = 1



### new Foo.getName() - 2

注意区别 `new Foo()`

```js
// 函数Foo的静态方法 -> 函数对象上的方法/属性
Foo.getName = function () {
  console.log(2);
}
```

这里的 `new` 没有实质作用，将函数改为如下：

```js
// 函数Foo的静态方法 -> 函数对象上的方法/属性
Foo.getName = function () {
  console.log(2);
  console.log(this);
}
```

> this打印结果：
>
> Foo.getName {} 对象
>
> 指向实例化的新对象

此时回顾到第一种情况 [Foo.getName() - 2](#Foo.getName() - 2) ，该静态方法也被调用了，那么此时的 this 就会指向谁调用它的对象上，即 `Foo` 调用了getName 方法，this 指向 Foo 函数对象上，打印结果如下：

```js
ƒ Foo() {
  // 全局变量赋值
  // 若Foo没有执行，下面的赋值不会进行
  getName = function () {
    console.log(1);
  }
  // 直接执行Foo，this -> window
  // new Foo， this -> Foo object
  console.log(this);
  return this …
}
```



### new new Foo().getName() - 3

拆分一下：

```js
var foo = new Foo() // 实例化对象 foo，继承了原型属性上的方法
foo.getName() -> Foo.prototype.getName()
```

即执行下面的函数：

```js
// 扩展函数原型上的方法
// 调用：var foo = new Foo(); -> foo.getName
// 或 new Foo.getName
Foo.prototype.getName = function () {
  console.log(3);
}
```

第一个 `new` 没有实际意义；

如果只写成 `new new Foo()` ，报错：

> Uncaught TypeError: (intermediate value) is not a constructor



## 总结

- **Foo.getName()** 调用 `Foo` 函数上的**静态方法**
- **Foo().getName()** 调用 `Foo` **返回值**下（window）的  getName 方法



- **new Foo.getName()** 实例化了 `Foo` 函数上的**静态方法**

- **new Foo().getName()**  实例化了 `Foo` 构造函数再调用 getName 方法



> 蚌埠住了

