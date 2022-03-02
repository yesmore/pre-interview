var obj = {
  name: 'yesmore',
  age: 18,
  info: {
    hobby: ['travel', 'piano', {
      a: 1
    }],
    career: {
      teacher: 4,
      engineer: 9
    }
  }
};

function deepClone(origin, target) {
  var tar = target || {}
  var toStr = Object.prototype.toString
  var arrType = '[object Array]'

  for (var k in origin) {
    if (origin.hasOwnProperty(k)) { // 判断是否为org自己的属性
      if (typeof origin[k] === 'object' && origin[k] !== null) {
        tar[k] = toStr.call(origin[k]) === arrType ? [] : {} // 判断是数组还是对象
        deepClone(origin[k], tar[k])
      } else {
        // 非object类型则直接赋值
        tar[k] = origin[k]
      }
    }
  }
  return tar
}

const newObj = deepClone(obj, {})
newObj.info.hobby[2].a = 123
console.log(obj, newObj);

// var type = Object.prototype.toString.call([]) // [object Array]
// var type = Object.prototype.toString.call({}) // [object Object]
// console.log(type);


console.log(typeof obj['info']);