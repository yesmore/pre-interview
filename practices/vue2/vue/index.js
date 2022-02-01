import {
  initState
} from './init'

function Vue(options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  var vm = this;
  vm.$options = options; // 挂载options

  initState(vm) // 初始化实例
}

export default Vue;