// 匹配: id='app' id="app" id=app 三种
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// 匹配标签名: my-header
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// 匹配特殊标签: <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// 匹配开始标签: <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// 匹配闭合标签符: > 或 /> 
const startTagClose = /^\s*(\/?)>/;
// 匹配结束标签: </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

/**
 * HTML转AST树
 * 核心：匹配字符串，分割成数组，遍历数组，构建AST树
 * @param {*} html
 */
function parseHTMLToAst(html) {
  let text;
  let root, currentParent, stack = []

  while (html) {

    let textEnd = html.indexOf('<');

    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      // 如果匹配到开始标签
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      // 匹配结束标签
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        // console.log(endTagMatch);
        advance(endTagMatch[0].length); // 删除结束标签
        end(endTagMatch[1]); // 删除结束标签
        continue
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
    const start = html.match(startTagOpen);
    // console.log(start); // ["<div", "div", ...]

    let end, attr // 标识：是否为endTag、是否匹配到attr

    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      }
      advance(start[0].length); // 截取"<div"部分

      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // console.log(attr); // [' id="app"', 'id', '=', 'app',...]
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5] || '', // 如果有值，则赋值，否则为空 | why? 
        })
        advance(attr[0].length); // 截取 id='app' 部分
      }

      // 匹配结束标签符: > 
      if (end) {
        // console.log(end); // ['>', '', index: 0, ...]
        advance(end[0].length); // 截取 ">" 部分
        // console.log(match);
        return match
      }
    }

    // return match
    /**
     * match:
     * {
     *   tag: '',
     *   attrs: [],
     * }
     */
  }

  // 截取字符串
  function advance(n) {
    // why？拿到html结构的字符串，从上到下，从左到右 依次通过正则字符串匹配生成AST元素，
    // 需要将已经被匹配过的html字符串删除，用substring方法可以截取指定字符串的前n个字符实现此效果,直到为空‘’
    html = html.substring(n);
  }

  // 核心
  /**
   *  第一次：stack: [div], currentParent: div
   *  第二次：stack: [div, span], currentParent: div
   **/
  function start(tagName, attrs) {
    // console.log('-----开始-----');
    const element = createASTElement(tagName, attrs);

    // 如果不是根节点
    if (!root) {
      root = element;
    }

    currentParent = element; // 保存父节点
    stack.push(element); // 将当前节点放入栈中
  }

  // 找出父节点与子节点的关系
  function end(tagName) {
    // console.log('-----结束-----');
    // span
    const element = stack.pop(); // 取出栈顶元素
    // div
    currentParent = stack[stack.length - 1]; // 
    if (currentParent) {
      element.parent = currentParent; // span -> parent -> div
      currentParent.children.push(element); // div -> children push -> span
    }
  }

  // 文本处理
  function chars(text) {
    text = text.trim()

    if (text.length > 0) {
      currentParent.children.push({
        type: 3,
        text,
      })
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
      parent
    }
  }

  return root
}



export {
  parseHTMLToAst
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