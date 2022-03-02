// 观察者模式
import {
  userInfoTemplate
} from './template'

export function observer(userInfo, viewDom) {

  var _storageInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  var _returnInfo = {}

  var init = function () {
    initData(_storageInfo, _returnInfo, userInfo)
    initDom(_returnInfo, viewDom)
  }

  function initData(storageInfo, returnInfo, userInfo) {
    for (var k in storageInfo) {
      if (!userInfo[k]) { // 如果本地缓存没有则赋值
        userInfo[k = storageInfo[k]]
      }
    }

    for (var k in userInfo) {
      (function (k) {
        Object.defineProperty(returnInfo, k, {
          get() {
            return userInfo[k];
          },
          set(newVal) {
            userInfo[k] = newVal;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            document.querySelector(`.__${k}`).innerHTML = userInfo[k];
          }
        })
      })(k)
    }
  }

  function initDom(returnInfo, dom) {
    dom.innerHTML = userInfoTemplate(returnInfo)
  }

  init();

  return _returnInfo
}