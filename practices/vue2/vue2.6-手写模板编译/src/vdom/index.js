import {
  createElement,
  createTextVnode
} from './vnode'

/**
 *
 *
 * @param {*} Yue
 */
function renderMixin(Yue) {
  Yue.prototype._c = function () {
    return createElement(...arguments)
  }

  Yue.prototype._s = function (value) {
    if (value === null) return
    return typeof value === 'object' ? JSON.stringify(value) : value
  }

  Yue.prototype._v = function (text) {
    return createTextVnode(text)
  }

  Yue.prototype._render = function () {
    const vm = this,
      render = vm.$options.render,
      vnode = render.call(vm);

    // console.log(vnode);
    return vnode
  }
}

export {
  renderMixin
}