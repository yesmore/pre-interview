import Element from './Element';

/**
 * 生成节点的构造函数
 *
 * @param {*} type 节点类型
 * @param {*} props 节点属性
 * @param {*} children 子节点
 * @return {*} 节点
 */
function createElement(type, props, children) {
  return new Element(type, props, children);
}

/**
 * 为真实节点设置属性
 *
 * @param {*} node 节点 <ul></ul>
 * @param {*} prop 属性名 ['class', 'style', 'data-index', ...]
 * @param {*} value 属性值 { color: 'red'; }
 */
function setAttrs(node, prop, value) {
  switch (prop) {
    case 'value':
      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        node.value = value;
      } else {
        node.setAttribute(prop, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(prop, value);
      break;
  }
}

/**
 * 将虚拟节点转换为真实节点
 *
 * @param {*} vDom
 * @return {*} 
 */
function render(vDom) {
  const {
    type,
    props,
    children
  } = vDom, // 取出虚拟节点的属性和子节点
  el = document.createElement(type); // 取标签名

  // 遍历每一个属性，并设置到真实节点
  for (let key in props) {
    setAttrs(el, key, props[key]);
  }

  // 遍历每一个子节点，并转换为真实节点
  children.map((c) => {
    c = c instanceof Element ?
      render(c) :
      document.createTextNode(c); // 文本节点

    el.appendChild(c);
  });

  return el;
}

/**
 * 通过renderDom渲染真实节点到视图
 *
 * @param {*} rDom 真实Dom
 * @param {*} rootEl 根节点（挂载节点）
 */
function renderDOM(rDom, rootEl) {
  rootEl.appendChild(rDom);
}

export {
  createElement,
  render,
  setAttrs,
  renderDOM
}