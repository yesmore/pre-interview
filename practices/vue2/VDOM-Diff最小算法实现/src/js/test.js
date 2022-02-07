const patches = {
  // 含义：第0项有一个补丁，其类型为属性attr更新，属性名为class，属性值为list-wrap
  0: [{
    type: 'ATTR',
    attrs: {
      class: 'list-wrap'
    }
  }],
  // 含义：第2项有一个补丁，其类型为属性attr更新，属性名为class，属性值为title
  2: [{
    type: 'ATTR',
    attrs: {
      class: 'title'
    }
  }],
  // 含义：第3项有一个补丁，其类型为文本更新，属性名为text，属性值为'特殊列表项'
  3: [{
    type: 'TEXT',
    text: '特殊列表项'
  }],
  // 含义：第6项有一个补丁，其类型为删除节点
  6: [{
    type: 'REMOVE',
    index: 6
  }],
  // 替换新节点
  7: [{
    type: 'REPLACE',
    newNode: newNode
  }]
}