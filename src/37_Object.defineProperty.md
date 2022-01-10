# Object.defineProperty

### 浅析

> 直译：Object (对象).define (定义) Property (属性，对象的key)，即给Object定义属性
>
> 定义（[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)）：`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并**返回此对象**。
>
> **备注：**应当直接在 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 构造器对象上调用此方法，而不是在任意一个 `Object` 类型的实例上调用。（Object构造函数上挂载的静态方法）

```js
var obj = {}
var newObj = Object.defineProperty(obj, 'a', {
  value: 1
})

console.log(obj, newObj);
console.log(obj === newObj); // true
```

### 参数

```js
Object.defineProperty(obj, prop, descriptor)
// 对象、属性、descriptor === {}: value: 1
```

```js
var obj = {}
Object.defineProperty(obj, 'a', {
  value: 1
})

console.log(obj); // > {a: 1}
```

### 描述

> MDN: 该方法允许**精确**地**添加或修改**对象的属性。通过赋值操作添加的普通属性是可枚举的，在枚举对象属性时会被枚举到（[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 或 [`Object.keys`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)[ ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)方法），可以改变这些属性的值，也可以[`删除`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)这些属性。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 `Object.defineProperty()` 添加的属性值是不可修改（**immutable**）的。

```js
var obj = {}
Object.defineProperty(obj, 'a', {
  value: 1
})

obj.a = 2  // 1.不能被修改
delete obj.a // 2.不能被删除
console.log(obj); // > {a: 1}

for (let key in obj) {
  console.log(key, obj[key]); // 3.不可枚举
} // 无打印
```

小结：通过 `Object.defineProperty()` 定义的属性：

- 不可修改
- 不可删除
- 不可枚举



### descriptor 特点

> MDN: 对象里目前存在的属性描述符有两种主要形式：*数据描述符*和*存取描述符*。*数据描述符*是一个具有值的属性，该值可以是可写的，也可以是不可写的。*存取描述符*是由 `getter` 函数和 `setter` 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者。
>
> 这两种描述符都是对象。它们**共享**以下可选键值（默认值是指在使用 `Object.defineProperty()` 定义属性时的默认值）：
>
> - **configurable** 可配置的
>
>   当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
>   **默认为** **`false`**。
>
> - **enumerable** 可枚举的
>
>   当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。
>   **默认为 `false`**。
>
> **数据描述符**还具有以下可选键值：
>
> - value
>
>   该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
>   **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。
>   
> - writable
>
>   当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被[`赋值运算符` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#assignment_operators)改变。
>   **默认为 `false`。**
>
> **存取描述符**还具有以下可选键值：
>
> - get
>
>   属性的 getter 函数，如果没有 getter，则为 `undefined`。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
>   **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。
>
> - set
>
>   属性的 setter 函数，如果没有 setter，则为 `undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。
>   **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。
>
> 
>
> 拥有布尔值的键 `configurable`、`enumerable` 和 `writable` 的默认值都是 `false`。
>
> 属性值和函数的键 `value`、`get` 和 `set` 字段的默认值为 `undefined`。



descriptor 是一个对象 `{}`，对象里的描述符有两种形式（*数据描述符*和*存取描述符*）。



#### configurable

`configurable` 特性表示对象的属性是否可以被删除，以及除 `value` 和 `writable` 特性外的其他特性是否可以被修改。

```js
var obj = {}
Object.defineProperty(obj, 'a', {
  value: 1,
  configurable: true // 可配置
})

delete obj.a // 删除a属性
console.log(obj); // > {}
```

#### enumerable

`enumerable` 定义了对象的属性是否可以在 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环和 [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 中被枚举。

```js
var obj = {}
Object.defineProperty(obj, 'a', {
  value: 1,
  enumerable: true, // 可枚举
})

for (let key in obj) {
  console.log(key, obj[key]); // a 1
}

console.log(Object.keys(obj)) // > ['a']
```

面试题：在下面的代码中，没有定义`enumerable: true` ，想要obj可枚举，该如何实现？

```js
var obj = {}
Object.defineProperty(obj, 'a', {
  value: 1,
})

for (let key in obj) {
  console.log(key, obj[key]); // 无打印
}

console.log(Object.keys(obj)) // > []
```

答案：使用 `getOwnPropertyNames` 获取键名，

```js
console.log(Object.getOwnPropertyNames(obj)); // > ['a']
```

追问：在 Object 原型上增加一个 `b`属性，能通过 `getOwnPropertyNames` 拿到吗？

```js
var obj = {}

Object.prototype.b = 2
Object.defineProperty(obj, 'a', {
  value: 1,
})


for (let key in obj) {
  console.log(key, obj[key]); // b 2
}

console.log(Object.keys(obj)) // > []
console.log(Object.getOwnPropertyNames(obj)); // > ['a']
```

答案：拿不到，只能拿”自己“的属性；但是 `for...in` 可以拿到原型上继承的属性或方法。



#### writable

当 `writable` 属性设置为 `false` 时，该属性被称为“不可写的”。它不能被重新赋值。

```js
var obj = {}
Object.defineProperty(obj, 'a', {
  value: 1,
  writable: true,
})

obj.a = 2
console.log(obj); // > {a: 2}
```

#### getter 

```js
var obj = {}
Object.defineProperty(obj, 'a', {
  // value: 1,
  // 数据劫持 
  get() {
    console.log('get a:', 1); // get a: 1
    return 1
  }
})

console.log(obj.a); // 1
```



#### setter

```js
var obj = {}
Object.defineProperty(obj, 'a', {
  // value: 1,
  // 数据劫持 
  get() {
    console.log('get a:', 1);
    return 1
  },
  // 数据绑定 
  set(newVal) {
    console.log('set a:', newVal);
  }
})

// console.log(obj.a);
obj.a = 2 // set a: 2 -- 执行时触发 setter
```

#### 描述符可拥有的键值

|            | `configurable` | `enumerable` | `value` | `writable` | `get`  | `set`  |
| ---------- | -------------- | ------------ | ------- | ---------- | ------ | ------ |
| 数据描述符 | 可以           | 可以         | 可以    | 可以       | 不可以 | 不可以 |
| 存取描述符 | 可以           | 可以         | 不可以  | 不可以     | 可以   | 可以   |

注意：如果一个描述符不具有 `value`、`writable`、`get` 和 `set` 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 `value` 或 `writable` 和 `get` 或 `set` 键，则会产生一个异常。

> 记住，这些选项不一定是自身属性，也要考虑继承来的属性。为了确认保留这些默认值，在设置之前，可能要冻结 [`Object.prototype` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)，明确指定所有的选项，或者通过 [`Object.create(null)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 将 [`__proto__` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) 属性指向 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)。

```js
// 报错
var obj = {}
Object.defineProperty(obj, 'a', {
  writable: true,
  get() {
    console.log('get a:', 1);
    return 1
  },
})

// Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
```

```js
// 可行
var obj = {}
Object.defineProperty(obj, 'a', {
  value: 1,
  writable: true,
  // get() {
  //   console.log('get a:', 1);
  //   return 1
  // },
})
```





### defineProperty 存在的意义

通过MDN定义来理解：

- `Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并**返回此对象**。
- 该方法允许**精确**地**添加或修改**对象的属性。

归纳：`Object.defineProperty()` 更加具体的去描述或设置一个对象内部属性的操作性。

假如从后端获取下面这些数据：

```js
var obj = {
  a: 1, // 可枚举
  b: 2,
  c: 3, // 不可修改
}
```

现在业务要求是，对a、c属性加以限制，分别是 `属性a` 是可枚举的，`属性c` 是不可修改的。

#### defineProperty 应用

项目架构人：限制不同职业员工的可读写

> []()
