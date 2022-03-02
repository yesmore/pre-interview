/**
 * IIFE插件开发: tab
 * @params doc 节点对象
 * @params template DOM模板
 * @params tools 工具函数
 */
;
(function (doc, _template, _tools) {
  // console.log(_template, _tools);

  function Tab(el) {
    // 1.获取节点
    this.el = doc.querySelector(el)
    // 2.获取数据(JSON字符串)
    // TODO1: 类型校验
    this.data = JSON.parse(this.el.getAttribute('data')) || []
    this._index = 0 // 当前激活tab

    this.init();
    // console.log(this.data);
  }

  // 3.启动模块
  Tab.prototype.init = function () {
    this._render();
    this._bindEvent();
  }

  // 4.渲染页面
  Tab.prototype._render = function () {
    // 4.1 创建容器
    var tabWrapper = document.createElement('div');
    var pageWrapper = document.createElement('div')
    var oFrag = document.createDocumentFragment('') // 文档碎片
    // 4.2 添加类名
    tabWrapper.className = 'tab-wrapper'
    pageWrapper.className = 'page-wrapper'

    // 4.3 遍历拼接
    // 调用工具函数：用数据替换掉大括号内容
    this.data.forEach(function (item, index) {
      tabWrapper.innerHTML += _tools.tplReplace(_template.tab('tab'), {
        tab: item.tab,
        current: !index ? 'current' : ''
      })
      pageWrapper.innerHTML += _tools.tplReplace(_template.tab('page'), {
        page: item.page,
        current: !index ? 'current' : ''
      })
    })
    // 4.4 把节点先存到文档碎片中
    oFrag.appendChild(tabWrapper)
    oFrag.appendChild(pageWrapper)
    // 4.5 渲染到真实节点（只操作一次dom）
    this.el.appendChild(oFrag)
  }

  // 5.绑定事件处理函数
  Tab.prototype._bindEvent = function () {
    var doms = {
      oTabItems: doc.querySelectorAll('.tab-item'),
      oPageItems: doc.querySelectorAll('.page-item')
    }
    this.el.addEventListener('click', this._handleTabClick.bind(this, doms), false)
  }

  // 6.切换事件
  Tab.prototype._handleTabClick = function () {
    var _doms = arguments[0], // 所有tab、page节点
      tar = arguments[1].target, // 当前点击的tab节点
      className = tar.className.trim() // 当前tab类名

    if (className === 'tab-item') { // 当前点击对象未被激活时
      _doms.oTabItems[this._index].className = 'tab-item'
      _doms.oPageItems[this._index].className = 'page-item'
      this._index = [].indexOf.call(_doms.oTabItems, tar)

      tar.className += ' current'
      _doms.oPageItems[this._index].className += ' current'
      // console.log(this._index);
    }
  }

  window.Tab = Tab
})(document, template, tools);