import Observer from './observer'

// 观察数据类型
function observe(data) {
  if (typeof data !== 'object' || data === null) return;

  return new Observer(data)
}

export default observe