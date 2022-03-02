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

// 随机数
function randomNum() {
  return new Date().getTime() + parseInt(Math.random() * 10000)
}

// 参数类型校验
const reg_check_str = /^['|"].+?['|"]$/; // 匹配是否以单/双引号开头/结尾
const reg_str = /['|"]/g // 匹配单引号或双引号

function checkType(str) {
  if (reg_check_str.test(str)) {
    return str.replace(reg_str, '') // 去除单双引号
  }

  switch (str) {
  case 'true':
    return true;
  case 'false':
    return false;
  default:
    break
  }

  return Number(str)
}

export {
  isObject,
  hasOwnProperty,
  isEqual,
  randomNum,
  checkType
}