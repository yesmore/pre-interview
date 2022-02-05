import {
  initState
} from './state'

function initMixin(Yue) {
  Yue.prototype._init = function (options) {
    // 挂载Vue的实例到vm上
    const vm = this;
    // 挂载options到实例上，方便用户在实例上调用
    vm.$options = options;

    // 初始化状态（data option）
    initState(vm)

    // 初始化其他状态...
  }
}

export {
  initMixin
}