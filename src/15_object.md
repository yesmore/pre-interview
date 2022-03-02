# Object

热个身：

```js
({} + {}).length // ?
([] + []).length // ?
(function () {}).length // ?

[1, 2, 3].map(parseInt)  // ?
```

> 做不出来吧，我也是，那么认认真真往下看吧~

### Object.assign()

`Object.assign()` 方法用于对象的合并，将源对象(source)的所有可枚举属性，复制到目标对象上。

#### 例1 基本示例

下面定义三个对象：

```js
const test1 = {
    a:1,
    b:2
}

const test2 = {
    b:3,
    c:4
}

const test3 = {
    c:5,
    d:6
}
```

使用 `Object.assign()` 

```js
const test4 = Object.assign(test1, test2, test3)

console.log(test1)
console.log(test2)
console.log(test3)
console.log(test4)
```

打印结果：

![](https://cdn.jsdelivr.net/gh/yesmore/img/img/M}84_ZFKRFY[J_`1%CG@20X.png)

#### 分析

`Object.assign(target, ...source)`

- target：目标对象
- ...source：源对象（多个）

模拟一下此方法内部发生了什么：

```js
Object.assign = function (target, ...source) {
    ...
    return target
}
```

可以看出，`Object.assign` 将目标对象与源对象合并后，返回了目标对象

所以 [例1 基本示例](#例1 基本示例) 中的 `test1、test4 `为同一引用，即**浅拷贝**，打印值相同。

验证，执行下面的代码：

```
test4.d = 100
console.log(test1, test4)
```

结果：

![](https://cdn.jsdelivr.net/gh/yesmore/img/img/7{[L~DRD3N99F)XUQHEF[KG.png)

其 中`...source` 必须为一个或多个可枚举的对象，才能将其中的属性分配到`target` 。

如何将`...source` 分配到 `target` 中？

存储描述符

- source - getter
- target - setter



