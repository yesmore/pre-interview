## Object.defineProperty面试题

> 回顾：[37_Object.defineProperty]()

### 题目1

怎样才能打印出 'You win!' ？

```js
if (a === 1 && a === 2 && a === 3) {
  console.log('You win!');
}
```

分析：每一次 `a` 出现的时候，都是在 ‘`get`’  变量`a` ，即访问 `a` ，通过访问 `a` 得到 `a` 的值，再跟 `1、2、3` 比较，也就是说，当我们每次访问`a` 时，可以用 `Object.defineProperty` 对其进行**劫持**，劫持以后，执行另外的程序，即在访问 `a` 时，对其进行 `++` 操作，并且是 “先`++`”。

- 考点：**getter**

具体实现代码如下：

```js
var _default = 0
Object.defineProperty(window, 'a', {
  get() {
    return ++_default
  }
})

if (a === 1 && a === 2 && a === 3) {
  console.log(a); // 4
  console.log('You win!');
}
```

同理，改变一下题目，要想打印出 'You win!' ，其实现原理同上

```js
if (a > 0 && a > 1 && a > 2) {
  console.log('You win!');
}
```

### 题目2 

定义一个变量：

```js
a = 'Object'
```

当执行打印该变量时，希望打印出如下效果：

```js
console.log(a);
// 效果：
{
  type: 'Object',
  length: 6
}
```

若变量a 等于其他值时，打印 `TypeError: This type is invalid.`

- 考点：**setter**

答案：

```js
var _default = null
Object.defineProperty(window, 'a', {
  get() {
    return _default
  },
  set(newVal) {
    switch (newVal) {
      case 'Object':
      case 'Array':
        _default = {
          type: newVal,
          length: newVal.length,
        }
        break
      default:
        throw new TypeError('This type is invalid.')
    }
  }
})

a = 'Object'
console.log(a); // > {type: 'Object', length: 6}

a = 'Array'
console.log(a); // > {type: 'Object', length: 6}

a = '123'
console.log(a); // > Uncaught TypeError: This type is invalid.
```



### 题目3

执行下面的代码

```js
console.log(_ + _ + _);
```

要求输出结果为：`abc`，即将 `_` 按顺序替换为字母 a、b、c...z。其他示例：

```js
console.log(_ + _ + _ + _ + _); // abcde
```

```js
console.log(_ + _ + _); // abc
console.log(_ + _ + _ + _ + _); // defgh
```



答案：

```js
Object.defineProperty(window, '_', {
  get() {
    this._c = this._c || 'a'.charCodeAt(0);
    var _ch = String.fromCharCode(this._c);

    if (this._c >= 'a'.charCodeAt(0) + 26) return;

    this._c++
    return _ch
  }
})

console.log(_ + _ + _); // abc
console.log(_ + _ + _ + _ + _); // defgh
```



### 题目4

定义一个对象obj：

```js
var _obj = {
  a: 1,
  b: 2,
  c: 3,
};
```

通过执行 for..in 循环使 打印结果为以下要求：

```js
for (var k in obj) {
  obj[k] += 1
}

console.log(obj);
// 要求：
{
  a: 3,
  b: 3, 
  c: 5
}
```

分析：通过 getter 劫持进行 ++ 操作：

```js
var obj = {}

for (var k in _obj) {
  Object.defineProperty(obj, k, {
    enumerable: true,
    writable: true,
    value: ++_obj[k]
  })
}

for (var k in obj) {
  obj[k] += 1
}

console.log(obj);
```

此时打印结果为：

```js
{
  a: 3,
  b: 4,
  c: 5
}
```

要让 `b` 等于 3，意味着在外面对obj操作时（`obj[k] += 1`），属性b是不可写的，实现方法如下：

```js
writable: k === 'b' ? false : true,
```

只需修改描述符 `writable` 即可

完整代码：

```js
var obj = {}

for (var k in _obj) {
  Object.defineProperty(obj, k, {
    enumerable: true,
    writable: k === 'b' ? false : true,
    value: ++_obj[k]
  })
}

for (var k in obj) {
  obj[k] += 1
}

console.log(obj);
```

假如不需要属性a：

```js
{
  b: 3,
  c: 5
}
```

那么再加上描述符 `configurable: true` 即可实现：

```js
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
```

