## __lookupGetter__

**非标准**
该特性是非标准的，请尽量不要在生产环境中使用它！

**已废弃**
该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。

### 概述

`__lookupGetter__` 方法会返回当前对象上指定属性的**属性读取访问器函数（getter）**。

```js
var obj = {
  get a() {
    return Math.random() >= 0.5 ? 1 : 0
  }
}

const round = obj.__lookupGetter__('a')
console.log(round);
/*
  ƒ a() {
    return Math.random() >= 0.5 ? 1 : 0
  }
*/
```

`__lookupGetter__` 方法是非标准的，我们应该使用标准中定义的方法来完成同样的事情，那就是 `Object.getOwnPropertyDescriptor()` 方法：

```js
var obj = {
  get a() {
    return Math.random() >= 0.5 ? 1 : 0
  }
}

// const round = obj.__lookupGetter__('a')

const round = Object.getOwnPropertyDescriptor(obj, 'a').get
console.log(round);
/*
  ƒ a() {
    return Math.random() >= 0.5 ? 1 : 0
  }
*/
```



