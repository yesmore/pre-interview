import observe from './observe'

/**
 * 处理响应式数据
 *
 * @param {*} data
 * @param {*} key
 * @param {*} value
 * @return {*} 
 */
function defineReactiveData(data, key, value) {
  observe(value) // 递归观察，排除value也可能是对象

  Object.defineProperty(data, key, {
    // 响应式数据获取
    get() {
      console.log('响应式数据获取', value);
      return value;
    },
    set(newValue) {
      // console.log('响应式数据设置', newValue);
      if (newValue === value) return;
      observe(newValue) // 新值也需要观察
      value = newValue
    }
  })
}

export default defineReactiveData