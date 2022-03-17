/**
 * 目标:
 *  before: (add 20 (subtract 4 2))
 *  after: add(20, subtract(4, 2))
 */

// 1.分词(扁平化处理): 把所有的词语进行分解
function generateToken(str) {
  let current = 0;
  let tokens = [];

  while (current < str.length) {
    let char = str[current];
    if (char === '(' || char === ')') {
      tokens.push({
        type: 'paren',
        value: char
      });
      current++
      continue
    }

    // 匹配字符
    if (/\s/.test(char)) {
      current++
      continue
    }

    // 匹配数字
    if (/\d/.test(char)) {
      let value = '';
      while (/\d/.test(char)) {
        value += char;
        char = str[++current];
      }
      tokens.push({
        type: 'number',
        value
      });
      continue
    }

    // 匹配字符串
    if (/[a-z]/.test(char)) {
      let value = '';
      while (/[a-z]/.test(char)) {
        value += char;
        char = str[++current];
      }
      tokens.push({
        type: 'name',
        value
      });
      continue
    }

    throw new TypeError('未能识别的分词字符')
  }

  return tokens
}

// 2.生成AST
function generateAST(tokens) {
  let current = 0;

  let ast = {
    type: 'Program',
    body: []
  }

  function walk() {
    let token = tokens[current];

    if (token.type === 'number') {
      current++
      return {
        type: 'NumberLiteral',
        value: token.value
      }
    }

    // 判断嵌套关系
    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current];
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: []
      }
      token = tokens[++current];

      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++
      return node
    }
  }

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast
}

// 3.对 ast 进行转化
function transformer(ast) {
  let newAst = {
    type: 'Program',
    body: []
  }

  ast._context = newAst.body;
  DFS(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value
        })
      }
    },
    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name
          },
          arguments: []
        }

        node._context = expression.arguments;
        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression
          }
        }
        parent._context.push(expression)
      }
    }
  })

  return newAst
}

// 4.遍历 ast
function DFS(ast, visitor) {

  // 遍历子元素
  function tranversArray(children, parent) {
    children.forEach(child => tranversNode(child, parent))
  }

  // 子元素处理
  function tranversNode(node, parent) {
    let methods = visitor[node.type]
    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
    case 'Program':
      tranversArray(node.body, node);
      break;
    case 'CallExpression':
      tranversArray(node.params, node);
      break;
    case 'NumberLiteral':
      break;
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  return tranversNode(ast, null)
}

// 5.ast -> 代码
function generator(ast) {
  switch (ast.type) {
  case 'Program':
    return ast.body.map(subAst => generator(subAst)).join('\n')
  case 'ExpressionStatement':
    return generator(ast.expression) + ';'
  case 'CallExpression':
    return generator(ast.callee) + '(' + ast.arguments.map(arg => generator(arg)).join(', ') + ')'
  case 'Identifier':
    return ast.name
  case 'NumberLiteral':
    return ast.value
  }
}

function parser(input) {
  const tokens = generateToken(input);
  const ast = generateAST(tokens);
  const newAst = transformer(ast);
  const output = generator(newAst);
  return output
}

module.exports = parser;