## 重写some

原生：

```js
var arr = [{
    name: 'ssf',
    age: 25
  },
  {
    name: 'song',
    age: 23
  },
  {
    name: 'yesmore',
    age: 22
  },
  {
    name: 'ok',
    age: 21
  },
];

var obj = {
  name: 'hhhh',
  age: 3
}

var res = arr.some(function (item, index, arr) {
  // console.log(item, index, arr);
  console.log(this.name);
  return item.age < 20 // 一个条件满足则返回true
}, obj)
console.log(res);
```

重写：

```js
Array.prototype.mySome = function (cb) {
  var _arr = this // 保存原this指向
  var _len = _arr.length
  var _arg2 = arguments[1] || window // 如果有第二个参数就保存一下，没有就默认指向window
  var _res = false

  for (var i = 0; i < _len; i++) {
    if (cb.apply(_arg2, [_arr[i], i, _arr])) {
      _res = true
      break
    }
  }
  return _res
}

var res = arr.mySome(function (item, index, arr) {
  // console.log(item, index, arr);
  console.log(this.name);
  return item.age < 22 // 一个条件满足则返回true
}, obj)
console.log(res);
```

