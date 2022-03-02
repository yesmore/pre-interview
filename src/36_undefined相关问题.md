## undefined相关问题

你需要知道的：

- undefined 既是一个**原始数据类型**，也是一个**原始值数据**
- undefined 是全局对象上的一个属性（window.undefined）

```js
console.log(window.undefined) // undefined
```

#### 问题1：能否给undefined赋值？

```js
window.undefined = 1
console.log(window.undefined) // undefined
```

结果：**不可写**（writable: false）

#### 问题2：可以删除undefined吗？

```js
delete window.undefined
console.log(window.undefined) // undefined
```

结果：**不可配置**（configurable: false）

#### 问题3：undefined 可以枚举吗？

```js
for(var k in window) {
  if(k === undefined) {
    console.log(k)  
  }  
}
// 无打印
```

结果： **不可枚举**（enumerable: false）



#### 问题4：能否更改window上的undefined的这三个属性（writable、configurable、enumerable）？

尝试第一种方法：

```js
Object.defineProperty(window, 'undefined', {
  enumerable: true,
  writable: true,
  configurable: true
})
```

结果：

```js
// Uncaught TypeError: Cannot redefine property: undefined
```

> 不能重新定义`undefined属性` 

---



分析一下，如果执行下面的代码：

```js
var a;
console.log(a); // undefined
```

程序不会报错，打印 *undefined* ，因为系统给一个未赋值的变量自动赋值为 `undefined` ，类型也是 `undefined `：

```js
console.log(typeof a); // undefined
```

同理，函数中的形参也遵循这个规则：

```js
function test(a) {
  console.log(typeof a); // undefined
  return a  // undefined
}
console.log(test()); // undefined
```

#### 问题5：如果函数没有返回值呢？

```js
function test1() {
  console.log(123);
}
console.log(test1()); // undefined
```

结论：**函数内部没有显式返回一个值的时候，系统默认给函数返回undefined**。

 

#### 问题6：全局作用下undefined可以作为变量名或标识符赋值吗？

```js
var undefined = 1
console.log(undefined); // undefined
```

结论：在全局是没有办法把 undefined 作为变量使用的。

这段代码等价于：

```js
window.undefined = 1
```

由前面推论可知是不可写的。

#### 问题7：局部作用域下undefined可以作为变量名或标识符赋值吗？

```js
function test() {
  var undefined = 1
  console.log(undefined);
}

test() // 1
```

为什么？**因为undefined 不是JS的保留字和关键字**，在局部作用域中仅仅是一个**变量**，并不会去 window 上寻找 undefined。且开启严格模式下同样成立。

> 在开发应尽量避免使用关键字或保留字命名变量。

#### 问题8：如何判断一个值是否被赋值？

##### 方法一：使用非严格相等判断

> 本质：undefined与null的区别

```js
var a;

if (a == undefined) {
  console.log(true);
} else {
  console.log(false);
}

// true
```

假如变量a赋值为 `null`：

```js
var a = null;
if (a === undefined) {
  console.log(true);
} else {
  console.log(false);
}

// false
```

小结：

- 如果使用全等，就无法判断出 **变量为null** 状态的情况，不够严谨。

```js
console.log(undefined === null); // false
console.log(undefined == null); // true
```

##### 方法二：使用 `typeof`

```js
var a;

if (typeof a === 'undefined') {
  console.log(true);
} else {
  console.log(false);
}

// true
```

那直接用 `typeof` 去判断一个**未定义未赋值**的变量呢？

```js
console.log(typeof b); // undefined
```

结论：`typeof` 会将未定义的变量一概的认为是 `undefined`。

#### 问题9：如何判断一个变量是否被声明了？

> in 方法

```js
var a;

if ('a' in window) {
  console.log(true);
} else {
  console.log(false);
}

// true
```

```js
// var a;

if ('a' in window) {
  console.log(true);
} else {
  console.log(false);
}

// false
```

#### 问题10：void

> void相当于一个关键字，类似于 typeof 

如 `void(0)` ，表示对0进行求值，返回`undefined`，

```js
void(0) === undefined
void(0) === window.undefined
```

在局部作用域中，情况如何？

```js
function test() {
  var undefined = 1

  console.log(undefined); // 1
  console.log(void(0)); // undefined
  console.log(undefined === void(0)); // false
}

test()
```

> 此时undefined被当做变量了，在一些场景下，为了防止开发人员把undefined当成变量使用，可以采用 `void(0)` 来当成 undefined 的解决方案，要么就使用 `window.undefined`

```js
console.log(window.undefined === void(0)); // true
```



那 void 到底有什么用？

##### 场景1：

假设现在需要定义一个 变量a，其值为 undefined，那么可以这样做：

```js
var a, b, c

a = void(b = 1, c = 2)
console.log(a, b, c); // undefined 1 2
```

##### 场景2：

我们想让 `<a>` 标签**不跳转**，可以采用下面这种做法：

```html
<a href='javascript:void(0)'></a>
```

> 这种方法又叫伪协议，用Js逻辑阻止了a标签跳转

其他方法还有：

```html
<a href='javascript:;'></a>
```

