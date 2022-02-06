import {
  ATTR,
  TEXT,
  REPLACE,
  REMOVE
} from './patchTypes'; // 补丁类型

let patches = {},
  vnIndex = 0; // 层数：深度遍历

/**
 * Diff: 比较两个虚拟节点差别
 *
 * @param {*} oldVDom 老虚拟节点
 * @param {*} newVDom 新虚拟节点
 * @return {*} 补丁对象（详见test.js）
 */
function domDiff(oldVDom, newVDom) {
  let index = 0; // 私有编号，广度遍历
  vNodeWalk(oldVDom, newVDom, index);

  return patches;
}

/**
 * 遍历递归比较虚拟节点
 *
 * @param {*} oldNode 老虚拟节点
 * @param {*} newNode 新虚拟节点
 * @param {*} index 私有编号
 */
function vNodeWalk(oldNode, newNode, index) {
  let vnPatch = []; // 私有patch

  if (!newNode) {
    // 1.如果节点被删除
    vnPatch.push({
      type: REMOVE,
      index
    })
  } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    // 2.如果新旧节点都为文本节点
    if (oldNode !== newNode) {
      // 发生变更了
      vnPatch.push({
        type: TEXT,
        text: newNode
      })
    }
  } else if (oldNode.type === newNode.type) {
    // 3.如果新旧节点都为同一类型节点
    // 3.1 遍历比较新旧节点的属性
    const attrPatch = attrsWalk(oldNode.props, newNode.props);

    // 3.2 通过键名判断是否有属性发生变更
    if (Object.keys(attrPatch).length > 0) {
      vnPatch.push({
        type: ATTR,
        attrs: attrPatch
      });
    }

    // 3.3 遍历比较子节点的差异
    childrenWalk(oldNode.children, newNode.children);
  } else {
    // 4.节点替换：新旧节点类型不同
    vnPatch.push({
      type: REPLACE,
      newNode
    })
  }

  // 如果有补丁，则添加到全局补丁对象中
  if (vnPatch.length > 0) {
    patches[index] = vnPatch;
  }
}

/**
 * 遍历比较新旧节点的属性
 *
 * @param {*} oldAttrs
 * @param {*} newAttrs
 * @return {*} 节点属性的补丁对象
 */
function attrsWalk(oldAttrs, newAttrs) {
  let attrPatch = {};

  // 1.修改：遍历旧节点的属性
  for (let key in oldAttrs) {
    // 修改属性：新旧有差异
    if (oldAttrs[key] !== newAttrs[key]) {
      attrPatch[key] = newAttrs[key];
    }
  }

  // 2.新增：遍历新节点的属性
  for (let key in newAttrs) {
    // 新增：若旧节点没有这个属性
    if (!oldAttrs.hasOwnProperty(key)) {
      attrPatch[key] = newAttrs[key];
    }
  }

  return attrPatch;
}

/**
 * 遍历比较子节点的差异
 *
 * @param {*} oldChildren
 * @param {*} newChildren
 */
function childrenWalk(oldChildren, newChildren) {
  oldChildren.map((c, indey) => {
    vNodeWalk(c, newChildren[indey], ++vnIndex);
  });
}

export default domDiff;