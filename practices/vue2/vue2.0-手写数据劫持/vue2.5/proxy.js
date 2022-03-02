/**
 * 数据劫持
 *
 * @param {*} vm 实例
 * @param {*} target 目标对象
 * @param {*} key 值
 * @return {*} 
 */
function proxyData(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      // vm.title 拦截 -> 处理后 vm._data.title
      return vm[target][key]
    },
    set(newValue) {
      // 效果：vm.title = xxx  vm._data.title = xxx
      vm[target][key] = newValue
    }
  })
}

export default proxyData