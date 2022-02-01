import defineReactiveData from './reactive'

// 观察者
function Observer(data) {
  if (Array.isArray(data)) {

  } else {
    this.walk(data)
  }
}

Observer.prototype.walk = function walk(data) {
  var keys = Object.keys(data) // 取出所有key -> [...]

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i],
      value = data[key]

    // 构造响应式数据
    defineReactiveData(data, key, value)
  }
}

export default Observer