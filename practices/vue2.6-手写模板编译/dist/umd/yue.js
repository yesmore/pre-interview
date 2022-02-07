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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  // 匹配: id='app' id="app" id=app 三种
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配标签名: my-header

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 匹配特殊标签: <my:header></my:header>

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // 匹配开始标签: <div

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配闭合标签符: > 或 /> 

  var startTagClose = /^\s*(\/?)>/; // 匹配结束标签: </div>

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
  /**
   * HTML转AST树
   * 核心：匹配字符串，分割成数组，遍历数组，构建AST树
   * @param {*} html
   */

  function parseHTMLToAst(html) {
    var text;
    var root,
        currentParent,
        stack = [];

    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        var startTagMatch = parseStartTag(); // 如果匹配到开始标签

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        } // 匹配结束标签


        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          // console.log(endTagMatch);
          advance(endTagMatch[0].length); // 删除结束标签

          end(endTagMatch[1]); // 删除结束标签

          continue;
        }
      }

      if (textEnd > 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    function parseStartTag() {
      // 匹配开始标签: <div
      var start = html.match(startTagOpen); // console.log(start); // ["<div", "div", ...]

      var end, attr; // 标识：是否为endTag、是否匹配到attr

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 截取"<div"部分

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          // console.log(attr); // [' id="app"', 'id', '=', 'app',...]
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5] || '' // 如果有值，则赋值，否则为空 | why? 

          });
          advance(attr[0].length); // 截取 id='app' 部分
        } // 匹配结束标签符: > 


        if (end) {
          // console.log(end); // ['>', '', index: 0, ...]
          advance(end[0].length); // 截取 ">" 部分
          // console.log(match);

          return match;
        }
      } // return match

      /**
       * match:
       * {
       *   tag: '',
       *   attrs: [],
       * }
       */

    } // 截取字符串


    function advance(n) {
      // why？拿到html结构的字符串，从上到下，从左到右 依次通过正则字符串匹配生成AST元素，
      // 需要将已经被匹配过的html字符串删除，用substring方法可以截取指定字符串的前n个字符实现此效果,直到为空‘’
      html = html.substring(n);
    } // 核心

    /**
     *  第一次：stack: [div], currentParent: div
     *  第二次：stack: [div, span], currentParent: div
     **/


    function start(tagName, attrs) {
      // console.log('-----开始-----');
      var element = createASTElement(tagName, attrs); // 如果不是根节点

      if (!root) {
        root = element;
      }

      currentParent = element; // 保存父节点

      stack.push(element); // 将当前节点放入栈中
    } // 找出父节点与子节点的关系


    function end(tagName) {
      // console.log('-----结束-----');
      // span
      var element = stack.pop(); // 取出栈顶元素
      // div

      currentParent = stack[stack.length - 1]; // 

      if (currentParent) {
        element.parent = currentParent; // span -> parent -> div

        currentParent.children.push(element); // div -> children push -> span
      }
    } // 文本处理


    function chars(text) {
      text = text.trim();

      if (text.length > 0) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }
    }
    /**
     * 创建AST树元素
     *
     * @param {*} tagName
     * @param {*} attrs
     * @return {*} 
     */


    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        type: 1,
        attrs: attrs,
        children: [],
        parent: parent
      };
    }

    return root;
  }
  /**
   * HTML:
   * 
   *  <div id='app' style="color: red;font-size: 20px">
   *    hello {{name}}
   *    <span class="text" style="color:greenyellow">{{ age }}</span>
   *  </div>
   */

  /*
  AST:

  {
    tag: 'div',
    type: 1,
    attr: [{
        name: 'id',
        value: 'app'
      },
      {
        name: 'style',
        value: {
          color: 'red',
          font - size: '20px'
        }
      }
    ],
    children: [{
      type: 3,
      text: 'hello'
    }, {
      type: 1,
      tag: 'h1',
      attrs: null,
      children: [{
        type: 3,
        text: '{{name}}'
      }]
    }]
  }
  */

  /**
   * _c() -> createElement() 创建虚拟节点元素
   * _v() -> createTextNode() 创建虚拟文本节点
   * _s() -> {{name}} -> _s(name) -> 字符串拼接
   */
  // 匹配模板语法（双大括号）
  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  function formatProps(attrs) {
    var attrStr = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === 'style') {
        (function () {
          var styleAttrs = {};
          attr.value.split(';').map(function (styleAttr) {
            var _styleAttr$split = styleAttr.split(':'),
                _styleAttr$split2 = _slicedToArray(_styleAttr$split, 2),
                key = _styleAttr$split2[0],
                value = _styleAttr$split2[1];

            styleAttrs[key] = value;
          });
          attr.value = styleAttrs;
        })();
      }

      attrStr += "".concat(attr.name) + ":" + "".concat(JSON.stringify(attr.value), ",");
    } // console.log(`{${attrStr.slice(0, -1)}}`);


    return "{".concat(attrStr.slice(0, -1), "}");
  }

  function generateChild(node) {
    if (node.type === 1) {
      return generate(node);
    } else if (node.type === 3) {
      var text = node.text; // 单独字符串处理(无双大括号)

      if (!defaultTagRE.test(text)) {
        return "_v(".concat(JSON.stringify(text), ")");
      } // 有双大括号字符串处理


      var match,
          index,
          lastIndex = defaultTagRE.lastIndex = 0,
          textArr = [];

      while (match = defaultTagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          textArr.push(JSON.stringify(text.slice(lastIndex, index)));
        } // '_s(name)'


        textArr.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      } // 


      if (lastIndex < text.length) {
        textArr.push(JSON.stringify(text.slice(lastIndex)));
      } // console.log(textArr); // ['"hello "', '_s(name)', '" 同学"'] ['_s(age)']


      return "_v(".concat(textArr.join('+'), ")");
    }
  }

  function getChildren(el) {
    var children = el.children;

    if (children) {
      return children.map(function (c) {
        return generateChild(c);
      }).join(',');
    }
  }
  /**
   * AST -> render 函数
   *
   * @param {*} el
   */


  function generate(el) {
    var children = getChildren(el); // 此处不能换行

    var code = "_c('".concat(el.tag, "', ").concat(el.attrs.length > 0 ? "".concat(formatProps(el.attrs)) : 'undefined').concat(children.length > 0 ? ",".concat(children) : '', ")"); // console.log(code);

    return code;
  }
  /**
   * render?
   * function vrender() {
   *   return `
   *     _c(
   *       'div',
   *       {
   *         id: 'app', 
   *         style: {
   *           color: "red", 
   *           font-size: "20px"
   *         }
   *       },
   *       _v("hello, " + _s(name)),
   *       _c(
   *         'span',
   *         {
   *           "class": "text",
   *            style: {
   *              color: "red", 
   *              font-size: "20px"
   *            }
   *          },
   *          _v(_s(age))
   *       )
   *     )
   *   `
   * }
   * 
   */

  /**
   * 摸板编译
   * 核心：template -> AST 树 -> render 函数
   * @param {*} html Dom element（#app）
   * @return {*} 
   */

  function compileToRenderFunction(html) {
    var ast = parseHTMLToAst(html),
        code = generate(ast),
        render = new Function("\n      with(this) {\n        return ".concat(code, "\n      }\n    ")); // console.log(ast, code);
    // console.log(render);

    return render;
  }

  // 打补丁
  function patch(oldNode, vNode) {
    var el = createElement$1(vNode),
        parentElement = oldNode.parentElement;
    parentElement.insertBefore(el, oldNode.nextSibling);
    parentElement.removeChild(oldNode);
  }

  function createElement$1(vnode) {
    var tag = vnode.tag;
        vnode.props;
        var children = vnode.children,
        text = vnode.text;

    if (typeof tag === 'string') {
      vnode.el = document.createElement(tag);
      updateProps(vnode);
      children.map(function (child) {
        vnode.el.appendChild(createElement$1(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProps(vnode) {
    var el = vnode.el,
        newProps = vnode.props || {};

    for (var key in newProps) {
      if (key === 'style') {
        for (var skey in newProps.style) {
          el.style[key] = newProps.style[skey];
        }
      } else if (key === 'class') {
        el.className = el["class"];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  /**
   * 挂载组件
   * AST树 -> render -> Dom
   * @param {*} vm
   */

  function mountComponent(vm) {
    // 
    vm._update(vm._render());
  }
  /**
   * 生命周期函数
   *
   * @param {*} Yue
   */


  function lifecycleMixin(Yue) {
    Yue.prototype._update = function (vnode) {
      var vm = this;
      patch(vm.$el, vnode);
    };
  }

  function initMixin(Yue) {
    Yue.prototype._init = function (options) {
      // 挂载Vue的实例到vm上
      var vm = this; // 挂载options到实例上，方便用户在实例上调用

      vm.$options = options; // 初始化状态（data option）

      initState(vm); // 初始化其他状态...
      // 初始化渲染函数

      if (vm.$options.el) {
        // 执行挂载函数(yue.prototype.$mount)
        vm.$mount(vm.$options.el);
      }
    };

    Yue.prototype.$mount = function (el) {
      var vm = this,
          options = vm.$options;
      el = document.querySelector(el);
      vm.$el = el;

      if (!options.render) {
        // 如果没有render函数，则调用template渲染函数
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        } // 核心：template -> AST 树 -> render 函数


        var render = compileToRenderFunction(template);
        options.render = render;
      }

      mountComponent(vm);
    };
  }

  function createElement(tag) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return vnode(tag, attrs, children);
  }

  function createTextVnode(text) {
    return vnode(undefined, undefined, undefined, text);
  }

  function vnode(tag, props, children, text) {
    return {
      tag: tag,
      props: props,
      children: children,
      text: text
    };
  }

  /**
   *
   *
   * @param {*} Yue
   */

  function renderMixin(Yue) {
    Yue.prototype._c = function () {
      return createElement.apply(void 0, arguments);
    };

    Yue.prototype._s = function (value) {
      if (value === null) return;
      return _typeof(value) === 'object' ? JSON.stringify(value) : value;
    };

    Yue.prototype._v = function (text) {
      return createTextVnode(text);
    };

    Yue.prototype._render = function () {
      var vm = this,
          render = vm.$options.render,
          vnode = render.call(vm); // console.log(vnode);

      return vnode;
    };
  }

  function Yue(options) {
    this._init(options);
  } // Vue2.6 插件化开发模式


  initMixin(Yue);
  lifecycleMixin(Yue);
  renderMixin(Yue);

  return Yue;

}));
