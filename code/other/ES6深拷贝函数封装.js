// null undefined
// var a = undefined;
// console.log(a == null); // true
// console.log(a === null); // false

// Date RegExp

// const obj = {}
// const newObj = new obj.constructor()
// console.log(obj)
// newObj.a = 1
// console.log(newObj);

// const arr = []
// const newArr = new arr.constructor()
// console.log(arr);
// newArr.push(1)
// console.log(newArr);

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

function deepClone(origin, hashMap = new WeakMap()) {
  if (origin === undefined || typeof origin !== 'object') { // 排除null、undefined、非object值
    return origin;
  }
  if (origin instanceof Date) {
    return new Date(origin);
  }
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }

  const hashKey = hashMap.get(origin); // 寻找键是否存在
  if (hashKey) {
    return hashKey
  }

  // [] -> [], {} -> {}, 不需要判断是对象还是数组
  const target = new origin.constructor()
  hashMap.set(origin, target)
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
      target[k] = deepClone(origin[k], hashMap)
    }
  }

  return target;
}

const newObj = deepClone(obj)
newObj.info.hobby[2].a = 1234
// console.log(newObj);
// console.log(obj)

let test1 = {}
let test2 = {}
test2.test1 = test1
test1.test2 = test2
// console.log(deepClone(test2));