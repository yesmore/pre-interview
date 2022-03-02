import {
  ARRAY_METHORDS
} from './config'
import observeArr from './observeArr'

// 复制数组的所有方法
var originArrMethods = Array.prototype, // 引用，不满足需求
  arrayMethods = Object.create(originArrMethods) // 创建新的数组方法对象，满足需求

ARRAY_METHORDS.map(function (m) {
  // 重写数组7个方法
  // arr['push'](123) -> arr['push'] = function() {
  arrayMethods[m] = function () {
    // 接收参数并返回成一个数组
    var args = Array.prototype.slice.call(arguments)
    // 执行原数组方法实现原功能
    var rt = originArrMethods[m].apply(this, args)

    // 执行其他方法
    console.log('数组新方法', args);
    var newArr;

    switch (m) {
      case 'push':
      case 'unshift':
        newArr = args
        break
      case 'splice':
        newArr = args.slice(2)
        break
      default:
        break
    }

    newArr && observeArr(newArr)

    return rt
  }
})

export {
  arrayMethods
}