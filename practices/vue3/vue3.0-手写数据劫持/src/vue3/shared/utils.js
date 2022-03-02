/**
 * 判断是否为对象或空
 *
 * @param {*} value
 * @return {*} 
 */
function isObject(value) {
  return typeof value === 'object' && value !== null;
}

/**
 * 对象是否包含某个属性
 *
 * @param {*} target
 * @param {*} key
 * @return {*} 
 */
function hasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

/**
 * 判断两个值是否相等
 *
 * @param {*} newValue
 * @param {*} oldValue
 * @return {*} 
 */
function isEqual(newValue, oldValue) {
  return newValue === oldValue;
}

export {
  isObject,
  hasOwnProperty,
  isEqual
}