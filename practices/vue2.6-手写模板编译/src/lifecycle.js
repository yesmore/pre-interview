import {
  patch
} from './vdom/patch'


/**
 * 挂载组件
 * AST树 -> render -> Dom
 * @param {*} vm
 */
function mountComponent(vm) {
  // 
  vm._update(vm._render())
}

/**
 * 生命周期函数
 *
 * @param {*} Yue
 */
function lifecycleMixin(Yue) {
  Yue.prototype._update = function (vnode) {
    const vm = this
    patch(vm.$el, vnode)
  }
}

export {
  lifecycleMixin,
  mountComponent
}