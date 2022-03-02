## 从Array.from理解类数组

> Array.from：允许在 JavaScript 集合(如: 数组、类数组对象、或者是字符串、map 、set 等可迭代对象) 上进行有用的转换。

执行下面的程序：

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};

var newArr = Array.from(obj);
console.log(newArr); // > (3) [1, 2, 3]
```

### length：2

把 obj.length 属性修改为 **2**：

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 2
};

var newArr = Array.from(obj);
console.log(newArr); // > (2) [1, 2]
```

结论：**length** 决定了 **Array.from** 最终返回的新数组长度，需要剪裁掉。

### length：4

如果 length 为 **4** 呢？

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 4
};

var newArr = Array.from(obj);
console.log(newArr); // > (2) [1, 2, 3, undefind]
```

所以，补全上面的结论：

**length** 决定了 **Array.from** 最终返回的新数组长度，需要剪裁掉或补齐（undefined）。

### length：0

如果去掉 length 属性呢？

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  // length: 4
};

var newArr = Array.from(obj);
console.log(newArr); // > []
```

可以看出，在obj转为Array时，等价于 `length: 0`；

**为什么不报错呢**？

类数组的理解：是由 **obj** 伪装成**类似于数组的一种位类型**，所以不是JS的固有数据类型，并没有语法要求类数组必须含有某属性或方法，在类数组中定义 length 属性只是一种规范



### 加深理解：push

将程序修改为如下：

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  push: [].push
};

obj.push(4);
console.log(obj);
```

`push: [].push` 继承了数组的 push 方法；

打印结果：

![](https://cdn.jsdelivr.net/gh/yesmore/img/img/20211227105812.png)

记住上面的结论：**length** 决定了 **Array.from** 最终返回的新数组长度

**第一步**，obj 中的 length 属性等价于 **0**：

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 0,
  push: [].push
};
```

**第二步**：执行 push 后， length++

```js
obj.push(4)
// length: 1
```

打印结果中的 `0: 4` 是如何出现的？

`0: 1 -> 0: 4` 替换后的结果。



## Array.from

定义一个 obj

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};
```

假如想要生成以下数组：

```js
[
    {
        student: No.1,
        order: 0
    },
    {
        student: No.2,
        order: 1
    },
    {
        student: No.3,
        order: 2
    },
]
```

#### 实现

常规思路：

```js
// 先转数组
const newArr = Array.from(obj)
const data = newArr.map((item, index) => {
  return {
    student: 'No.' + item,
    order: index,
  }
})

console.log(data)
```

emmm怎么做没啥大问题，但是又有点问题，问题就是暴露了你根本**不熟悉** `Array.from` 方法，因为它还有第二个参数：

> Array.from(obj, function() {})

知道这个以后，直接一步到位：

```js
const newArr = Array.from(obj, function (item, index) {
  return {
    student: 'No.' + item,
    order: index,
  }
})
console.log(newArr)
```

进一步学习，第三个参数，在配置中设置前缀

```js
const newArr = Array.from(obj, function (item, index) {
  return {
    student: this.prefix + item,
    order: index,
  }
}, {
  prefix: 'No.', // 前缀
})
```



同理，数组遍历方法中，如 `forEach`, `filter`, `map`, reduce, reduceRight, `every`, `some`，都有回调函数和第三个参数。（reduce, reduceRight略微不同）

最后再来一个问题：

```js
Array.from.length // ???
```

这段代码的意思是获取 `Array.from` 方法的**形参的长度**，那么聪明的你是不是已经想脱口而出了：**3**！

错！

在上面的案例中（`const newArr = Array.from(obj, function (item, index) {}, {}`），执行的时候传入的是实参列表，不是形参；

正确答案是 **1**，Why？

意思是 Array.from 必传一个参数，且第一个参数必须是 **类数组**或**可迭代对象**，例如，执行下面这段代码验证：

```js
Array.from()  // 不传参数

// 控制台发生报错：
Uncaught TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
    at Function.from (<anonymous>)
```

> 在原型中有 Symbol(Symbol.iterator)) 对象的都是可迭代的对象。
>
> 如 Map.prototype、String.prototype ...；
>
> 而 Object.prototype 则没有。

```js
var obj = {
  a: 0,
  b: 1,
  C: 2
}

var newArr1 = Array.from(obj)
console.log(newArr1); // > []
```

```js
var obj = {
  a: 0,
  b: 1,
  C: 2,
  length: 3  
}

var newArr1 = Array.from(obj)
console.log(newArr1); // > [undefined,undefined,undefined]

// 找不到“0”、“1”、“2”
```

