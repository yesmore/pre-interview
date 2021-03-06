var arr = [1, 1, 2, 5, 3, 0, 3, 6, 8, 9, 4, 4, 2, 0, 9, 7, 4, 6]

// for循环
function uniqueArr1(arr) {
  var _arr = [],
    isRepeat

  for (var i = 0; i < arr.length; i++) {
    isRepeat = false
    for (var j = 0; j < _arr.length; j++) {
      if (_arr[j] == arr[i]) {
        isRepeat = true
        break
      }
    }
    // _arr.push(arr[i])
    if (!isRepeat) {
      _arr.push(arr[i])
    }
  }

  return _arr
}

// sort
function uniqueArr2(arr) {
  var _arr = []

  arr.sort()

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      _arr.push(arr[i])
    }
  }

  return _arr
}

// filter
function uniqueArr3(arr) {
  return arr.filter(function (item, index) {
    // indexOf方法返回的是第一个匹配的索引值，如果没有匹配的值，则返回-1，有则返回第一个匹配的索引值
    // 若返回的索引值等于当前遍历的索引值，则说明当前的值不是重复的；
    // 若不相等，则说明当前indexOf匹配到的元素不是第一次出现，肯定出现了2次及以上
    return arr.indexOf(item) === index
  })
}

// forEach
function uniqueArr4(arr) {
  var _arr = []
  arr.forEach(function (item) {
    // 在新数组中寻找当前遍历的元素，木有则push
    if (_arr.indexOf(item) === -1) {
      _arr.push(item)
    }
  })

  return _arr
}

// includes (ES6)
function uniqueArr5(arr) {
  var _arr = []

  arr.forEach(function (item) {
    if (!_arr.includes(item)) {
      _arr.push(item)
    }
  })

  return _arr
  // indexOf与includes的区别：
  //  - indexOf返回具体索引位置; 对NaN无效
  //  - includes返回布尔值
}

// reduce + sort
function uniqueArr6(arr) {
  return arr.sort().reduce(function (prev, curr) {
    // if (prev.length === 0 || prev[prev.length - 1] !== curr) {
    //   prev.push(curr)
    // }

    if (prev.indexOf(curr) === -1) {
      prev.push(curr)
    }
    return prev
  }, [])
}

// Map
function uniqueArr7(arr) {
  var _arr = [],
    _temp = new Map()
  // Object也可实现

  for (var i = 0; i < arr.length; i++) {
    if (!_temp.has(arr[i])) {
      _temp.set(arr[i], 1)
      _arr.push(arr[i])
    }
  }

  return _arr
}

// Set
function uniqueArr8(arr) {
  return Array.from(new Set(arr))
}

console.log(uniqueArr8(arr));