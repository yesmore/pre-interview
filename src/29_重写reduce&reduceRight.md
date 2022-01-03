## 重写reduce&reduceRight

#### 原生：

```js
var arr = [{
    name: 'ssf',
    age: 22
  },
  {
    name: 'song',
    age: 23
  },
  {
    name: 'yesmore',
    age: 21
  },
  {
    name: 'ok',
    age: 20
  },
];

var obj = {
  name: 'hhhh',
  age: 3
}


var initValue = [{
  name: '小美',
  age: 12
}]


Array.prototype.myReduce = function (cb, ) {

}

var newArr = arr.reduce(function (prev, item, index, array) {
  // console.log(prev === initValue); 
  // true，本质prev初始值来着initValue，每次执行回调可以向 prev push内容
  item.age >= 22 && prev.push(item); // 归纳
  // console.log(prev);
  // console.log(this); // window, 没有第三个参数obj
  return prev
}, initValue)
console.log(newArr);
```

#### 重写reduce：

```js
Array.prototype.myReduce = function (cb, initialValue) {
  var _arr = this // 保存原this指向
  var _len = _arr.length
  var _arg3 = arguments[2] || window // （扩展）如果有第三个参数就保存一下，没有就默认指向window
  var _item

  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i])
    initialValue = cb.apply(_arg3, [initialValue, _item, i, _arr])
  }
  return initialValue
}

var newArr = arr.myReduce(function (prev, item, index, array) {
  item.age >= 22 && prev.push(item); // 归纳
  console.log(this.name);
  return prev
}, initValue, obj)
console.log(newArr);
```



#### 重写reduceRight：

> 从右到左遍历

```js
Array.prototype.myReduceRight = function (cb, initialValue) {
  var _arr = this // 保存原this指向
  var _len = _arr.length
  var _arg3 = arguments[2] || window // 如果有第三个参数就保存一下，没有就默认指向window
  var _item

  for (var i = _len - 1; i >= 0; i--) {
    _item = deepClone(_arr[i])
    initialValue = cb.apply(_arg3, [initialValue, _item, i, _arr])
  }
  return initialValue
}

var newArr = arr.myReduceRight(function (prev, item, index, array) {
  item.age >= 22 && prev.push(item); // 归纳
  return prev
}, initValue)
console.log(newArr);
```

