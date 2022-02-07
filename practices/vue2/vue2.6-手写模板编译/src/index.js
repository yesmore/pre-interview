import {
  initMixin
} from './init'
import {
  lifecycleMixin
} from './lifecycle'
import {
  renderMixin
} from './vdom'

function Yue(options) {
  this._init(options)
}

// Vue2.6 插件化开发模式
initMixin(Yue)
lifecycleMixin(Yue)
renderMixin(Yue)

export default Yue