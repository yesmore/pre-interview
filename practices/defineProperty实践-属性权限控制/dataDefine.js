/**
 * 限制规则 desc
 */

export const personalInfoDefine = {
  name: {
    writable: false,
    configurable: true,
    enumerable: true,
  },
  age: {
    writable: false,
    configurable: true,
    enumerable: true,
  },
  job: {
    writable: true,
    configurable: true,
    enumerable: true,
  },
  privateKey: {
    writable: false,
    configurable: true,
    enumerable: false,
  },
}