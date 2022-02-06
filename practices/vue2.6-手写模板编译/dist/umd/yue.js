(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Yue = factory());
})(this, (function () { 'use strict';

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
      get: function get() {
        // vm.title 拦截 -> 处理后 vm._data.title
        return vm[target][key];
      },
      set: function set(newValue) {
        // 效果：vm.title = xxx  vm._data.title = xxx
        vm[target][key] = newValue;
      }
    });
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  /**
   * 处理响应式数据
   *
   * @param {*} data
   * @param {*} key
   * @param {*} value
   * @return {*} 
   */

  function defineReactiveData(data, key, value) {
    observe(value); // 递归观察，排除value也可能是对象

    Object.defineProperty(data, key, {
      // 响应式数据获取
      get: function get() {
        console.log('响应式数据获取', value);
        return value;
      },
      set: function set(newValue) {
        // console.log('响应式数据设置', newValue);
        if (newValue === value) return;
        observe(newValue); // 新值也需要观察

        value = newValue;
      }
    });
  }

  // 更改原数组的方法
  var ARRAY_METHORDS = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

  function observeArr(arr) {
    for (var i = 0; i < arr.length; i++) {
      observe(arr[i]);
    }
  }

  var originArrMethods = Array.prototype,
      // 引用，不满足需求
  arrayMethods = Object.create(originArrMethods); // 创建新的数组方法对象，满足需求

  ARRAY_METHORDS.map(function (m) {
    // 重写数组7个方法
    // arr['push'](123) -> arr['push'] = function() {
    arrayMethods[m] = function () {
      // 接收参数并返回成一个数组
      var args = Array.prototype.slice.call(arguments); // 执行原数组方法实现原功能

      var rt = originArrMethods[m].apply(this, args); // 执行其他方法

      console.log('数组新方法', args);
      var newArr;

      switch (m) {
        case 'push':
        case 'unshift':
          newArr = args;
          break;

        case 'splice':
          newArr = args.slice(2);
          break;
      }

      newArr && observeArr(newArr);
      return rt;
    };
  });

  /**
   * 关于对象与数组的区别
   *  - 对象可以用 defineProperty 拦截处理
   *  - 数组需要自己手写相应方法, 因为数组的七个方法(./config.js)会更改原数组, 需要重新劫持+观察
   *    - 比如push时，数组发生改变，需要进行更新视图，对象视图进行其他操作
   */
  // 观察者

  function Observer(data) {
    // 判断是否为数组
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods;
      observeArr(data);
    } else {
      // 观察对象
      this.walk(data);
    }
  }
  /**
   * 观察对象数据
   *  - 使用 defineProperty 重新定义对象数据
   * @param {*} data
   */


  Observer.prototype.walk = function walk(data) {
    var keys = Object.keys(data); // 取出所有key -> ['title', 'classNum', ...]

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i],
          value = data[key]; // 构造响应式数据

      defineReactiveData(data, key, value);
    }
  };

  /**
   * 观察数据类型
   * 观察目标：对象
   * @param {*} data
   * @return {*} 
   */

  function observe(data) {
    // 判断是否为对象，否则直接返回
    if (_typeof(data) !== 'object' || data === null) return; // 观察者

    return new Observer(data);
  }

  /**
   * 初始化状态
   * @param {*} vm
   */

  function initState(vm) {
    // 获取options
    var options = vm.$options; // 处理data

    if (options.data) {
      initData(vm);
    }
  }
  /**
   * 初始化数据option
   * 挂载data
   * @param {*} vm
   */


  function initData(vm) {
    // 保留原data
    var data = vm.$options.data; // 挂载临时 _data，方便后面调用 vm._data.title 即可访问到对应数据
    // 判断是否为：函数/对象/其他类型
    //  - 函数则直接执行获取返回的data对象 data () { return { ... } }
    //  - 对象则直接挂载 data: { ... }

    vm._data = data = typeof data === 'function' ? data.call(vm) : data || {}; // 数据劫持：实现效果：vm.title -> vm._data.title

    for (var key in data) {
      proxyData(vm, '_data', key);
    } // 观察 _data及_data内部数据


    observe(vm._data);
  }

  function initMixin(Yue) {
    Yue.prototype._init = function (options) {
      // 挂载Vue的实例到vm上
      var vm = this; // 挂载options到实例上，方便用户在实例上调用

      vm.$options = options; // 初始化状态（data option）

      initState(vm); // 初始化其他状态...
    };
  }

  function Yue(options) {
    this._init(options);
  } // Vue2.6 插件化开发模式


  initMixin(Yue);

  return Yue;

}));
