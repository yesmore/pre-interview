// 将数组扁平化，并将扁平化后后的数组去重，最终得到一个升序且不重复的一维数组
var arr = [1, [2, [3, [4, [5], 10]], 6, 7, 6, 2, 1], 10];

function flatten1(arr) {
  var _arr = arr || [],
    fArr = [],
    len = _arr.length,
    item

  for (var i = 0; i < len; i++) {
    item = _arr[i]
    if (_isArr(item)) {
      fArr = fArr.concat(flatten1(item))
    } else {
      fArr.push(item)
    }
  }

  function _isArr(item) {
    return {}.toString.call(item) === '[object Array]'
  }

  return uniqueArr(fArr)
}

Array.prototype.flatten2 = function () {
  var _arr = this,
    toStr = {}.toString;

  if (toStr.call(_arr) !== '[object Array]') {
    throw new Error('请传入一个数组')
  }

  var fArr = [];

  _arr.forEach(function (item) {
    toStr.call(item) === '[object Array]' ?
      fArr = fArr.concat(item.flatten2()) :
      fArr.push(item)
  })

  return uniqueArr(fArr)
}

Array.prototype.flatten3 = function () {
  var _arr = this,
    toStr = {}.toString;

  if (toStr.call(_arr) !== '[object Array]') {
    throw new Error('请传入一个数组')
  }

  var fArr = [];

  return _arr.reduce(function (prev, item) {
    return prev.concat(toStr.call(item) === '[object Array]' ?
      item.flatten3() :
      item
    )
  }, [])
}

const flatten4 = arr => arr.reduce((prev, item) => prev.concat(item instanceof Array ? flatten4(item) : item), [])
const flatten5 = arr => arr.reduce((prev, item) => prev.concat({}.toString.call(item) === '[object Array]' ? flatten5(item) : item), [])

function uniqueArr(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item) === index
  })
}

function compare(a, b) {
  return a - b
}

// console.log(flatten1(arr).sort(compare));
// console.log(arr.flatten2().sort(compare));
// console.log(uniqueArr(arr.flatten3()).sort(compare));
// console.log(uniqueArr(flatten4(arr)).sort(compare));
console.log(uniqueArr(flatten5(arr)).sort(compare));

// ...
console.log(uniqueArr(arr.flat(Infinity)).sort(compare));
console.log(Array.from(new Set(arr.flat(Infinity))).sort(compare));