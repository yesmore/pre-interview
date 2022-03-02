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

// arr.forEach(function (item, index, array) {
//   console.log(this.name); // 指向obj
//   // console.log(item, index, array);
// }, obj)


Array.prototype.myForEach = function (cb) {
  // console.log(this); // 谁调用myForEach，this就指向它
  var _arr = this // 保存原this指向
  var _len = _arr.length
  var _arg2 = arguments[1] || window // 如果有第二个参数就保存一下，没有就默认指向window

  for (var i = 0; i < _len; i++) {
    // 每遍历一次执行一次回调函数并改变this指向
    // 不需要深拷贝：forEach不返回新对象
    cb.apply(_arg2, [_arr[i], i, _arr])
  }
}

arr.myForEach(function (item, index, array) {
  console.log(this.name); // 指向obj
  console.log(item, index, array);
}, obj)