import defineReactiveData from './reactive'
import {
  arrayMethods
} from './array'
import observeArr from './observeArr'

/**
 * 关于对象与数组的区别
 *  - 对象可以用 defineProperty 拦截处理
 *  - 数组需要自己手写相应方法, 因为数组的七个方法(./config.js)会更改原数组, 需要重新劫持+观察
 *    - 比如push时，数组发生改变，需要进行更新视图，对象视图进行其他操作
 */

// 观察者
function Observer(data) {
  // 判断是否为数组
  if (Array.isArray(data)) {
    data.__proto__ = arrayMethods
    observeArr(data)
  } else {
    // 观察对象
    this.walk(data)
  }
}

/**
 * 观察对象数据
 *  - 使用 defineProperty 重新定义对象数据
 * @param {*} data
 */
Observer.prototype.walk = function walk(data) {
  var keys = Object.keys(data) // 取出所有key -> ['title', 'classNum', ...]

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i],
      value = data[key]

    // 构造响应式数据
    defineReactiveData(data, key, value)
  }
}

export default Observer