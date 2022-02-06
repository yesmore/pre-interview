import {
  initState
} from './state'
import {
  compileToRenderFunction
} from './compiler'

function initMixin(Yue) {
  Yue.prototype._init = function (options) {
    // 挂载Vue的实例到vm上
    const vm = this;
    // 挂载options到实例上，方便用户在实例上调用
    vm.$options = options;

    // 初始化状态（data option）
    initState(vm)
    // 初始化其他状态...

    // 
    if (vm.$options.el) {
      // 执行挂载函数(yue.prototype.$mount)
      vm.$mount(vm.$options.el)
    }
  }

  Yue.prototype.$mount = function (el) {
    const vm = this,
      options = vm.$options

    el = document.querySelector(el)
    vm.$el = el

    if (!options.render) {
      // 如果没有render函数，则调用template渲染函数
      let template = options.template
      if (!template && el) {
        template = el.outerHTML
      }

      // 核心：template -> AST 树 -> render 函数
      const render = compileToRenderFunction(template)
      options.render = render
    }
  }
}

export {
  initMixin
}