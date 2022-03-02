## 重写map方法



原生map效果：

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

// 返回新数组
var newArr = arr.map(function (item, index, array) {
  item.age += 100 // 处理
  return item
})
console.log(newArr);
```

也可以传第二个参数，同[forEach](https://github.com/yesmore/pre-interview/blob/main/src/24_%E9%87%8D%E5%86%99forEach.md)

```js
var obj = {
  name: 'hhhh',
  age: 3
}

var newArr = arr.map(function (item, index, array) {
  item.age += 100
  console.log(this.name); // hhhh
  return item
}, obj)
console.log(newArr);
```



重写 myMap：

```js
Array.prototype.myMap = function (cb) {
  var _arr = this // 保存原this指向
  var _len = _arr.length
  var _arg2 = arguments[1] || window // 如果有第二个参数就保存一下，没有就默认指向window
  var _newArr = []
  var _item
  var _res

  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]) // 深拷贝
    _res = cb.apply(_arg2, [_item, i, _arr])
    _res && _newArr.push(_res) // res有值才push
  }

  return _newArr
}

var newArr1 = arr.myMap(function (item, index, array) {
  item.age += 100
  item.name = this.name
  return item
}, obj)
console.log(newArr1);
console.log(arr);
```

结果：

![](https://cdn.jsdelivr.net/gh/yesmore/img/img/map.png)

