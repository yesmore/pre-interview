## 理解Proxy

### 定义

- ES6的构造函数

```js 
function Proxy () {}

var proxy = new Proxy() // 返回一个代理对象
```

### 使用方法

```js
var obj = new Proxy(target, handler);
```

- target: 需要处理的目标对象
- handler: 容器，可以处理对象属性的方法

> obj本身有属性 { a: 1 }，通过处理obj实现需求，**不管定义、增加属性**

区别 defineProperty：

- defineProperty：劫持数据、给对象进行扩展、属性进行设置

```js
defineProperty(obj, '属性名', {})
```

> defineProperty是给一个**空对象定义、增加属性**。



### handler作用

自定义对象属性的获取、赋值、枚举、函数调用等功能



### 给对象设置代理

#### Get代理

```js
var target = {
  a: 1,
  b: 2,
}

let proxy = new Proxy(target, {
  get(target, key) {
    return `This is property value ${target[key]}`
  }
})

console.log(proxy.a); // This is property value 1
console.log(target.a); // 1
```

#### Set处理

```js
let proxy = new Proxy(target, {
  get(target, key) {
    return `This is property value ${target[key]}`
  },
  set(target, key, value) {
    target[key] = value
  }
})

proxy.b = 3
console.log(target); //a: 1, b: 3}
```



### 给数组设置代理

```js
let arr = [
  { name: 'hhh', age: 18 },
  { name: '小何', age: 28 },
  { name: '小红', age: 13 },
  { name: '小白', age: 17 },
  { name: '校长', age: 19 },
]

let persons = new Proxy(arr, {
  get(target, key) {
    return target[key]
  },
  set(target, key, value) {
    return target[key] = value
  }
})

console.log(persons[0]);
persons[1] = { name: '小张', age: 18 }
console.log(persons, arr);
```



### 给函数设置代理

```js
let fn = function () {
  console.log('this is a fn.');
}

fn.a = 123;

let newFn = new Proxy(fn, {
  get(target, key) {
    return target[key] + ' [Proxy]'
  }
})

console.log(newFn.a);
```



