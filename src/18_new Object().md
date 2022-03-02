## new Object()

本篇内容：

- new Object()有什么作用
- 对象的值引用
- 原始值



### 正文

先看段代码：

```js
var obj = {}
obj.a = 1;

var newObj = new Object(obj);
console.log(newObj === obj); // ?
```

代码 `var newObj = new Object(obj);` 等价于 `var newObj = obj`。

所以聪明的你已经知道答案了吧：

> true

本质上就是对象的**值引用**。

在JavaScript中，function、Array、Object 都属于**引用值**类型，它们最终都要继承 `Object.prototype` ，即它们的 “祖宗” 都是 **Object** ，比如下面这段代码：

```js
var arr = []
arr.a = 1;
console.log(arr); // > [a: 1]
```

同样的道理，下面的代码打印结果也为 `true`，都是**引用值**

```js
var arr1 = [1, 2, 3, 4]
var newArr1 = new Object(arr1)
console.log(arr1 === newArr); // true
```

接着分析下面这段代码：

```js
var arr2 = [1, 2, 3, 4]
var newArr2 = new Array(arr2)
console.log(arr2 === newArr2);
```

结果是肯定不一样的，**为什么**？

`new Array(args)` 是将 `args` 作为数组元素放入新数组中，比如

```js
var arr3 = [1, 2, 3, 4]
var newArr3 = new Array(arr3, 1, 2, 3)
console.log(newArr3);
```

打印结果：

```js
> [[1, 2, 3, 4], 1, 2, 3]
```

所以 `console.log(arr2 === newArr2)` 打印结果肯定为 **`false`**



### 题外话

```js
var a = 1;
a.b = 2;
console.log(a.b); // > undefined
```

为啥是undefined？

想不通再康康这个：

```js
var str = '123'
str.length = 1
str.a = 'hhhh'
console.log(str.length, str.a); // > 3 undefined
```

这段代码想为字符串添加一个属性和修改原有length属性，结果操作无效。

**原因**：

Number、String类型属于**原始值**，其他原始值还有Boolean、Null、Underfined；

原始值是固定不可变的，而字符串的 `length` 属性是继承自 String 类型的。

> **在许多语言中，字符串都被看作引用类型，而非原始类型，因为字符串的长度是可变的。ECMAScript 打破了这一传统。**

如果使用 new Number() 呢？

```js
var b = 1; // 原始值
var newNum = new Number(b)  // 引用值
console.log(newNum === b); // false 
newNum.a = 123
console.log(newNum); // > Number {1, a: 123}
```

`new Number()` 与 `new Object()` 一样，都是创建一个**引用值**。

