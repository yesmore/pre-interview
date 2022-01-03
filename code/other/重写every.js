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

// var res = arr.every(function (item, index, array) {
//   item.name = this.name
//   console.log(item, index, array);
//   return item.age < 24 // 只要有一项为false则返回false
// }, obj)
// console.log(res);

Array.prototype.myEvery = function (cb) {
  var _arr = this // 保存原this指向
  var _len = _arr.length
  var _arg2 = arguments[1] || window // 如果有第二个参数就保存一下，没有就默认指向window
  var _res = true

  for (var i = 0; i < _len; i++) {
    if (!cb.apply(_arg2, [_arr[i], i, _arr])) {
      _res = false
      break
    }
  }
  return _res
}

var res = arr.myEvery(function (item, index, array) {
  item.name = this.name
  console.log(item, index, array);
  return item.age < 22 // 只要有一项为false则返回false
}, obj)
console.log(res);