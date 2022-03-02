var obj = {}

Object.defineProperty(obj, 'myZero', {
  value: -0,
  writable: false,
  configurable: false,
  enumerable: false,
})

Object.defineProperty(obj, 'myZero', {
  value: -0,
})

Object.defineProperty(obj, 'myNaN', {
  value: NaN,
  writable: false,
  configurable: false,
  enumerable: false,
})

Object.defineProperty(obj, 'myNaN', {
  value: NaN,
})

var a = 1
var b = '1'

var cpis = Object.is(a, b)
console.log(cpis);

var a = +0
var b = -0

var cpis = Object.is(a, b)
console.log(cpis);

var a = NaN
var b = NaN

var cpis = Object.is(a, b)
console.log(cpis);

Object.myIs = function (a, b) {
  if (a === b) {
    // 两者都为0，返回 true
    // 若分别为-0、+0，则Infinity !== -Infinity，返回 false
    // 1 / +0 = Infinity
    // 1 / -0 = -Infinity
    return (a !== 0) || (1 / a === 1 / b)
  }

  // 排除 NaN 情况
  return a !== a && b !== b
}

// test
console.log(Object.myIs(1, 1)); // true
console.log(Object.myIs({}, {})) // false
var obj = {}
console.log(Object.myIs(obj, obj)) // true
console.log(Object.myIs(+0, -0)) // false
console.log(Object.myIs(NaN, NaN)) // true