import proxyData from './observer/proxy'
import observe from './observer/observe'

/**
 * 初始化状态
 * @param {*} vm
 */
function initState(vm) {
  // 获取options
  var options = vm.$options

  // 处理data
  if (options.data) {
    initData(vm)
  }
}

/**
 * 初始化数据option
 * 挂载data
 * @param {*} vm
 */
function initData(vm) {
  // 保留原data
  let data = vm.$options.data

  // 挂载临时 _data，方便后面调用 vm._data.title 即可访问到对应数据
  // 判断是否为：函数/对象/其他类型
  //  - 函数则直接执行获取返回的data对象 data () { return { ... } }
  //  - 对象则直接挂载 data: { ... }
  vm._data = data = typeof data === 'function' ?
    data.call(vm) :
    data || {}

  // 数据劫持：实现效果：vm.title -> vm._data.title
  for (let key in data) {
    proxyData(vm, '_data', key)
  }

  // 观察 _data及_data内部数据
  observe(vm._data)
}

function initProps(vm) {}

function initMethods(vm) {}

export {
  initState
}