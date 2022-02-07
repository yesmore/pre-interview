/**
 * _c() -> createElement() 创建虚拟节点元素
 * _v() -> createTextNode() 创建虚拟文本节点
 * _s() -> {{name}} -> _s(name) -> 字符串拼接
 */
// 匹配模板语法（双大括号）
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function formatProps(attrs) {
  let attrStr = ''

  for (var i = 0; i < attrs.length; i++) {
    let attr = attrs[i]

    if (attr.name === 'style') {
      let styleAttrs = {}

      attr.value.split(';').map(styleAttr => {
        let [key, value] = styleAttr.split(':')
        styleAttrs[key] = value
      })
      attr.value = styleAttrs
    }
    attrStr += `${attr.name}` + `:` + `${JSON.stringify(attr.value)},`
  }

  // console.log(`{${attrStr.slice(0, -1)}}`);

  return `{${attrStr.slice(0, -1)}}`
}

function generateChild(node) {
  if (node.type === 1) {
    return generate(node)
  } else if (node.type === 3) {
    let text = node.text

    // 单独字符串处理(无双大括号)
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`
    }

    // 有双大括号字符串处理
    let match,
      index,
      lastIndex = defaultTagRE.lastIndex = 0,
      textArr = [];

    while (match = defaultTagRE.exec(text)) {
      index = match.index
      if (index > lastIndex) {
        textArr.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      // '_s(name)'
      textArr.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }

    // 
    if (lastIndex < text.length) {
      textArr.push(JSON.stringify(text.slice(lastIndex)))
    }

    // console.log(textArr); // ['"hello "', '_s(name)', '" 同学"'] ['_s(age)']
    return `_v(${textArr.join('+')})`
  }
}

function getChildren(el) {
  const children = el.children

  if (children) {
    return children.map(c => generateChild(c)).join(',')
  }
}

/**
 * AST -> render 函数
 *
 * @param {*} el
 */
function generate(el) {
  let children = getChildren(el)

  // 此处不能换行
  let code = `_c('${el.tag}', ${
      el.attrs.length > 0 
        ? `${formatProps(el.attrs)}` 
        : 'undefined'
    }${
      children.length > 0
      ? `,${children}` 
      : ''
    })`;

  // console.log(code);
  return code
}

export {
  generate
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