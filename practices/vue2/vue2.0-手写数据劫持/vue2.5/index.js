import {
  initState
} from './init'

// Vue构造函数
function Vue(options) {
  this._init(options)
}

// 在Vue原型上挂载初始化方法
Vue.prototype._init = function (options) {
  // 挂载Vue的实例到vm上
  var vm = this;
  // 挂载options到实例上，方便用户在实例上调用
  vm.$options = options;

  // 初始化状态（data option）
  initState(vm)

  // 初始化其他状态...
}

export default Vue;