import { isObject } from "../shared/utils";
import { useReactive } from ".";
import { hasOwnProperty, isEqual } from '../shared/utils';
import { statePool } from '../compiler/state'
import { update } from '..'

const get = createGetter(), // creator
  set = createSetter(); // creator

/**
 * Getter
 * 
 * @param {*} target 
 * @param {*} key
 * @param {*} receiver
 * @return {*} 
 */
function createGetter() {
  return function get(target, key, receiver) {
    // Reflect: get/set 会返回一个值
    const res = Reflect.get(target, key, receiver);
    // todo ......
    console.log('响应式获取：' + target[key]);

    // 结果为真，则递归设置新值为响应式
    if (isObject(res)) {
      return useReactive(res);
    }

    return res;
  }
}

/**
 * Setter
 * 
 * @param {*} target
 * @param {*} key
 * @param {*} value
 * @param {*} receiver
 * @return {*} 
 */
function createSetter() {
  return function set(target, key, value, receiver) {
    const isKeyExist = hasOwnProperty(target, key), // 存在判断
      oldValue = target[key], // 保存旧值
      res = Reflect.set(target, key, value, receiver); // 更新
    // todo ......

    if (!isKeyExist) {
      console.log('响应式新增：' + value);
    } else if (!isEqual(value, oldValue)) {
      // console.log('响应式修改：' + key + '=' + value);

      update(statePool, key, value)
    }

    return res;
  }
}

const mutableHandler = {
  get,
  set
}

export {
  mutableHandler
}