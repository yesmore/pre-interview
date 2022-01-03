## 重写filter

原生filter：

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
    age: 22
  },
  {
    name: 'ok',
    age: 22
  },
];

var obj = {
  name: 'hhhh',
  age: 3
}

var newArr = arr.filter(function (item, index, array) {
  console.log(this);
  return item.age > 22
}, obj)
console.log(newArr);
```

重写：

```js
Array.prototype.myFilter = function (cb) {
  var _arr = this // 保存原this指向
  var _len = _arr.length
  var _arg2 = arguments[1] || window // 如果有第二个参数就保存一下，没有就默认指向window
  var _newArr = []
  var _item

  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]) // 深拷贝
    cb.apply(_arg2, [_item, i, _arr]) ? _newArr.push(_item) : ''
  }

  return _newArr
}

var newArr1 = arr.filter(function (item, index, array) {
  console.log(this);
  return item.age > 22
}, obj)
console.log(newArr1);
```

