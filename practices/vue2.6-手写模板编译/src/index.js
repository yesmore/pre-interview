import {
  initMixin
} from './init'

function Yue(options) {
  this._init(options)
}

// Vue2.6 插件化开发模式
initMixin(Yue)

export default Yue