import Observer from './observer'

/**
 * 观察数据类型
 * 观察目标：对象
 * @param {*} data
 * @return {*} 
 */
function observe(data) {
  // 判断是否为对象，否则直接返回
  if (typeof data !== 'object' || data === null) return;

  // 观察者
  return new Observer(data)
}

export default observe