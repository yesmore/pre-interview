// 打补丁
function patch(oldNode, vNode) {
  let el = createElement(vNode),
    parentElement = oldNode.parentElement;

  parentElement.insertBefore(el, oldNode.nextSibling);
  parentElement.removeChild(oldNode);
}

function createElement(vnode) {
  const {
    tag,
    props,
    children,
    text
  } = vnode;

  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag);
    updateProps(vnode);

    children.map(child => {
      vnode.el.appendChild(createElement(child));
    })
  } else {
    vnode.el = document.createTextNode(text);
  }

  return vnode.el;
}

function updateProps(vnode) {
  const el = vnode.el,
    newProps = vnode.props || {};

  for (let key in newProps) {
    if (key === 'style') {
      for (let skey in newProps.style) {
        el.style[key] = newProps.style[skey];
      }
    } else if (key === 'class') {
      el.className = el.class
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}

export {
  patch
}