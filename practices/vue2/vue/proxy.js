// 数据劫持
function proxyData(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      // vm.title -> vm._data.title
      return vm[target][key]
    },
    set(newValue) {
      // vm.title = xxx  vm._data.title = xxx
      vm[target][key] = newValue
    }
  })
}

export default proxyData